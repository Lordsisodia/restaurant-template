-- Demo tenant seed data
insert into tenant_group (slug, supabase_project, vercel_team, notes)
values
  ('pod-alpha', 'ntrklmkzyfnrtfbpdypd', 'siso-restaurant-prod', 'Demo pod for Ayam Bakar Jaya and Nasi Goreng Enak')
on conflict (slug) do update set notes = excluded.notes;

-- Ayam Bakar Jaya
insert into restaurants (id, tenant_group_id, name, slug, timezone, default_domain, vercel_project_slug, github_repo)
select
  '00000000-0000-0000-0000-000000000001'::uuid,
  tenant_group.id,
  'Ayam Bakar Jaya',
  'ayam-bakar-jaya',
  'Asia/Jakarta',
  'ayambakarjaya.com',
  'restaurant-ayam-bakar',
  'siso/client-ayam-bakar'
from tenant_group
where tenant_group.slug = 'pod-alpha'
on conflict (slug) do update
set name = excluded.name,
    timezone = excluded.timezone,
    default_domain = excluded.default_domain;

insert into site_config (restaurant_id, theme_tokens, enabled_pages, features, layout_variant)
values
  (
    '00000000-0000-0000-0000-000000000001'::uuid,
    jsonb_build_object(
      'color', jsonb_build_object(
        'primary', '#FF6B35',
        'secondary', '#2D3142',
        'surface', '#FFFFFF',
        'text', '#1F2933'
      )
    ),
    array['menu','specials','reservations','orders','gift-cards','loyalty','reviews','about','blog'],
    jsonb_build_object('onlineOrdering', true, 'reservations', false, 'loyalty', true),
    'modern'
  )
on conflict (restaurant_id) do update set
  theme_tokens = excluded.theme_tokens,
  enabled_pages = excluded.enabled_pages,
  features = excluded.features,
  layout_variant = excluded.layout_variant;

insert into category (id, restaurant_id, name, slug, position)
values
  ('00000000-0000-0000-0000-00000000c001'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Signature Dishes', 'signature-dishes', 0)
on conflict (id) do nothing;

insert into item (id, restaurant_id, category_id, name, slug, price, description, active)
values
  ('00000000-0000-0000-0000-00000000i001'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, '00000000-0000-0000-0000-00000000c001'::uuid, 'Ayam Bakar Spesial', 'ayam-bakar-spesial', 45000, 'Grilled chicken with sambal terasi', true)
on conflict (id) do nothing;

-- Sample specials
insert into special (restaurant_id, scope, target_id, type, value)
values
  ('00000000-0000-0000-0000-000000000001'::uuid, 'category', '00000000-0000-0000-0000-00000000c001', 'percent', 15),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'category', '00000000-0000-0000-0000-00000000c002', 'percent', 10)
on conflict do nothing;

-- Sample reservations
insert into reservation (restaurant_id, customer_name, customer_email, party_size, reservation_time, status)
values
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Demo Guest', 'guest@example.com', 2, now() + interval '1 day', 'confirmed'),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'Sample Diner', 'diner@example.com', 4, now() + interval '2 day', 'pending')
on conflict do nothing;

-- Sample leads
insert into lead (restaurant_id, name, email, phone, lead_type, party_size, event_date, message, status)
values
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Corporate Client', 'corporate@example.com', '+62 811 0000 111', 'catering', 40, (now() + interval '7 day')::date, 'Annual lunch catering', 'in_progress')
on conflict do nothing;

-- Sample blog post
insert into post (restaurant_id, title, slug, excerpt, content, published_at)
values
  ('00000000-0000-0000-0000-000000000001'::uuid, 'The secret behind our sambal', 'secret-behind-our-sambal', 'A quick look at the ingredients that make our sambal special.', 'We toast our chilies before grinding them with roasted peanuts and tamarind to develop a deep smoky flavor.\n\nTry pairing it with our Ayam Bakar Spesial for the full experience.', now())
on conflict do nothing;

-- Nasi Goreng Enak
insert into restaurants (id, tenant_group_id, name, slug, timezone, default_domain, vercel_project_slug, github_repo)
select
  '00000000-0000-0000-0000-000000000002'::uuid,
  tenant_group.id,
  'Nasi Goreng Enak',
  'nasi-goreng-enak',
  'Asia/Jakarta',
  'nasigorengenak.com',
  'restaurant-nasi-goreng',
  'siso/client-nasi-goreng'
from tenant_group
where tenant_group.slug = 'pod-alpha'
on conflict (slug) do update
set name = excluded.name,
    timezone = excluded.timezone,
    default_domain = excluded.default_domain;

insert into site_config (restaurant_id, theme_tokens, enabled_pages, features, layout_variant)
values
  (
    '00000000-0000-0000-0000-000000000002'::uuid,
    jsonb_build_object(
      'color', jsonb_build_object(
        'primary', '#1E3A8A',
        'secondary', '#F59E0B',
        'surface', '#FFFFFF',
        'text', '#111827'
      )
    ),
    array['home','menu','orders','specials','loyalty','reviews','chat','gift-cards','contact'],
    jsonb_build_object('onlineOrdering', true, 'reservations', true, 'loyalty', false),
    'classic'
  )
on conflict (restaurant_id) do update set
  theme_tokens = excluded.theme_tokens,
  enabled_pages = excluded.enabled_pages,
  features = excluded.features,
  layout_variant = excluded.layout_variant;

insert into category (id, restaurant_id, name, slug, position)
values
  ('00000000-0000-0000-0000-00000000c002'::uuid, '00000000-0000-0000-0000-000000000002'::uuid, 'Best Sellers', 'best-sellers', 0)
on conflict (id) do nothing;

insert into item (id, restaurant_id, category_id, name, slug, price, description, active)
values
  ('00000000-0000-0000-0000-00000000i002'::uuid, '00000000-0000-0000-0000-000000000002'::uuid, '00000000-0000-0000-0000-00000000c002'::uuid, 'Nasi Goreng Spesial', 'nasi-goreng-spesial', 38000, 'Fried rice with prawns and krupuk', true)
on conflict (id) do nothing;

-- Sample orders
insert into restaurant_order (id, restaurant_id, customer_name, customer_contact, status, total_amount, notes, order_items)
values
  (
    '00000000-0000-0000-0000-00000000o001'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Siti Ayu',
    '+62 812-0000-1111',
    'confirmed',
    95000,
    'Pickup at 7pm',
    '[{"item":"Ayam Bakar Spesial","qty":2}]'::jsonb
  ),
  (
    '00000000-0000-0000-0000-00000000o002'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Rahmat H',
    '+62 811-2222-333',
    'in-progress',
    54000,
    'Deliver via GoFood',
    '[{"item":"Es Teh Manis","qty":2}]'::jsonb
  )
on conflict (id) do nothing;

-- Sample loyalty members
insert into loyalty_member (id, restaurant_id, full_name, email, phone, points, tier, last_visit)
values
  (
    '00000000-0000-0000-0000-00000000l001'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Dewi Kartika',
    'dewi@example.com',
    '+62 813-4444-5555',
    820,
    'gold',
    (now() - interval '3 day')::date
  ),
  (
    '00000000-0000-0000-0000-00000000l002'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Made Surya',
    'made@example.com',
    '+62 812-6666-7777',
    420,
    'silver',
    (now() - interval '7 day')::date
  )
on conflict (id) do nothing;

-- Sample reviews
insert into review (id, restaurant_id, author_name, rating, comment, status, published_at)
values
  (
    '00000000-0000-0000-0000-00000000r001'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Rani P',
    5,
    'Ayam bakarnya super juicy dan sambalnya mantap!',
    'published',
    now() - interval '5 day'
  ),
  (
    '00000000-0000-0000-0000-00000000r002'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Tommy G',
    4,
    'Delivery cepat dan nasi gorengnya wangi.',
    'published',
    now() - interval '2 day'
  )
on conflict (id) do nothing;

-- Sample assistant macros
insert into assistant_macro (id, restaurant_id, title, prompt, tags)
values
  (
    '00000000-0000-0000-0000-00000000m001'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Delivery ETA',
    'Thanks for ordering! Your meal is on the way and should arrive within 30 minutes.',
    array['delivery','eta']
  ),
  (
    '00000000-0000-0000-0000-00000000m002'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Reservation Confirmation',
    'Your table is confirmed. Please arrive 10 minutes early so we can welcome you properly.',
    array['reservations']
  )
on conflict (id) do nothing;

-- Sample homepage blocks
insert into page_block (id, restaurant_id, page, block_type, content_json, position, locale)
values
  (
    '00000000-0000-0000-0000-00000000p001'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'home',
    'hero',
    '{"eyebrow":"Ayam Bakar Jaya","title":"Grilled perfection, delivered hot","subtitle":"Order online or reserve a table in under a minute.","ctaPrimary":{"label":"Order now","href":"/orders"},"ctaSecondary":{"label":"Book a table","href":"/reservations"}}',
    0,
    'default'
  ),
  (
    '00000000-0000-0000-0000-00000000p002'::uuid,
    '00000000-0000-0000-0000-000000000001'::uuid,
    'home',
    'feature-grid',
    '{"title":"House favourites","items":[{"title":"Ayam Bakar","description":"Smoky, juicy, and grilled to order."},{"title":"Sambal Variety","description":"Choose from 5 handcrafted sambal blends."}]}',
    1,
    'default'
  )
on conflict (id) do nothing;
