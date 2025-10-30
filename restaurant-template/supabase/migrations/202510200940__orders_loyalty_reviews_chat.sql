create table if not exists restaurant_order (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  customer_name text not null,
  customer_contact text,
  status text not null default 'pending',
  total_amount integer not null default 0,
  notes text,
  order_items jsonb not null default '[]',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_restaurant_order_restaurant
  on restaurant_order(restaurant_id, status);

create trigger restaurant_order_set_updated_at
before update on restaurant_order
for each row
execute function public.set_updated_at();

create table if not exists loyalty_member (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  points integer not null default 0,
  tier text not null default 'bronze',
  last_visit date,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_loyalty_member_restaurant
  on loyalty_member(restaurant_id);

create trigger loyalty_member_set_updated_at
before update on loyalty_member
for each row
execute function public.set_updated_at();

create table if not exists review (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  author_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  status text not null default 'pending',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_review_restaurant_status
  on review(restaurant_id, status);

create trigger review_set_updated_at
before update on review
for each row
execute function public.set_updated_at();

create table if not exists assistant_macro (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  title text not null,
  prompt text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_assistant_macro_restaurant
  on assistant_macro(restaurant_id);

create trigger assistant_macro_set_updated_at
before update on assistant_macro
for each row
execute function public.set_updated_at();
