-- Reservations domain tables
create table if not exists reservation (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  customer_name text not null,
  customer_email text,
  party_size integer not null check (party_size between 1 and 20),
  reservation_time timestamptz not null,
  status text not null default 'pending' check (status in ('pending','confirmed','seated','cancelled','no_show')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger reservation_set_updated_at
before update on reservation
for each row
execute function public.set_updated_at();

create index if not exists idx_reservation_restaurant on reservation(restaurant_id);
create index if not exists idx_reservation_status on reservation(status);
create index if not exists idx_reservation_time on reservation(reservation_time);

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  customer_name text not null,
  contact text,
  party_size integer not null check (party_size between 1 and 20),
  joined_at timestamptz not null default now(),
  quoted_minutes integer,
  status text not null default 'waiting' check (status in ('waiting','notified','seated','cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists idx_waitlist_restaurant on waitlist(restaurant_id);
