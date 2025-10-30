-- Simplified Reviews System for Draco Coffee And Eatery
-- Reviews are dynamic (in database), images are hardcoded (static files)
-- Customers can submit reviews via website

-- Extend review table with essential fields only
alter table review
  add column if not exists source text default 'website', -- 'Google Maps', 'website'
  add column if not exists verified boolean default false,
  add column if not exists featured boolean default false,
  add column if not exists images jsonb default '[]', -- Hardcoded image paths: ['/images/tenants/draco/reviews/photo1.jpg']
  add column if not exists owner_response text, -- Simple text response
  add column if not exists owner_responded_at timestamptz,
  add column if not exists helpful_count integer default 0,
  add column if not exists metadata jsonb default '{}'; -- For any extra data

-- Add indexes for common queries
create index if not exists idx_review_featured
  on review(restaurant_id, featured) where featured = true;

create index if not exists idx_review_rating_status
  on review(restaurant_id, rating, status) where status = 'published';

-- Function to get reviews with calculated fields
create or replace view review_display as
select
  r.*,
  jsonb_array_length(r.images) as image_count,
  case when r.owner_response is not null then true else false end as has_owner_response,
  extract(epoch from (now() - r.created_at)) / 86400 as days_ago
from review r;

-- Function to calculate average rating
create or replace function get_restaurant_rating(restaurant_uuid uuid)
returns jsonb as $$
  select jsonb_build_object(
    'average', round(avg(rating)::numeric, 1),
    'total', count(*),
    'breakdown', jsonb_build_object(
      '5_stars', count(*) filter (where rating = 5),
      '4_stars', count(*) filter (where rating = 4),
      '3_stars', count(*) filter (where rating = 3),
      '2_stars', count(*) filter (where rating = 2),
      '1_star', count(*) filter (where rating = 1)
    )
  )
  from review
  where restaurant_id = restaurant_uuid
    and status = 'published';
$$ language sql stable;

-- RLS policies
alter table review enable row level security;

-- Public can read published reviews
create policy "Public can read published reviews"
  on review for select
  using (status = 'published');

-- Anyone can submit a review (will be pending until approved)
create policy "Anyone can submit reviews"
  on review for insert
  with check (status = 'pending');

-- Restaurant owners can update/publish reviews
create policy "Owners can manage reviews"
  on review for update
  using (
    restaurant_id in (
      select id from restaurants
      where owner_id = auth.uid()
    )
  );

-- Comments
comment on column review.images is 'Hardcoded image paths as JSON array: ["/images/tenants/draco/reviews/photo1.jpg"]';
comment on column review.owner_response is 'Simple text response from restaurant owner';
comment on column review.featured is 'Display this review prominently on homepage';
comment on column review.helpful_count is 'Number of users who found this review helpful';
