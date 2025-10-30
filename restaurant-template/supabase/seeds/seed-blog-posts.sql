-- Seed data for blog posts
-- Run this after your restaurant is set up

-- Sample blog posts for testing
-- Replace YOUR_RESTAURANT_ID with your actual restaurant UUID

-- Post 1: Welcome post
INSERT INTO post (
  restaurant_id,
  title,
  slug,
  excerpt,
  content,
  category,
  image_url,
  read_time,
  published_at
) VALUES (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Welcome to Our Kitchen Stories',
  'welcome-to-our-kitchen-stories',
  'Discover the passion and creativity behind every dish we serve. Join us on a culinary journey through our kitchen.',
  '<p>Welcome to our blog! We''re thrilled to share the stories behind our kitchen, our team, and the dishes that make our restaurant special.</p>

<h2>Our Mission</h2>
<p>At our restaurant, we believe that every meal tells a story. From sourcing the freshest ingredients to crafting innovative flavor combinations, we pour our hearts into everything we create.</p>

<h2>What to Expect</h2>
<p>In this blog, you''ll find:</p>
<ul>
<li>Behind-the-scenes kitchen stories</li>
<li>Chef''s special recipes and cooking tips</li>
<li>Seasonal menu highlights</li>
<li>Events and special announcements</li>
</ul>

<p>Stay tuned for regular updates and don''t forget to follow us on social media!</p>',
  'News',
  '/images/blog/welcome.jpg',
  3,
  NOW()
);

-- Post 2: Recipe post
INSERT INTO post (
  restaurant_id,
  title,
  slug,
  excerpt,
  content,
  category,
  image_url,
  read_time,
  published_at
) VALUES (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'The Secret to Our Signature Pasta',
  'secret-signature-pasta',
  'Learn the techniques and ingredients that make our pasta dishes unforgettable.',
  '<p>One of our most requested dishes is our signature pasta. Today, we''re sharing some of the secrets that make it so special.</p>

<h2>Fresh Ingredients Matter</h2>
<p>We start with the finest imported Italian pasta and fresh, locally-sourced ingredients. The quality of your base ingredients makes all the difference.</p>

<h2>The Perfect Al Dente</h2>
<p>Cooking pasta to perfection requires attention and timing. Here''s our method:</p>
<ul>
<li>Always use plenty of salted water</li>
<li>Taste test 2 minutes before package instructions</li>
<li>Reserve pasta water for your sauce</li>
<li>Never rinse your pasta!</li>
</ul>

<h2>Building Flavor</h2>
<p>Our sauce is where the magic happens. We build layers of flavor through proper technique and timing.</p>

<blockquote>The secret isn''t in one ingredient - it''s in the love and technique you put into every step.</blockquote>

<p>Come visit us to experience the full dish, and try these techniques at home!</p>',
  'Recipes',
  '/images/blog/pasta-making.jpg',
  5,
  NOW() - INTERVAL '2 days'
);

-- Post 3: Event announcement
INSERT INTO post (
  restaurant_id,
  title,
  slug,
  excerpt,
  content,
  category,
  image_url,
  read_time,
  published_at
) VALUES (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Join Us for Our Summer Tasting Menu',
  'summer-tasting-menu-event',
  'Experience our exclusive 7-course summer tasting menu featuring seasonal ingredients and creative pairings.',
  '<p>We''re excited to announce our Summer Tasting Menu - a culinary journey through the season''s best flavors!</p>

<h2>Event Details</h2>
<p>Join us for an unforgettable evening of exceptional food and wine pairings.</p>

<ul>
<li><strong>When:</strong> Every Friday and Saturday in July</li>
<li><strong>Time:</strong> Two seatings - 6:00 PM and 8:30 PM</li>
<li><strong>Price:</strong> $85 per person (wine pairing +$45)</li>
<li><strong>Reservations:</strong> Required - limited seating</li>
</ul>

<h2>The Menu</h2>
<p>Our chef has crafted a special 7-course menu featuring:</p>
<ul>
<li>Fresh seafood from local waters</li>
<li>Heirloom tomatoes and summer vegetables</li>
<li>House-made pastas</li>
<li>Premium aged meats</li>
<li>Artisanal cheeses</li>
<li>Seasonal desserts</li>
</ul>

<h2>Book Your Table</h2>
<p>Spaces are limited! Book your reservation today and experience summer on a plate.</p>',
  'Events',
  '/images/blog/tasting-menu.jpg',
  4,
  NOW() - INTERVAL '5 days'
);

-- Post 4: Unpublished draft
INSERT INTO post (
  restaurant_id,
  title,
  slug,
  excerpt,
  content,
  category,
  image_url,
  read_time,
  published_at
) VALUES (
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Fall Menu Preview - Coming Soon',
  'fall-menu-preview',
  'Get a sneak peek at what we''re planning for our fall menu.',
  '<p>This is a draft post. The fall menu is still in development...</p>',
  'News',
  NULL,
  2,
  NULL  -- NULL means unpublished
);

-- Instructions for use:
-- 1. Replace 'YOUR_RESTAURANT_ID' with your actual restaurant UUID
-- 2. Update image URLs to match your actual image paths
-- 3. Run this SQL in your Supabase SQL editor or via migration
-- 4. Published posts will appear on your blog immediately
-- 5. The unpublished draft will only be visible in the admin panel
