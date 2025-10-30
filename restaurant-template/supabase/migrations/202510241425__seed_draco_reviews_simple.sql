-- Seed Draco Reviews (Simplified - Hardcoded Images)
-- Images are just static file paths, no separate photo table needed

-- Restaurant ID for Draco from pods.json
-- '00000000-0000-0000-0000-000000000003'

-- Review 1: Pitachan - Coffee & Food Excellence
insert into review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Pitachan',
  5,
  'Had a fantastic experience at Draco Coffee and Eatery! Their coffee is top-notch, rich and smooth. The food menu is also impressive, with delicious options that exceeded my expectations. Cozy atmosphere and great service 🌟👌 Perfect spot for a relaxing meal or coffee break! 😊',
  'published',
  now() - interval '1 month',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-1/photo-1.jpg", "/images/tenants/draco/reviews/review-1/photo-2.jpg"]'::jsonb
);

-- Review 2: Dara Mischella - Perfect for Remote Work
insert into review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Dara Mischella',
  5,
  'On a day when I wasn''t keen on venturing far from home, I stumbled upon Draco Coffee and Eatery on Jalan Mahendradatta Selatan No.7b in Denpasar. This cozy spot turned out to be the perfect refuge for catching up on emails while enjoying a great coffee.',
  'published',
  now() - interval '6 months',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-2/photo-1.jpg", "/images/tenants/draco/reviews/review-2/photo-2.jpg"]'::jsonb
);

-- Review 3: Danny Kwan - Wide Menu Variety
insert into review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Danny Kwan',
  5,
  'Quite decent café in mahendradatta area, they serves complete meals from breakfast to dinner and actually also have wide range of menu from croissant, coffee, tea, western food, Indonesian food, healthy food, light bites and beers.',
  'published',
  now() - interval '1 year',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-3/photo-1.jpg", "/images/tenants/draco/reviews/review-3/photo-2.jpg", "/images/tenants/draco/reviews/review-3/photo-3.jpg", "/images/tenants/draco/reviews/review-3/photo-4.jpg", "/images/tenants/draco/reviews/review-3/photo-5.jpg", "/images/tenants/draco/reviews/review-3/photo-6.jpg"]'::jsonb
);

-- Review 4: Zsolt Zsemba - Amazing Staff (with owner response)
insert into review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images,
  owner_response, owner_responded_at
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Zsolt Zsemba',
  4,
  'I have lived near Draco a year ago and I am back once more. So hang on a second… This place deserves some good reviews, not because it''s the greatest thing in Bali but because of the staff. They remember me from a year ago, the same staff.',
  'published',
  now() - interval '1 year',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-4/photo-1.jpg", "/images/tenants/draco/reviews/review-4/photo-2.jpg"]'::jsonb,
  'Thank you for taking the time to write a review about your experience at Draco, and welcome back! We are so happy to hear that you feel welcomed and remembered by our staff; building warm and personal relationships with our guests is our priority.',
  now() - interval '11 months'
);

-- Review 5: Natasha Saleh - Coffee Farm + Dog Friendly! ⭐ HIGH VALUE
insert into review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images,
  metadata
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Natasha Saleh',
  5,
  'Perfect pit stop for coffee and lunch. Owner was so friendly and so passionate about coffee. He has a farm in kintamani Bali where he teaches how to farm, roast coffee. Food was good and prices good too. They were friendly with my dog too :)',
  'published',
  now() - interval '1 year',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-5/photo-1.jpg", "/images/tenants/draco/reviews/review-5/photo-2.jpg", "/images/tenants/draco/reviews/review-5/photo-3.jpg", "/images/tenants/draco/reviews/review-5/photo-4.jpg"]'::jsonb,
  '{"highlights": ["Dog-friendly", "Owner has coffee farm in Kintamani", "Owner teaches farming & roasting"], "tags": ["coffee farm", "dog-friendly", "owner passion"]}'::jsonb
);

-- Review 6: Andrei Orlov - Incredibly Comfortable (with owner response)
insert into review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images,
  owner_response, owner_responded_at
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Andrei Orlov',
  5,
  'I would like to express my appreciation for this incredibly comfortable place. The staff''s friendly personality was a breath of fresh air, and it made me feel welcomed and at home.',
  'published',
  now() - interval '2 years',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-6/photo-1.jpg", "/images/tenants/draco/reviews/review-6/photo-2.jpg"]'::jsonb,
  'Thank you so much for your positive and warm review! We''re thrilled to hear that you enjoyed your visit, from the friendliness of our staff to the quality of our offerings.',
  now() - interval '23 months'
);

-- Review 7: Wanda Therra Nova - AC + Outdoor Seating (with owner response)
insert into review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images,
  owner_response, owner_responded_at,
  metadata
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Wanda Therra Nova',
  4,
  'Cozy place to have a small lunch and sip of coffee in the afternoon. This place has aircon in the inside and the outside sitting place is for smoking area purpose and they provided fan for outdoor setting.',
  'published',
  now() - interval '3 years',
  'Google Maps',
  true,
  false,
  '["/images/tenants/draco/reviews/review-7/photo-1.jpg", "/images/tenants/draco/reviews/review-7/photo-2.jpg", "/images/tenants/draco/reviews/review-7/photo-3.jpg", "/images/tenants/draco/reviews/review-7/photo-4.jpg", "/images/tenants/draco/reviews/review-7/photo-5.jpg"]'::jsonb,
  'Thank you so much for your positive and detailed review! We''re thrilled to hear that you enjoyed your time here, from the refreshing iced latte to the flaky and sweet almond croissant.',
  now() - interval '2 years 11 months',
  '{"highlights": ["Indoor: Air-conditioned", "Outdoor: Smoking area with fans"], "tags": ["aircon", "outdoor seating", "almond croissant"]}'::jsonb
);

-- Review 8: Adfeky Endriyane - Roastery + Big Portions + Games!
insert into review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images,
  metadata
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Adfeky Endriyane',
  5,
  'the food is good, and they have a big portion indeed! the coffee is da best! they''re roastery too! and the price is affordable. the co working space is comfy. they have uno cards and poker card too!',
  'published',
  now() - interval '1 year',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-8/photo-1.jpg"]'::jsonb,
  '{"highlights": ["Big portions", "They roast their own coffee", "Affordable", "Coworking space", "Uno and poker cards"], "tags": ["roastery", "portions", "games", "coworking"]}'::jsonb
);

-- Review 9: Yuangga Rizky Illahi - Private Room for Work (with owner response)
insert into review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images,
  owner_response, owner_responded_at,
  metadata
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Yuangga Rizky Illahi',
  5,
  'A coffee shop that become a very nice place for work. I do some zoom here and they have a private room in the cafe place for work. Devided by 3 segments, it have outside place for smoking, inside place for non smoking, and private place for meeting.',
  'published',
  now() - interval '2 years',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-9/photo-1.jpg", "/images/tenants/draco/reviews/review-9/photo-2.jpg"]'::jsonb,
  'Thank you so much for taking the time to leave a positive review! We are very pleased to know that you enjoy a comfortable working atmosphere, including the availability of private rooms that allow for productive meetings.',
  now() - interval '23 months',
  '{"highlights": ["Zoom-friendly", "Private room available", "3 seating areas"], "tags": ["coworking", "private room", "meetings", "zoom"]}'::jsonb
);

-- Review 10: putu suprimayanti - Perfect for Work Groups (with owner response)
insert into review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images,
  owner_response, owner_responded_at,
  metadata
) values (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'putu suprimayanti',
  5,
  'The breakfast and lunch at Draco Coffee and Eatery were delicious. I highly recommend it for working from a cafe, perfect for groups of 2-4 people 🥺😍',
  'published',
  now() - interval '1 year',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-10/photo-1.jpg", "/images/tenants/draco/reviews/review-10/photo-2.jpg"]'::jsonb,
  'Thank you for your review! We are very happy to hear that you enjoyed breakfast and lunch at our place, and found our environment comfortable to work in, especially for groups of 2-4 people.',
  now() - interval '11 months',
  '{"highlights": ["Great breakfast & lunch", "Perfect for small groups (2-4)"], "tags": ["breakfast", "lunch", "work from cafe"], "language": "id"}'::jsonb
);

-- Print summary
do $$
declare
  review_count int;
  avg_rating numeric;
begin
  select count(*), round(avg(rating)::numeric, 1)
  into review_count, avg_rating
  from review
  where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid;

  raise notice '✅ Successfully seeded % reviews for Draco Coffee And Eatery', review_count;
  raise notice '📊 Average rating: %', avg_rating;
  raise notice '⭐ 5-star reviews: %', (select count(*) from review where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid and rating = 5);
  raise notice '⭐ 4-star reviews: %', (select count(*) from review where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid and rating = 4);
  raise notice '📸 Reviews with images: %', (select count(*) from review where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid and jsonb_array_length(images) > 0);
  raise notice '💬 Owner responses: %', (select count(*) from review where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid and owner_response is not null);
  raise notice '⭐ Featured reviews: %', (select count(*) from review where restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid and featured = true);
end $$;
