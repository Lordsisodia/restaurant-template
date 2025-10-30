-- Seed Draco Coffee And Eatery Reviews
-- Imports the 10 featured reviews extracted from Google Maps
--
-- Prerequisites:
-- 1. Restaurants table must have Draco entry (restaurant_id from pods.json)
-- 2. Reviews enhanced migration must be run first (202510241400)
--
-- Usage: This will insert reviews with proper metadata

-- First, let's get the Draco restaurant ID
-- Restaurant ID from pods.json: 00000000-0000-0000-0000-000000000003

-- Insert the 10 featured reviews
-- Review 1: Pitachan - 5 stars
insert into review (
  restaurant_id,
  author_name,
  author_type,
  author_stats,
  rating,
  comment,
  date_relative,
  source,
  has_photos,
  photo_count,
  verified,
  featured,
  sentiment,
  tags,
  highlights,
  status,
  published_at
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Pitachan',
  'Local Guide',
  '55 reviews · 73 photos',
  5,
  'Had a fantastic experience at Draco Coffee and Eatery! Their coffee is top-notch, rich and smooth. The food menu is also impressive, with delicious options that exceeded my expectations. Cozy atmosphere and great service 🌟👌 Perfect spot for a relaxing meal or coffee break! 😊 #DracoCoffee #Foodie #CoffeeLover',
  'a month ago',
  'Google Maps',
  true,
  2,
  true,
  true,
  'very positive',
  '{coffee, food, atmosphere, service}'::text[],
  '{}'::text[],
  'published',
  now() - interval '1 month'
) on conflict do nothing
returning id as review_1_id;

-- Review 2: Dara Mischella - 5 stars
insert into review (
  restaurant_id,
  author_name,
  author_type,
  author_stats,
  rating,
  comment,
  date_relative,
  source,
  has_photos,
  photo_count,
  verified,
  featured,
  sentiment,
  tags,
  highlights,
  status,
  published_at
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Dara Mischella',
  'Local Guide',
  '97 reviews · 396 photos',
  5,
  'On a day when I wasn''t keen on venturing far from home, I stumbled upon Draco Coffee and Eatery on Jalan Mahendradatta Selatan No.7b in Denpasar. This cozy spot turned out to be the perfect refuge for catching up on emails while enjoying a great coffee.',
  '6 months ago',
  'Google Maps',
  true,
  2,
  true,
  true,
  'positive',
  '{coworking, coffee, location, emails}'::text[],
  '{}'::text[],
  'published',
  now() - interval '6 months'
);

-- Review 3: Danny Kwan - 5 stars
insert into review (
  restaurant_id,
  author_name,
  author_type,
  author_stats,
  rating,
  comment,
  date_relative,
  source,
  has_photos,
  photo_count,
  verified,
  featured,
  sentiment,
  tags,
  highlights,
  status,
  published_at
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Danny Kwan',
  'Local Guide',
  '950 reviews · 3,139 photos',
  5,
  'Quite decent café in mahendradatta area, they serves complete meals from breakfast to dinner and actually also have wide range of menu from croissant, coffee, tea, western food, Indonesian food, healthy food, light bites and beers.',
  'a year ago',
  'Google Maps',
  true,
  6,
  true,
  true,
  'positive',
  '{menu variety, all-day dining, beer, indonesian food}'::text[],
  '{}'::text[],
  'published',
  now() - interval '1 year'
);

-- Review 4: Zsolt Zsemba - 4 stars (with owner response)
with review_insert as (
  insert into review (
    restaurant_id,
    author_name,
    author_type,
    author_stats,
    rating,
    comment,
    date_relative,
    source,
    has_photos,
    photo_count,
    verified,
    featured,
    sentiment,
    tags,
    highlights,
    status,
    published_at
  ) values (
    '00000000-0000-0000-0000-000000000003'::uuid,
    'Zsolt Zsemba',
    'Local Guide',
    '246 reviews · 614 photos',
    4,
    'I have lived near Draco a year ago and I am back once more. So hang on a second… This place deserves some good reviews, not because it''s the greatest thing in Bali but because of the staff. They remember me from a year ago, the same staff.',
    'a year ago',
    'Google Maps',
    true,
    2,
    true,
    true,
    'positive',
    '{staff, friendly, returning customer, personal service}'::text[],
    '{}'::text[],
    'published',
    now() - interval '1 year'
  )
  returning id
)
insert into owner_response (review_id, restaurant_id, response_text, responder_role, created_at)
select id, '00000000-0000-0000-0000-000000000003'::uuid,
  'Thank you for taking the time to write a review about your experience at Draco, and welcome back! We are so happy to hear that you feel welcomed and remembered by our staff; building warm and personal relationships with our guests is our priority.',
  'owner',
  now() - interval '11 months'
from review_insert;

-- Review 5: Natasha Saleh - 5 stars (dog-friendly!)
insert into review (
  restaurant_id,
  author_name,
  author_type,
  author_stats,
  rating,
  comment,
  date_relative,
  source,
  has_photos,
  photo_count,
  verified,
  featured,
  sentiment,
  tags,
  highlights,
  status,
  published_at
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Natasha Saleh',
  'Local Guide',
  '161 reviews · 461 photos',
  5,
  'Perfect pit stop for coffee and lunch. Owner was so friendly and so passionate about coffee. He has a farm in kintamani Bali where he teaches how to farm, roast coffee. Food was good and prices good too. They were friendly with my dog too :)',
  'a year ago',
  'Google Maps',
  true,
  4,
  true,
  true,
  'very positive',
  '{owner, coffee farm, kintamani, dog-friendly, price, passion}'::text[],
  '{Dog-friendly, Owner has coffee farm in Kintamani, Owner teaches coffee farming & roasting, Good prices}'::text[],
  'published',
  now() - interval '1 year'
);

-- Review 6: Andrei Orlov - 5 stars (with owner response)
with review_insert as (
  insert into review (
    restaurant_id,
    author_name,
    author_type,
    author_stats,
    rating,
    comment,
    date_relative,
    source,
    has_photos,
    photo_count,
    verified,
    featured,
    sentiment,
    tags,
    highlights,
    status,
    published_at
  ) values (
    '00000000-0000-0000-0000-000000000003'::uuid,
    'Andrei Orlov',
    'Local Guide',
    '45 reviews · 44 photos',
    5,
    'I would like to express my appreciation for this incredibly comfortable place. The staff''s friendly personality was a breath of fresh air, and it made me feel welcomed and at home.',
    '2 years ago',
    'Google Maps',
    true,
    2,
    true,
    true,
    'very positive',
    '{comfortable, staff, welcoming, atmosphere}'::text[],
    '{}'::text[],
    'published',
    now() - interval '2 years'
  )
  returning id
)
insert into owner_response (review_id, restaurant_id, response_text, responder_role, created_at)
select id, '00000000-0000-0000-0000-000000000003'::uuid,
  'Thank you so much for your positive and warm review! We''re thrilled to hear that you enjoyed your visit, from the friendliness of our staff to the quality of our offerings.',
  'owner',
  now() - interval '23 months'
from review_insert;

-- Review 7: Wanda Therra Nova - 4 stars (with owner response)
with review_insert as (
  insert into review (
    restaurant_id,
    author_name,
    author_type,
    author_stats,
    rating,
    comment,
    date_relative,
    source,
    has_photos,
    photo_count,
    verified,
    featured,
    sentiment,
    tags,
    highlights,
    status,
    published_at
  ) values (
    '00000000-0000-0000-0000-000000000003'::uuid,
    'Wanda Therra Nova',
    'Local Guide',
    '106 reviews · 514 photos',
    4,
    'Cozy place to have a small lunch and sip of coffee in the afternoon. This place has aircon in the inside and the outside sitting place is for smoking area purpose and they provided fan for outdoor setting.',
    '3 years ago',
    'Google Maps',
    true,
    5,
    true,
    false,
    'positive',
    '{cozy, lunch, aircon, smoking area, outdoor seating}'::text[],
    '{Indoor: Air-conditioned, Outdoor: Smoking area with fans, Almond croissant mentioned as excellent}'::text[],
    'published',
    now() - interval '3 years'
  )
  returning id
)
insert into owner_response (review_id, restaurant_id, response_text, responder_role, created_at)
select id, '00000000-0000-0000-0000-000000000003'::uuid,
  'Thank you so much for your positive and detailed review! We''re thrilled to hear that you enjoyed your time here, from the refreshing iced latte to the flaky and sweet almond croissant. We strive to provide a diverse and high-quality menu.',
  'owner',
  now() - interval '2 years 11 months'
from review_insert;

-- Review 8: Adfeky Endriyane - 5 stars
insert into review (
  restaurant_id,
  author_name,
  author_type,
  author_stats,
  rating,
  comment,
  date_relative,
  source,
  has_photos,
  photo_count,
  verified,
  featured,
  sentiment,
  tags,
  highlights,
  status,
  published_at
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Adfeky Endriyane',
  'Local Guide',
  '22 reviews · 28 photos',
  5,
  'the food is good, and they have a big portion indeed! the coffee is da best! they''re roastery too! and the price is affordable. the co working space is comfy. they have uno cards and poker card too!',
  'a year ago',
  'Google Maps',
  true,
  1,
  true,
  true,
  'very positive',
  '{big portions, coffee roastery, affordable, coworking, games, uno, poker}'::text[],
  '{Big portions, They roast their own coffee, Affordable prices, Comfortable coworking space, Board games available (Uno, poker cards)}'::text[],
  'published',
  now() - interval '1 year'
);

-- Review 9: Yuangga Rizky Illahi - 5 stars (with owner response)
with review_insert as (
  insert into review (
    restaurant_id,
    author_name,
    author_type,
    author_stats,
    rating,
    comment,
    date_relative,
    source,
    has_photos,
    photo_count,
    verified,
    featured,
    sentiment,
    tags,
    highlights,
    status,
    published_at
  ) values (
    '00000000-0000-0000-0000-000000000003'::uuid,
    'Yuangga Rizky Illahi',
    'Local Guide',
    '175 reviews · 738 photos',
    5,
    'A coffee shop that become a very nice place for work. I do some zoom here and they have a private room in the cafe place for work. Devided by 3 segments, it have outside place for smoking, inside place for non smoking, and private place for meeting.',
    '2 years ago',
    'Google Maps',
    true,
    2,
    true,
    true,
    'very positive',
    '{coworking, zoom meetings, private room, 3 areas, smoking/non-smoking}'::text[],
    '{Great for work/remote work, Zoom meetings possible, Private room available for meetings, 3 distinct areas: Outdoor (smoking) Indoor (non-smoking) Private (meetings)}'::text[],
    'published',
    now() - interval '2 years'
  )
  returning id
)
insert into owner_response (review_id, restaurant_id, response_text, responder_role, created_at)
select id, '00000000-0000-0000-0000-000000000003'::uuid,
  'Thank you so much for taking the time to leave a positive review about your experience at our coffee shop! We are very pleased to know that you enjoy a comfortable working atmosphere, including the availability of private rooms that allow for productive meetings.',
  'owner',
  now() - interval '23 months'
from review_insert;

-- Review 10: putu suprimayanti - 5 stars (Indonesian, with owner response)
with review_insert as (
  insert into review (
    restaurant_id,
    author_name,
    author_type,
    author_stats,
    rating,
    comment,
    date_relative,
    source,
    has_photos,
    photo_count,
    verified,
    featured,
    sentiment,
    language,
    tags,
    highlights,
    status,
    published_at
  ) values (
    '00000000-0000-0000-0000-000000000003'::uuid,
    'putu suprimayanti',
    'Local Guide',
    '11 reviews · 19 photos',
    5,
    'The breakfast and lunch at Draco Coffee and Eatery were delicious. I highly recommend it for working from a cafe, perfect for groups of 2-4 people 🥺😍',
    'a year ago',
    'Google Maps',
    true,
    2,
    true,
    true,
    'very positive',
    'id',
    '{breakfast, lunch, wfc, work from cafe, small groups}'::text[],
    '{Excellent breakfast and lunch, Perfect for small work groups (2-4 people), Great for WFC (Work From Cafe)}'::text[],
    'published',
    now() - interval '1 year'
  )
  returning id
),
response_insert as (
  insert into owner_response (review_id, restaurant_id, response_text, responder_role, created_at)
  select id, '00000000-0000-0000-0000-000000000003'::uuid,
    'Thank you for taking the time to provide your review of Draco Coffee and Eatery. We are very happy to hear that you enjoyed breakfast and lunch at our place, and found our environment comfortable to work in, especially for groups of 2-4 people.',
    'owner',
    now() - interval '11 months'
  from review_insert
  returning review_id
)
-- Add Indonesian translation
insert into review_translation (review_id, language, translated_text, translation_source)
select review_id, 'id',
  'Sarapan dan makan siang di Draco Coffee and Eatery enak banget. Sangat rekomen untuk WFC, cocok untuk grup 2-4 orang 🥺😍',
  'manual'
from response_insert;

-- Print summary
do $$
begin
  raise notice 'Successfully seeded % reviews for Draco Coffee And Eatery',
    (select count(*) from review where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid);

  raise notice 'Rating breakdown:';
  raise notice '  5 stars: %', (select count(*) from review where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid and rating = 5);
  raise notice '  4 stars: %', (select count(*) from review where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid and rating = 4);

  raise notice 'Reviews with photos: %', (select count(*) from review where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid and has_photos = true);
  raise notice 'Featured reviews: %', (select count(*) from review where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid and featured = true);
  raise notice 'Owner responses: %', (select count(*) from owner_response where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid);
end $$;
