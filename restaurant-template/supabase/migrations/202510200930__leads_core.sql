-- Leads core tables
create table if not exists lead (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  lead_type text not null default 'catering',
  party_size integer,
  event_date date,
  message text,
  status text not null default 'new' check (status in ('new','in_progress','won','lost')),
  created_at timestamptz not null default now()
);

create index if not exists idx_lead_restaurant on lead(restaurant_id);

create table if not exists lead_activity (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references lead(id) on delete cascade,
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_lead_activity_lead on lead_activity(lead_id);
