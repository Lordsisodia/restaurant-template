-- Tenant base structures
create extension if not exists pgcrypto;

create table if not exists tenant_group (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  supabase_project text not null,
  vercel_team text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists restaurants (
  id uuid primary key default gen_random_uuid(),
  tenant_group_id uuid references tenant_group(id) on delete cascade,
  name text not null,
  slug text not null unique,
  timezone text not null default 'Asia/Jakarta',
  default_domain text,
  vercel_project_slug text,
  github_repo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger restaurants_set_updated_at
before update on restaurants
for each row
execute function public.set_updated_at();

create table if not exists staff_user (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  clerk_user_id text not null unique,
  role text not null check (role in ('owner','manager','staff','support')) default 'manager',
  created_at timestamptz not null default now()
);

create index if not exists idx_staff_user_restaurant on staff_user(restaurant_id);

create table if not exists site_config (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  theme_tokens jsonb not null default '{}',
  enabled_pages text[] not null default '{}',
  features jsonb not null default '{}',
  layout_variant text not null default 'classic',
  default_locale text not null default 'id-ID',
  available_locales text[] not null default '{"id-ID","en-US"}',
  config_version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (restaurant_id)
);

create trigger site_config_set_updated_at
before update on site_config
for each row
execute function public.set_updated_at();

create table if not exists page_block (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  page text not null,
  block_type text not null,
  content_json jsonb not null,
  position integer not null default 0,
  locale text not null default 'id-ID',
  created_at timestamptz not null default now()
);

create index if not exists idx_page_block_restaurant_page
  on page_block(restaurant_id, page, locale);

