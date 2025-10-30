-- Specials table
create table if not exists special (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  scope text not null check (scope in ('item','category')),
  target_id uuid not null,
  type text not null check (type in ('percent','fixed','bogo')),
  value integer not null,
  days_of_week smallint[] not null default '{}',
  start_time time,
  end_time time,
  start_date date,
  end_date date,
  created_at timestamptz not null default now()
);

create index if not exists idx_special_restaurant on special(restaurant_id, scope, target_id);
