-- Menu core tables scoped by restaurant
create table if not exists category (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  name text not null,
  slug text not null,
  position integer not null default 0,
  visible boolean not null default true,
  unique (restaurant_id, slug)
);

create index if not exists idx_category_restaurant on category(restaurant_id);

create table if not exists item (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  category_id uuid references category(id) on delete set null,
  name text not null,
  slug text not null,
  description text,
  price integer not null check (price >= 0),
  active boolean not null default true,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (restaurant_id, category_id, slug)
);

create trigger item_set_updated_at
before update on item
for each row
execute function public.set_updated_at();

create index if not exists idx_item_restaurant on item(restaurant_id);
create index if not exists idx_item_category on item(category_id);

create table if not exists variant (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  item_id uuid not null references item(id) on delete cascade,
  name text not null,
  price_delta integer not null default 0
);

create index if not exists idx_variant_item on variant(item_id);

create table if not exists modifier_group (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  name text not null,
  min integer not null default 0,
  max integer not null default 0,
  required boolean not null default false
);

create table if not exists item_modifier_group (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  item_id uuid not null references item(id) on delete cascade,
  group_id uuid not null references modifier_group(id) on delete cascade,
  unique (restaurant_id, item_id, group_id)
);

create table if not exists modifier (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  group_id uuid not null references modifier_group(id) on delete cascade,
  name text not null,
  price_delta integer not null default 0
);

create index if not exists idx_modifier_group on modifier(group_id);

create table if not exists allergen_tag (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  code text not null,
  label text not null,
  unique (restaurant_id, code)
);

create table if not exists item_allergen (
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  item_id uuid not null references item(id) on delete cascade,
  allergen_id uuid not null references allergen_tag(id) on delete cascade,
  primary key (restaurant_id, item_id, allergen_id)
);

create table if not exists availability_window (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  scope text not null check (scope in ('item','category')),
  target_id uuid not null,
  days_of_week smallint[] not null default '{}',
  start_time time not null,
  end_time time not null,
  start_date date,
  end_date date
);

create index if not exists idx_availability_target on availability_window(restaurant_id, scope, target_id);
