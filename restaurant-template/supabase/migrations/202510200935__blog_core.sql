-- Blog core tables
create table if not exists post (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  title text not null,
  slug text not null,
  excerpt text,
  content text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (restaurant_id, slug)
);

create trigger post_set_updated_at
before update on post
for each row
execute function public.set_updated_at();

create index if not exists idx_post_restaurant on post(restaurant_id);

create table if not exists tag (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  name text not null,
  slug text not null,
  unique (restaurant_id, slug)
);

create table if not exists post_tag (
  post_id uuid not null references post(id) on delete cascade,
  tag_id uuid not null references tag(id) on delete cascade,
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  primary key (post_id, tag_id)
);

create index if not exists idx_post_tag_post on post_tag(post_id);
