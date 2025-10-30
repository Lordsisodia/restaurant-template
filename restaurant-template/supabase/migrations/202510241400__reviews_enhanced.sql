-- Enhanced Reviews System for Draco Coffee And Eatery
-- Extends the basic review table with Google Maps features
-- Supports photos, owner responses, and rich metadata

-- Add new columns to existing review table
alter table review
  add column if not exists author_type text, -- 'Local Guide', 'Regular User', etc.
  add column if not exists author_stats text, -- '55 reviews · 73 photos'
  add column if not exists date_relative text, -- 'a month ago', '6 months ago'
  add column if not exists source text default 'website', -- 'Google Maps', 'Yelp', 'website'
  add column if not exists has_photos boolean default false,
  add column if not exists photo_count integer default 0,
  add column if not exists helpful_count integer default 0,
  add column if not exists verified boolean default false,
  add column if not exists featured boolean default false,
  add column if not exists sentiment text, -- 'very positive', 'positive', 'neutral', 'negative'
  add column if not exists language text default 'en', -- 'en', 'id', etc.
  add column if not exists tags text[] default '{}',
  add column if not exists highlights text[] default '{}',
  add column if not exists metadata jsonb default '{}';

-- Create review_photos table for storing multiple photos per review
create table if not exists review_photo (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references review(id) on delete cascade,
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  image_url text not null, -- URL to image (Cloudinary, Supabase Storage, etc.)
  image_path text, -- Relative path in project: '/images/reviews/...'
  thumbnail_url text, -- Optimized thumbnail
  caption text,
  order_index integer default 0, -- For ordering photos
  width integer,
  height integer,
  file_size integer, -- in bytes
  uploaded_by text, -- 'customer', 'google', 'owner'
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_review_photo_review
  on review_photo(review_id);

create index if not exists idx_review_photo_restaurant
  on review_photo(restaurant_id);

-- Create owner_response table for restaurant responses to reviews
create table if not exists owner_response (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references review(id) on delete cascade,
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  response_text text not null,
  responder_name text, -- Name of person who responded
  responder_role text default 'owner', -- 'owner', 'manager', 'staff'
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_owner_response_review
  on owner_response(review_id);

create trigger owner_response_set_updated_at
before update on owner_response
for each row
execute function public.set_updated_at();

-- Create review_translation table for multilingual reviews
create table if not exists review_translation (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references review(id) on delete cascade,
  language text not null, -- 'en', 'id', etc.
  translated_text text not null,
  translation_source text default 'google', -- 'google', 'manual', 'deepl'
  created_at timestamptz not null default now()
);

create index if not exists idx_review_translation_review
  on review_translation(review_id, language);

-- Add indexes for common queries
create index if not exists idx_review_featured
  on review(restaurant_id, featured) where featured = true;

create index if not exists idx_review_source
  on review(restaurant_id, source);

create index if not exists idx_review_rating_status
  on review(restaurant_id, rating, status);

create index if not exists idx_review_has_photos
  on review(restaurant_id, has_photos) where has_photos = true;

-- Create view for reviews with photo count and owner response
create or replace view review_with_details as
select
  r.*,
  count(distinct rp.id) as actual_photo_count,
  count(distinct ort.id) > 0 as has_owner_response,
  ort.response_text as owner_response_text,
  ort.responder_name as owner_response_by,
  ort.created_at as owner_response_date,
  array_agg(distinct rp.image_url) filter (where rp.image_url is not null) as photo_urls
from review r
left join review_photo rp on rp.review_id = r.id
left join owner_response ort on ort.review_id = r.id
group by r.id, ort.id, ort.response_text, ort.responder_name, ort.created_at;

-- Function to calculate average rating for a restaurant
create or replace function calculate_restaurant_rating(restaurant_uuid uuid)
returns numeric as $$
  select round(avg(rating)::numeric, 1)
  from review
  where restaurant_id = restaurant_uuid
    and status = 'published';
$$ language sql stable;

-- Function to get review counts by rating
create or replace function get_rating_breakdown(restaurant_uuid uuid)
returns jsonb as $$
  select jsonb_build_object(
    '5_stars', count(*) filter (where rating = 5),
    '4_stars', count(*) filter (where rating = 4),
    '3_stars', count(*) filter (where rating = 3),
    '2_stars', count(*) filter (where rating = 2),
    '1_star', count(*) filter (where rating = 1),
    'total', count(*),
    'average', round(avg(rating)::numeric, 1)
  )
  from review
  where restaurant_id = restaurant_uuid
    and status = 'published';
$$ language sql stable;

-- Add RLS policies for reviews
alter table review enable row level security;
alter table review_photo enable row level security;
alter table owner_response enable row level security;
alter table review_translation enable row level security;

-- Public can read published reviews
create policy "Public can read published reviews"
  on review for select
  using (status = 'published');

create policy "Public can read review photos"
  on review_photo for select
  using (true);

create policy "Public can read owner responses"
  on owner_response for select
  using (true);

create policy "Public can read review translations"
  on review_translation for select
  using (true);

-- Authenticated users can create reviews
create policy "Authenticated users can create reviews"
  on review for insert
  to authenticated
  with check (true);

-- Restaurant owners can update their reviews
create policy "Restaurant owners can update reviews"
  on review for update
  to authenticated
  using (
    restaurant_id in (
      select id from restaurants
      where owner_id = auth.uid()
    )
  );

-- Restaurant owners can create owner responses
create policy "Restaurant owners can create responses"
  on owner_response for insert
  to authenticated
  with check (
    restaurant_id in (
      select id from restaurants
      where owner_id = auth.uid()
    )
  );

-- Add helpful comments
comment on table review is 'Customer reviews for restaurants with rich metadata';
comment on table review_photo is 'Photos attached to customer reviews';
comment on table owner_response is 'Restaurant owner/manager responses to reviews';
comment on table review_translation is 'Translations of reviews in different languages';

comment on column review.author_type is 'Type of reviewer: Local Guide, Regular User, etc.';
comment on column review.author_stats is 'Reviewer statistics from source platform';
comment on column review.source is 'Where the review came from: Google Maps, Yelp, website';
comment on column review.featured is 'Whether this review should be featured on homepage';
comment on column review.sentiment is 'AI-analyzed sentiment: very positive, positive, neutral, negative';
comment on column review.tags is 'Extracted keywords/topics from the review';
comment on column review.highlights is 'Key points or features mentioned';
