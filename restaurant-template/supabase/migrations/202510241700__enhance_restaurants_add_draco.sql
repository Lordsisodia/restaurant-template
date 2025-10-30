-- Migration: Enhance restaurants table with complete client info and add Draco Coffee
-- Created: 2025-10-24
-- Purpose: Add phone, social media, colors, branding fields + seed Draco Coffee + remove demo data

-- ============================================
-- STEP 1: Enhance restaurants table schema
-- ============================================

-- Add contact information
alter table restaurants
add column if not exists phone text,
add column if not exists phone_formatted text,
add column if not exists whatsapp text,
add column if not exists whatsapp_formatted text,
add column if not exists email text,
add column if not exists address text,
add column if not exists business_hours text;

-- Add social media
alter table restaurants
add column if not exists instagram_url text,
add column if not exists instagram_handle text,
add column if not exists facebook_url text,
add column if not exists google_maps_url text;

-- Add branding and colors
alter table restaurants
add column if not exists tagline text,
add column if not exists logo_url text,
add column if not exists hero_image_url text,
add column if not exists primary_color text default '#000000',
add column if not exists accent_color text default '#D4AF37',
add column if not exists background_color text default '#FFFFFF',
add column if not exists text_color text default '#000000';

-- Add rating information
alter table restaurants
add column if not exists rating_score decimal(3,2),
add column if not exists rating_count integer default 0,
add column if not exists rating_source text;

-- Add additional metadata
alter table restaurants
add column if not exists status text default 'active' check (status in ('active', 'inactive', 'archived')),
add column if not exists notes text;

-- ============================================
-- STEP 2: Remove demo restaurants and their data
-- ============================================

-- IDs of demo restaurants to remove
-- Ayam Bakar Jaya: 00000000-0000-0000-0000-000000000001
-- Nasi Goreng Enak: 00000000-0000-0000-0000-000000000002

-- Delete will cascade through all related tables thanks to foreign key constraints
delete from restaurants
where id in (
  '00000000-0000-0000-0000-000000000001'::uuid,
  '00000000-0000-0000-0000-000000000002'::uuid
);

-- Clean up any orphaned data (just to be safe)
delete from site_config where restaurant_id not in (select id from restaurants);
delete from category where restaurant_id not in (select id from restaurants);
delete from item where restaurant_id not in (select id from restaurants);
delete from special where restaurant_id not in (select id from restaurants);
delete from reservation where restaurant_id not in (select id from restaurants);
delete from lead where restaurant_id not in (select id from restaurants);
delete from post where restaurant_id not in (select id from restaurants);
delete from restaurant_order where restaurant_id not in (select id from restaurants);
delete from loyalty_member where restaurant_id not in (select id from restaurants);
delete from review where restaurant_id not in (select id from restaurants);
delete from assistant_macro where restaurant_id not in (select id from restaurants);
delete from page_block where restaurant_id not in (select id from restaurants);

-- ============================================
-- STEP 3: Add Draco Coffee and Eatery
-- ============================================

-- First ensure tenant_group exists
insert into tenant_group (slug, supabase_project, vercel_team, notes)
values
  ('pod-alpha', 'ntrklmkzyfnrtfbpdypd', 'siso-restaurant-prod', 'Production pod - Draco Coffee and Eatery')
on conflict (slug) do update set notes = excluded.notes;

-- Insert Draco Coffee with complete information
insert into restaurants (
  id,
  tenant_group_id,
  name,
  slug,
  timezone,
  default_domain,
  vercel_project_slug,
  github_repo,
  phone,
  phone_formatted,
  whatsapp,
  whatsapp_formatted,
  email,
  address,
  business_hours,
  instagram_url,
  instagram_handle,
  facebook_url,
  google_maps_url,
  tagline,
  logo_url,
  hero_image_url,
  primary_color,
  accent_color,
  background_color,
  text_color,
  rating_score,
  rating_count,
  rating_source,
  status,
  notes
)
select
  '00000000-0000-0000-0000-000000000003'::uuid,
  tenant_group.id,
  'Draco Coffee and Eatery',
  'draco-coffee',
  'Asia/Makassar',
  'dracocoffee.com',
  'restaurant-draco-coffee',
  'siso/client-draco-coffee',
  '0813-3840-9090',
  '+62 813-3840-9090',
  '+62-819-9977-7138',
  '+62 819 9977 7138',
  '',
  'Jl. Mahendradatta Selatan No.7b, Pemecutan Klod, Denpasar, Bali 80119',
  'Open until 11:00 PM',
  'https://instagram.com/draco.cofeeandeatery',
  '@draco.cofeeandeatery',
  '',
  '',
  'Where Strong Coffee Meets Authentic Flavor',
  '/images/shared/partners/draco/logo-white.svg',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80',
  '#000000',
  '#D4AF37',
  '#000000',
  '#FFFFFF',
  4.6,
  149,
  'Google',
  'active',
  'Real client - Draco Coffee and Eatery, Denpasar, Bali'
from tenant_group
where tenant_group.slug = 'pod-alpha'
on conflict (id) do update set
  name = excluded.name,
  phone = excluded.phone,
  phone_formatted = excluded.phone_formatted,
  whatsapp = excluded.whatsapp,
  whatsapp_formatted = excluded.whatsapp_formatted,
  email = excluded.email,
  address = excluded.address,
  business_hours = excluded.business_hours,
  instagram_url = excluded.instagram_url,
  instagram_handle = excluded.instagram_handle,
  facebook_url = excluded.facebook_url,
  google_maps_url = excluded.google_maps_url,
  tagline = excluded.tagline,
  logo_url = excluded.logo_url,
  hero_image_url = excluded.hero_image_url,
  primary_color = excluded.primary_color,
  accent_color = excluded.accent_color,
  background_color = excluded.background_color,
  text_color = excluded.text_color,
  rating_score = excluded.rating_score,
  rating_count = excluded.rating_count,
  rating_source = excluded.rating_source,
  status = excluded.status,
  notes = excluded.notes;

-- Configure site_config for Draco Coffee
insert into site_config (
  restaurant_id,
  theme_tokens,
  enabled_pages,
  features,
  layout_variant,
  default_locale,
  available_locales
)
values
  (
    '00000000-0000-0000-0000-000000000003'::uuid,
    jsonb_build_object(
      'color', jsonb_build_object(
        'primary', '#000000',
        'primaryForeground', '#FFFFFF',
        'background', '#000000',
        'foreground', '#FFFFFF',
        'muted', '#1F1F1F',
        'mutedForeground', '#A3A3A3',
        'border', '#404040',
        'input', '#2D2D2D',
        'accent', '#D4AF37',
        'accentForeground', '#000000',
        'card', '#1F1F1F',
        'cardForeground', '#FFFFFF'
      ),
      'borderRadius', jsonb_build_object(
        'lg', '0.75rem',
        'md', '0.5rem',
        'sm', '0.25rem'
      )
    ),
    array['home','menu','specials','reviews','contact','orders','chat'],
    jsonb_build_object(
      'onlineOrdering', true,
      'reservations', false,
      'topNavVariant', 'segments'
    ),
    'coffee-forward',
    'id-ID',
    array['id-ID','en-US']
  )
on conflict (restaurant_id) do update set
  theme_tokens = excluded.theme_tokens,
  enabled_pages = excluded.enabled_pages,
  features = excluded.features,
  layout_variant = excluded.layout_variant,
  default_locale = excluded.default_locale,
  available_locales = excluded.available_locales;

-- ============================================
-- STEP 4: Add helpful indexes
-- ============================================

create index if not exists idx_restaurants_slug on restaurants(slug);
create index if not exists idx_restaurants_status on restaurants(status);
create index if not exists idx_restaurants_tenant_group on restaurants(tenant_group_id);

-- ============================================
-- SUCCESS!
-- ============================================
-- The restaurants table now has:
-- ✅ Complete contact information (phone, whatsapp, email, address)
-- ✅ Social media links (Instagram, Facebook, Google Maps)
-- ✅ Branding and colors (logo, hero image, color scheme)
-- ✅ Rating information (score, count, source)
-- ✅ Draco Coffee and Eatery fully configured
-- ✅ Demo restaurants removed
-- ============================================
