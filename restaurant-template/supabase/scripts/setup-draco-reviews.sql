-- ==========================================================
-- STEP 1: Add Extended Fields to Review Table
-- ==========================================================

ALTER TABLE review
  ADD COLUMN IF NOT EXISTS source text DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS owner_response text,
  ADD COLUMN IF NOT EXISTS owner_responded_at timestamptz,
  ADD COLUMN IF NOT EXISTS helpful_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}';

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_review_featured
  ON review(restaurant_id, featured) WHERE featured = true;

CREATE INDEX IF NOT EXISTS idx_review_rating_status
  ON review(restaurant_id, rating, status) WHERE status = 'published';

-- ==========================================================
-- STEP 2: Create Draco Coffee And Eatery Restaurant
-- ==========================================================

INSERT INTO restaurants (
  id, tenant_group_id, name, slug, timezone, default_domain,
  vercel_project_slug, github_repo
) VALUES (
  '00000000-0000-0000-0000-000000000003'::uuid,
  (SELECT id FROM tenant_group LIMIT 1), -- Use existing tenant group
  'Draco Coffee And Eatery',
  'draco-coffee',
  'Asia/Makassar',
  'dracocoffee.com',
  'restaurant-draco',
  'siso/client-draco-coffee'
) ON CONFLICT (id) DO NOTHING;

-- ==========================================================
-- STEP 3: Seed 10 Featured Reviews for Draco
-- ==========================================================

-- Review 1: Pitachan
INSERT INTO review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images
) VALUES (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Pitachan',
  5,
  'Had a fantastic experience at Draco Coffee and Eatery! Their coffee is top-notch, rich and smooth. The food menu is also impressive, with delicious options that exceeded my expectations. Cozy atmosphere and great service 🌟👌 Perfect spot for a relaxing meal or coffee break! 😊',
  'published',
  NOW() - INTERVAL '1 month',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-1/photo-1.jpg", "/images/tenants/draco/reviews/review-1/photo-2.jpg"]'::jsonb
);

-- Review 2: Dara Mischella
INSERT INTO review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images
) VALUES (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Dara Mischella',
  5,
  'On a day when I wasn''t keen on venturing far from home, I stumbled upon Draco Coffee and Eatery on Jalan Mahendradatta Selatan No.7b in Denpasar. This cozy spot turned out to be the perfect refuge for catching up on emails while enjoying a great coffee.',
  'published',
  NOW() - INTERVAL '6 months',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-2/photo-1.jpg", "/images/tenants/draco/reviews/review-2/photo-2.jpg"]'::jsonb
);

-- Review 3: Danny Kwan
INSERT INTO review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images
) VALUES (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Danny Kwan',
  5,
  'Quite decent café in mahendradatta area, they serves complete meals from breakfast to dinner and actually also have wide range of menu from croissant, coffee, tea, western food, Indonesian food, healthy food, light bites and beers.',
  'published',
  NOW() - INTERVAL '1 year',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-3/photo-1.jpg"]'::jsonb
);

-- Review 4: Zsolt Zsemba (with owner response)
INSERT INTO review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images,
  owner_response, owner_responded_at
) VALUES (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Zsolt Zsemba',
  4,
  'I have lived near Draco a year ago and I am back once more. So hang on a second… This place deserves some good reviews, not because it''s the greatest thing in Bali but because of the staff. They remember me from a year ago, the same staff.',
  'published',
  NOW() - INTERVAL '1 year',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-4/photo-1.jpg"]'::jsonb,
  'Thank you for taking the time to write a review about your experience at Draco, and welcome back! We are so happy to hear that you feel welcomed and remembered by our staff; building warm and personal relationships with our guests is our priority.',
  NOW() - INTERVAL '11 months'
);

-- Review 5: Natasha Saleh - Coffee Farm + Dog Friendly!
INSERT INTO review (
  restaurant_id, author_name, rating, comment, status, published_at,
  source, verified, featured, images,
  metadata
) VALUES (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Natasha Saleh',
  5,
  'Perfect pit stop for coffee and lunch. Owner was so friendly and so passionate about coffee. He has a farm in kintamani Bali where he teaches how to farm, roast coffee. Food was good and prices good too. They were friendly with my dog too :)',
  'published',
  NOW() - INTERVAL '1 year',
  'Google Maps',
  true,
  true,
  '["/images/tenants/draco/reviews/review-5/photo-1.jpg"]'::jsonb,
  '{"highlights": ["Dog-friendly", "Owner has coffee farm in Kintamani", "Owner teaches farming & roasting"], "tags": ["coffee farm", "dog-friendly", "owner passion"]}'::jsonb
);

-- Print summary
DO $$
DECLARE
  review_count int;
  avg_rating numeric;
BEGIN
  SELECT count(*), round(avg(rating)::numeric, 1)
  INTO review_count, avg_rating
  FROM review
  WHERE restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid;

  RAISE NOTICE '✅ Successfully set up Draco Coffee And Eatery';
  RAISE NOTICE '📊 Reviews imported: %', review_count;
  RAISE NOTICE '⭐ Average rating: %', avg_rating;
END $$;
