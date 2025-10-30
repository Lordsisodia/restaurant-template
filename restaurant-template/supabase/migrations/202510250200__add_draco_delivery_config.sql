-- Add Grab link and contact info to Draco Coffee site_config
-- This enables WhatsApp chat and Grab order buttons in the footer (side-by-side)

update site_config
set features = features || jsonb_build_object(
  'delivery', jsonb_build_object(
    'grabFood', 'https://food.grab.com/id/en/restaurant/draco-coffee-and-eatery-pemecutan-klod-delivery/3-C3Z6Y6FJBU2UGE'
  ),
  'contact', jsonb_build_object(
    'whatsapp', '6281338409090',
    'hours', 'Open until 11:00 PM',
    'address', 'Jl. Mahendradatta Selatan No.7b, Pemecutan Klod, Denpasar, Bali 80119'
  ),
  'socialMedia', jsonb_build_object(
    'instagram', '@draco.cofeeandeatery'
  )
)
where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid;
