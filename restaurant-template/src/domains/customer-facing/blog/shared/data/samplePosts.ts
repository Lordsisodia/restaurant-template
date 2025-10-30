import type { BlogPost } from '../server/blogRepository';

const createIso = (date: string) => new Date(date).toISOString();

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 'sample-post-001',
    title: 'How Draco Coffee Sources Single-Origin Beans from Kintamani Farmers',
    slug: 'draco-single-origin-kintamani',
    excerpt: "Discover how Draco Coffee and Eatery in Denpasar, Bali partners with Kintamani farmers to serve traceable single-origin coffee with vibrant tasting notes.",
    content: /* html */ `
<p>Every cup at Draco Coffee and Eatery in Denpasar, Bali starts at sunrise in the volcanic Kintamani highlands. By partnering directly with smallholder farmers, our coffee shop secures traceable beans that showcase citrus, cacao, and panela flavors unique to the region.</p>
<h2>Direct Trade With Measurable Community Impact</h2>
<p>Our sourcing team visits cooperative partners quarterly to plan harvest volumes, advance fair payments, and train pickers on selective harvesting. These investments stabilize farmer income, preserve shade-grown agroforestry, and elevate bean quality for every pour-over in Denpasar.</p>
<h2>How The Relationship Shapes Your Daily Brew</h2>
<p>We roast each lot individually to highlight Kintamani's signature acidity and sweetness. Ask our baristas for the single-origin flight to taste seasonal microlots, or grab a retail bag with detailed brew guides and QR codes linking to farmer stories.</p>
<ul>
  <li>Join our Wednesday cuppings at 4 PM to learn tasting techniques.</li>
  <li>Follow @dracocoffee for farm updates, harvest photos, and exporter interviews.</li>
  <li>Each retail bag funds village water filtration projects and agronomy training.</li>
</ul>
<p>Reserve a tasting via the <a href="/loyalty">Draco Loyalty portal</a> and experience how farm-level relationships elevate Denpasar coffee culture.</p>
`,
    publishedAt: createIso('2025-01-15T08:00:00+08:00'),
    createdAt: createIso('2025-01-10T09:00:00+08:00'),
    category: 'Sourcing',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80',
    readTime: 5,
  },
  {
    id: 'sample-post-002',
    title: 'Rainy Season Brunch Pairings: Comfort Plates & Coffee at Draco',
    slug: 'rainy-season-brunch-pairings',
    excerpt: "Layer cozy rainy-season brunch dishes with signature coffees and mocktails at Draco Coffee and Eatery, the go-to Denpasar brunch spot in Bali.",
    content: /* html */ `
<p>Monsoon showers in Denpasar call for warming comfort food. Our Bali brunch menu balances turmeric, pandan, and nutmeg to pair perfectly with bright single-origin coffees and zero-proof cocktails crafted for stormy afternoons.</p>
<h2>Plates Built For Bali's Rainy Afternoons</h2>
<p>Chef Ayu layers roasted pumpkin, soft-poached village eggs, and coconut hollandaise over sourdough for a hearty vegetarian star. Carnivores can dive into our beef rendang hash topped with pickled shallots for refreshing acidity.</p>
<h2>Signature Pairings Beyond Espresso</h2>
<p>Try the Raincloud Flat White dusted with nutmeg or the Tamarind Ginger Spritz for a caffeine-light option. Both beverages were engineered to complement rich brunch plates while highlighting local Indonesian spices.</p>
<ul>
  <li>Weekend brunch runs 8 AM-2 PM with live acoustic sets at noon.</li>
  <li>Pre-book a table and add a pastry board through our <a href="/menu">online menu</a>.</li>
  <li>Draco Loyalty members earn double points whenever rain hits Denpasar.</li>
</ul>
<p>Save your favorite pairing in the Draco app so our hosts can have it ready when the clouds roll in over Bali.</p>
`,
    publishedAt: createIso('2025-01-29T08:00:00+08:00'),
    createdAt: createIso('2025-01-24T10:30:00+08:00'),
    category: 'Menu',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-003',
    title: 'Designing a Zero-Waste Kitchen at Draco Coffee and Eatery',
    slug: 'zero-waste-kitchen-draco',
    excerpt: "See how Draco Coffee and Eatery in Bali runs a zero-waste kitchen by composting scraps, upcycling coffee grounds, and tracking sustainability KPIs.",
    content: /* html */ `
<p>Reducing waste is a daily discipline inside Draco Coffee and Eatery's Denpasar kitchen. We design Bali-inspired menus around whole-ingredient utilization, reuse spent espresso grounds, and publish transparent diversion metrics to keep sustainability front of mind.</p>
<h2>Grounds, Scraps, and Creative Reuse Streams</h2>
<p>Spent espresso grounds become exfoliating soap bars in our retail nook, while citrus peels dehydrate into zero-proof garnishes. Vegetable trim feeds our broth program, and anything left heads to a community compost hub supporting local farmers.</p>
<h2>Tracking Progress With Guests</h2>
<p>A sustainability dashboard near the host stand outlines quarterly diversion results. Scan the QR code to view current waste metrics, upcoming workshops, and opportunities to vote on new upcycling prototypes.</p>
<ul>
  <li>Bring your own container on Tuesdays for discounted broth refills.</li>
  <li>Join our zero-waste workshop series launching this March in Denpasar.</li>
  <li>Request a sustainability tour when booking private tasting menu events.</li>
</ul>
<p>Your visit helps prove that modern Bali dining can stay premium while protecting the planet.</p>
`,
    publishedAt: createIso('2025-02-12T08:00:00+08:00'),
    createdAt: createIso('2025-02-06T16:45:00+08:00'),
    category: 'Sustainability',
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1600&q=80',
    readTime: 5,
  },
  {
    id: 'sample-post-004',
    title: 'Remote Work Ready: Co-Working Amenities at Draco Coffee',
    slug: 'remote-work-at-draco',
    excerpt: "Explore Draco Coffee and Eatery's coworking pods, fiber internet, and loyalty perks designed for digital nomads working in Denpasar, Bali.",
    content: /* html */ `
<p>Denpasar's remote work scene keeps growing, so Draco Coffee and Eatery transformed its mezzanine into a productivity hub. Expect ergonomic seating, quiet pods, meeting rooms, and bottomless batch brew tailored for digital nomads stationed in Bali.</p>
<h2>Designed For Focus And Collaboration</h2>
<p>Acoustic paneling, fast fiber internet, and adjustable lighting keep you locked in during work sprints. Need collaboration space? Reserve our eight-seat project table equipped with screen mirroring and magnetic ideation boards.</p>
<h2>Loyalty Perks That Boost Your Daily Routine</h2>
<p>Members unlock pre-order beverage queues, secure device lockers, and off-peak discounts on brunch sets. We also partnered with local yoga studios and wellness brands to offer exclusive post-work stretch credits.</p>
<ul>
  <li>Reserve coworking hours directly through the <a href="/membership">membership page</a>.</li>
  <li>Enjoy quiet hours daily from 8 AM-11 AM with focused playlists.</li>
  <li>Monthly community mixers spotlight Denpasar founders, designers, and coders.</li>
</ul>
<p>Bring your laptop, plug in, and let our Bali baristas handle the rest of your day.</p>
`,
    publishedAt: createIso('2025-02-26T08:00:00+08:00'),
    createdAt: createIso('2025-02-20T13:15:00+08:00'),
    category: 'Lifestyle',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-005',
    title: 'Autumn Spice Meets Tropical Produce: Our Seasonal Tasting Menu',
    slug: 'autumn-spice-tasting-menu',
    excerpt: "Preview Draco Coffee and Eatery's autumn tasting menu in Denpasar, Bali where spice-route flavors meet seasonal tropical produce.",
    content: /* html */ `
<p>Chef Ayu's autumn tasting menu reimagines spice-route flavors through Bali's vibrant produce. Guests in Denpasar can savor seven courses that blend cinnamon, clove, and star anise with rambutan, salak, and locally harvested cacao.</p>
<h2>Seven Courses, Endless Storytelling</h2>
<p>Expect smoked pumpkin veloute with candlenut crumble, espresso-glazed duck breast with tamarillo chutney, and cacao nib pavlova finished with cardamom cream. Every plate celebrates Bali terroir while honoring global culinary techniques.</p>
<h2>Thoughtful Beverage Pairings</h2>
<p>Our beverage director pairs each course with rotating wine, coffee, or zero-proof flights. Look for barrel-aged cascara tonics, natural wine selections, and single-estate chardonnay poured tableside.</p>
<ul>
  <li>Two seatings nightly Friday through Sunday.</li>
  <li>Optional coffee pairing available with 48-hour notice.</li>
  <li>Notify us of dietary preferences to customize your Denpasar tasting experience.</li>
</ul>
<p>Secure your table via the <a href="/menu">tasting menu page</a> before Bali's seasons shift.</p>
`,
    publishedAt: createIso('2025-03-12T08:00:00+08:00'),
    createdAt: createIso('2025-03-05T18:20:00+08:00'),
    category: 'Menu',
    imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80',
    readTime: 6,
  },
  {
    id: 'sample-post-006',
    title: 'Functional Wellness Lattes Leading 2025 Beverage Trends',
    slug: 'wellness-lattes-2025',
    excerpt: "Sip wellness-forward lattes at Draco Coffee and Eatery in Denpasar featuring adaptogens, collagen foam, and Bali botanicals for mindful routines.",
    content: /* html */ `
<p>Wellness-oriented beverages are shaping Bali's 2025 cafe trends, and Draco Coffee and Eatery is leading with functional latte innovations. Our Denpasar bar team layers adaptogens, collagen, and botanicals into indulgent drinks that support mindful routines.</p>
<h2>What Makes These Lattes Functional</h2>
<p>The Focus Cortado blends lion's mane extract with velvety espresso, while the Golden Cloud Latte stirs ashwagandha caramel into house-made cashew milk. A photogenic blue pea foam infused with collagen tops select brews.</p>
<h2>Pairing Tips And Rituals</h2>
<p>Enjoy your latte alongside oat-chia breakfast jars or grab a courtyard stretch session before returning to work. Our baristas tailor add-ins based on energy goals and taste preferences.</p>
<ul>
  <li>Available daily until 3 PM with rotating Bali spice infusions.</li>
  <li>Add a wellness shot to any drink for IDR 15k.</li>
  <li>Loyalty members collect wellness stamps toward free refills.</li>
</ul>
<p>Visit the brew bar to personalize your latte and learn about each functional ingredient.</p>
`,
    publishedAt: createIso('2025-03-26T08:00:00+08:00'),
    createdAt: createIso('2025-03-20T11:05:00+08:00'),
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-007',
    title: "Guide to Denpasar's Coffee Culture: Neighborhood Cafes We Love",
    slug: 'denpasar-coffee-culture-guide',
    excerpt: "Plan a Denpasar coffee crawl with Draco Coffee and Eatery's curated map of Bali cafes, signature drinks, and local barista tips.",
    content: /* html */ `
<p>Denpasar's coffee scene thrives on creativity, and Draco Coffee and Eatery is proud to be part of the circuit. Use our curated map to explore neighborhood cafes before wrapping up with sunset pours and dessert flights at our Bali flagship.</p>
<h2>Morning Routes Through Renon And Beyond</h2>
<p>Start with minimalist brew bars serving hand-drip Kalosi beans, then visit open-air cafes featuring coconut cold brew. We include Google Map links plus suggested visit times to beat the crowds.</p>
<h2>Finish Your Crawl At Draco Coffee</h2>
<p>Close the day with our Midday Flight-three small-format brews featuring Kintamani, Toraja, and rotating guest roasters. Pair the tasting with savory pastries baked by Chef Raka each morning.</p>
<ul>
  <li>Download the printable coffee crawl PDF embedded in this post.</li>
  <li>Tag #DracoCoffeeCrawl to unlock a complimentary filter coffee.</li>
  <li>Ask our hosts for rideshare and parking recommendations around Denpasar.</li>
</ul>
<p>Whether you live in Bali or are visiting for the weekend, let this guide connect you to the artisans fueling the island's coffee culture.</p>
`,
    publishedAt: createIso('2025-04-09T08:00:00+08:00'),
    createdAt: createIso('2025-04-04T12:00:00+08:00'),
    category: 'Local Guide',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80',
    readTime: 6,
  },
  {
    id: 'sample-post-008',
    title: "Cold Brew at Home: Brewing Draco's Midnight Cascade",
    slug: 'cold-brew-midnight-cascade',
    excerpt: "Learn how to brew Midnight Cascade cold brew from Draco Coffee and Eatery with Bali-inspired infusions and expert grind settings.",
    content: /* html */ `
<p>Bring Draco Coffee and Eatery's signature Midnight Cascade cold brew into your Bali home kitchen. With the right grind size, water ratio, and infusion choices, you can recreate our Denpasar cafe's smooth concentrate anytime.</p>
<h2>Dial In The Brewing Variables</h2>
<p>Use a coarse grind, filtered water, and a 1:4 coffee-to-water ratio. Steep for 16 hours in the refrigerator, then double filter for clarity. Adjust steep time if you prefer brighter acidity or deeper chocolate notes.</p>
<h2>Infusion Ideas With Island Flair</h2>
<p>Try pandan syrup, orange peel, or cascara reduction to add tropical sweetness. Serve Midnight Cascade over coconut water ice cubes or blend with tonic for an afternoon spritz.</p>
<ul>
  <li>Pick up a cold brew kit and reusable bottle from our retail shelf.</li>
  <li>Follow the step-by-step tutorial video linked inside the loyalty dashboard.</li>
  <li>Share your home brew on social and tag @dracocoffee for a feature.</li>
</ul>
<p>Prefer a hands-free option? Order bottled Midnight Cascade through our delivery partners across Denpasar.</p>
`,
    publishedAt: createIso('2025-04-23T08:00:00+08:00'),
    createdAt: createIso('2025-04-18T17:40:00+08:00'),
    category: 'Recipes',
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-009',
    title: 'Pastry Chef Spotlight: Indonesian Cocoa Meets Viennoiserie',
    slug: 'pastry-chef-spotlight-indonesian-cocoa',
    excerpt: "Meet Chef Raka of Draco Coffee and Eatery in Denpasar and taste Viennoiserie folded with Indonesian cacao nibs and Bali-grown ingredients.",
    content: /* html */ `
<p>Chef Raka blends French viennoiserie technique with Indonesian cacao to craft irresistible morning pastries at Draco Coffee and Eatery in Denpasar, Bali. Each batch showcases locally roasted nibs, cultured butter, and tropical fillings that sell out fast.</p>
<h2>From Bean To Butter</h2>
<p>We roast cacao nibs in-house before folding them into laminated dough. The meticulous process amplifies aroma without sacrificing flaky structure, resulting in croissants, cruffins, and kouign-amann with Bali flair.</p>
<h2>Limited Drops Worth Setting An Alarm For</h2>
<p>Arrive for the 9 AM pastry release to snag cacao nib cruffins with gula melaka caramel, passionfruit pain au chocolat, and vegan laminated rolls. Pair your pastry with the single-origin mocha for a cocoa-on-cocoa moment.</p>
<ul>
  <li>Pre-order via WhatsApp to secure your favorites.</li>
  <li>Join our monthly pastry masterclass led by Chef Raka.</li>
  <li>Take home DIY pastry kits stocked with Indonesian ingredients.</li>
</ul>
<p>The aroma alone is worth the early visit-our pastry team will save you a seat by the display case.</p>
`,
    publishedAt: createIso('2025-05-07T08:00:00+08:00'),
    createdAt: createIso('2025-05-02T09:45:00+08:00'),
    category: 'Team',
    imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-010',
    title: 'Live Music Thursdays: Crafting the Perfect Evening at Draco',
    slug: 'live-music-thursdays-draco',
    excerpt: "Discover the artists, cocktails, and reservation tips that make Live Music Thursdays at Draco Coffee and Eatery a Denpasar nightlife staple.",
    content: /* html */ `
<p>Thursday nights at Draco Coffee and Eatery transform our Denpasar cafe into a listening lounge with Bali's best musicians. Acoustic sets, vinyl pop-ups, and collaborative cocktails deliver a relaxed yet elevated nightlife experience.</p>
<h2>Rotating Lineups And Limited Cocktails</h2>
<p>Expect jazz trios, indie vocalists, and DJ collectives on rotation. Beverage director Ika crafts a limited cocktail and zero-proof list each week, highlighting local botanicals and espresso infusions.</p>
<h2>Plan Your Evening</h2>
<p>Doors open at 7 PM with two 45-minute sets. Reserve bar seating for an immersive view or opt for lounge couches if you plan to share small plates.</p>
<ul>
  <li>Early-bird reservations include a complimentary welcome drink.</li>
  <li>Pair music nights with shareable grazing boards and dessert flights.</li>
  <li>Check Instagram Stories every Thursday for artist announcements.</li>
</ul>
<p>Secure your table through the <a href="/menu">events section</a> and make Live Music Thursdays part of your Denpasar ritual.</p>
`,
    publishedAt: createIso('2025-05-21T08:00:00+08:00'),
    createdAt: createIso('2025-05-15T14:30:00+08:00'),
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-011',
    title: 'Farm-to-Cup Immersions: Touring Our Partner Plantations',
    slug: 'farm-to-cup-immersions',
    excerpt: "Join Draco Coffee and Eatery's quarterly farm immersion from Denpasar to Kintamani and witness Bali coffee harvesting, processing, and cupping.",
    content: /* html */ `
<p>If you want to understand how coffee cherries become espresso shots, join Draco Coffee and Eatery's farm immersion. The Denpasar-based tour shuttles guests to partner plantations in Kintamani and Bangli for hands-on education.</p>
<h2>What The Day Looks Like</h2>
<p>We start with sunrise farm walks, cover processing techniques, and invite you to roast a micro-batch alongside producers. A farm-to-table lunch highlights seasonal Bali produce and single-origin pairings.</p>
<h2>Reserve Your Spot</h2>
<p>Seats are limited to 12 guests to preserve an intimate experience. Ticket prices cover transport from Draco, educational materials, and a take-home coffee kit.</p>
<ul>
  <li>Next tour departs June 14; loyalty members receive early access.</li>
  <li>Bring comfortable shoes, sunscreen, and a reusable water bottle.</li>
  <li>Follow-up cupping sessions happen the following week in Denpasar.</li>
</ul>
<p>Secure your immersion through the concierge desk or DM us on Instagram for availability.</p>
`,
    publishedAt: createIso('2025-06-04T08:00:00+08:00'),
    createdAt: createIso('2025-05-29T08:10:00+08:00'),
    category: 'Experiences',
    imageUrl: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=1600&q=80',
    readTime: 5,
  },
  {
    id: 'sample-post-012',
    title: 'Reusable Packaging and Refill Programs You Can Join',
    slug: 'reusable-packaging-refill-programs',
    excerpt: "Swap single-use cups for Draco Refill jars, earn loyalty bonuses, and help the Denpasar cafe cut waste by 40% with Bali's first refill program.",
    content: /* html */ `
<p>Single-use plastics don't fit our vision for sustainable Bali hospitality. Draco Refill empowers Denpasar guests to replace disposable cups with reusable jars, tracking each refill for perks and carbon savings.</p>
<h2>How The Refill Program Works</h2>
<p>Purchase a starter kit or bring a clean container. Scan the QR code at checkout to earn loyalty points redeemable for drinks, pastries, and merch.</p>
<h2>Impact So Far</h2>
<p>In the first quarter, guests diverted 1,200 cups from landfills. Help us reach the next milestone and unlock a community beach clean-up celebration.</p>
<ul>
  <li>Refill discounts apply to cold brew, kombucha, and house-made soups.</li>
  <li>Members view refill history inside the <a href="/loyalty">loyalty dashboard</a>.</li>
  <li>Corporate partners can request refill stations for offices in Denpasar.</li>
</ul>
<p>Join the movement on your next visit and feel good about every Bali brew you sip.</p>
`,
    publishedAt: createIso('2025-06-18T08:00:00+08:00'),
    createdAt: createIso('2025-06-12T15:25:00+08:00'),
    category: 'Sustainability',
    imageUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-013',
    title: 'Plan a Bali Foodie Weekend with Draco as Your Home Base',
    slug: 'bali-foodie-weekend-guide',
    excerpt: "Build a three-day Bali foodie itinerary anchored at Draco Coffee and Eatery with Denpasar markets, beach sunsets, and chef-driven dining.",
    content: /* html */ `
<p>Planning a Bali getaway? Use Draco Coffee and Eatery as your Denpasar home base for a flavor-packed weekend. We curated a 72-hour itinerary that covers markets, beach sunsets, and chef-led dining experiences across the island.</p>
<h2>Day One: Arrival And Sunset Sips</h2>
<p>Check in with a welcome espresso tonic, tour nearby art galleries, and finish with beachfront seafood in Jimbaran. Our concierge can book transport and reservations.</p>
<h2>Day Two: Market-To-Table Adventures</h2>
<p>Start at Badung Market with our guides, attend a cooking class, then wind down at Draco for Live Music Thursday. We share Google Maps routes and ride-hailing tips.</p>
<ul>
  <li>Download the Bali foodie map bundle linked in this guide.</li>
  <li>Ask our concierge for vetted drivers and tour partners.</li>
  <li>Reserve tasting menus in advance for high season weekends.</li>
</ul>
<p>Follow the itinerary or mix and match-either way, Draco keeps you caffeinated and inspired throughout your Bali vacation.</p>
`,
    publishedAt: createIso('2025-07-02T08:00:00+08:00'),
    createdAt: createIso('2025-06-26T10:00:00+08:00'),
    category: 'Travel',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    readTime: 5,
  },
  {
    id: 'sample-post-014',
    title: '2025 Holiday Gift Guide for Coffee Lovers',
    slug: '2025-holiday-gift-guide-coffee',
    excerpt: "Shop Draco Coffee and Eatery's 2025 Bali holiday gift guide featuring brew kits, tasting vouchers, and coffee experiences for Denpasar enthusiasts.",
    content: /* html */ `
<p>Gift-giving is easy with Draco Coffee and Eatery's Bali holiday guide. We curated brew gear, tasting kits, and experiential vouchers that delight every coffee lover in Denpasar and beyond.</p>
<h2>Bundles Ready To Wrap</h2>
<p>Select the Espresso Explorer set, Home Barista starter kit, or Wellness Latte trio. Each bundle includes tasting notes, grind recommendations, and festive packaging.</p>
<h2>Experiences Worth Sharing</h2>
<p>Gift latte art classes, farm immersion tours, or seasonal tasting menus. Digital vouchers make last-minute giving effortless.</p>
<ul>
  <li>Order online and pick up in store with two-hour notice.</li>
  <li>Add hand-lettered cards from our calligraphy partners.</li>
  <li>Loyalty members unlock early access and bundle discounts.</li>
</ul>
<p>Visit the retail corner or shop through our website to spread caffeinated cheer across Bali.</p>
`,
    publishedAt: createIso('2025-07-16T08:00:00+08:00'),
    createdAt: createIso('2025-07-10T09:35:00+08:00'),
    category: 'Gifts',
    imageUrl: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-015',
    title: 'Barista Playbook: Latte Art Trends to Watch in 2025',
    slug: 'latte-art-trends-2025',
    excerpt: "Explore the latte art styles, microfoam textures, and milk alternatives leading 2025 at Draco Coffee and Eatery in Denpasar.",
    content: /* html */ `
<p>Latte art is evolving beyond classic rosettas at Draco Coffee and Eatery. Our Denpasar baristas experiment with layered tulip stacks, textured microfoam, and plant-based milks that hold intricate designs.</p>
<h2>Patterns On The Rise</h2>
<p>Expect 3D foam sculptures, negative-space illustrations inspired by Balinese batik, and etched latte art that photographs beautifully.</p>
<h2>Practice With The Pros</h2>
<p>Join our Sunday throwdowns or book the Latte Lab class to master pour control, milk texturing, and plate presentation for social media.</p>
<ul>
  <li>Monthly event calendars post on the blog and loyalty dashboard.</li>
  <li>Winners earn brew gear and charity donations in their name.</li>
  <li>Follow @dracocoffee for tutorial reels and behind-the-scenes content.</li>
</ul>
<p>Grab a front-row seat at the brew bar and watch latte art trends unfold in real time.</p>
`,
    publishedAt: createIso('2025-07-30T08:00:00+08:00'),
    createdAt: createIso('2025-07-24T16:10:00+08:00'),
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-016',
    title: 'Community Partnerships Supporting Denpasar Youth Creators',
    slug: 'community-partnerships-denpasar-youth',
    excerpt: "Learn how Draco Coffee and Eatery funds youth creator programs, pop-up markets, and scholarships for Denpasar's next generation.",
    content: /* html */ `
<p>Draco Coffee and Eatery thrives because of Denpasar's creative community. We collaborate with youth-led collectives to host pop-up markets, film screenings, and mentorship labs that empower emerging Bali makers.</p>
<h2>Programs We Fund Together</h2>
<p>Latte art competitions sponsor photography scholarships, while Live Music Thursdays allocate tips to instrument libraries. Pop-up markets showcase youth designers and culinary talent.</p>
<h2>How Guests Can Get Involved</h2>
<p>Attend quarterly maker fairs, donate gently used equipment, or volunteer during workshops. Corporate partners can underwrite internship stipends and creative grants.</p>
<ul>
  <li>Check the <a href="/about">community page</a> for upcoming events.</li>
  <li>Submit collaboration ideas via our open call form.</li>
  <li>Follow #DracoYouthLab for creator spotlights on Instagram.</li>
</ul>
<p>Thank you for helping Denpasar's next generation build sustainable creative careers.</p>
`,
    publishedAt: createIso('2025-08-13T08:00:00+08:00'),
    createdAt: createIso('2025-08-07T13:00:00+08:00'),
    category: 'Community',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-017',
    title: "Chef's Guide to Essential Balinese Spice Pastes",
    slug: 'balinese-spice-pastes-guide',
    excerpt: "Unlock base gede, sambal matah, and other Balinese spice pastes used at Draco Coffee and Eatery's Denpasar kitchen.",
    content: /* html */ `
<p>Great Balinese cuisine begins with aromatic spice pastes. Chef Ayu shares how Draco Coffee and Eatery builds base gede, sambal matah, and genep in our Denpasar kitchen to layer flavor into signature dishes.</p>
<h2>Base Gede: The Heartbeat Of Balinese Cooking</h2>
<p>This foundational paste combines shallots, galangal, candlenut, and turmeric. Learn how to toast each ingredient and grind to a silky consistency for soups, curries, and stir-fries.</p>
<h2>Sambal Variations With Heat And Texture</h2>
<p>Explore raw sambal matah, smoky sambal goreng, and citrus-forward sambal kecicang. We include heat-level notes and suggested pairings to try at home.</p>
<ul>
  <li>Download the prep chart PDF linked in the post.</li>
  <li>Book our hands-on spice class for deeper practice.</li>
  <li>Pick up retail spice kits stocked with Bali-grown aromatics.</li>
</ul>
<p>Master these pastes and you'll taste Bali in every bite you cook.</p>
`,
    publishedAt: createIso('2025-08-27T08:00:00+08:00'),
    createdAt: createIso('2025-08-21T09:25:00+08:00'),
    category: 'Recipes',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1600&q=80',
    readTime: 5,
  },
  {
    id: 'sample-post-018',
    title: 'Coffee-Infused Savory Plates: New Menu Collaborations',
    slug: 'coffee-infused-savory-plates',
    excerpt: "Taste coffee-infused savory dishes at Draco Coffee and Eatery, where Denpasar chefs collaborate with roasters on espresso glazes and cascara sauces.",
    content: /* html */ `
<p>Coffee belongs on more than the dessert menu. Draco Coffee and Eatery chefs collaborate with our roastery team to infuse espresso reductions and cascara syrups into savory plates that surprise Denpasar diners.</p>
<h2>Signature Collaborations To Try</h2>
<p>Highlights include espresso-glazed short ribs, cascara-scented carrot puree, and smoked oyster mushrooms finished with cold brew jus.</p>
<h2>Beverage Pairings That Mirror Each Plate</h2>
<p>Ask for beverage pairings that reflect each dish's tasting notes, from natural wine flights to nitro-brew spritzers. Our servers provide pairing cards you can take home.</p>
<ul>
  <li>Available nightly on the dinner menu with vegetarian options.</li>
  <li>Join the kitchen tour to see the coffee infusion station.</li>
  <li>Request a chef's counter seat for behind-the-scenes storytelling.</li>
</ul>
<p>Reserve a table online and experience coffee-forward cuisine in the heart of Bali.</p>
`,
    publishedAt: createIso('2025-09-10T08:00:00+08:00'),
    createdAt: createIso('2025-09-04T17:55:00+08:00'),
    category: 'Menu',
    imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-019',
    title: 'Unlocking Draco Rewards: Insider Loyalty Perks',
    slug: 'draco-loyalty-perks',
    excerpt: "See how Draco Loyalty tiers reward Denpasar regulars with private cuppings, surprise drops, and partner perks across Bali.",
    content: /* html */ `
<p>Draco Loyalty goes far beyond punch cards. We designed the program to delight Denpasar regulars with tiered rewards, personalized perks, and Bali partner collaborations that keep visits exciting all year.</p>
<h2>Tiered Perks Explained</h2>
<p>Copper to Diamond members unlock private cuppings, priority reservations, and double point windows during weather-triggered promos. The higher the tier, the richer the perks.</p>
<h2>Benefits Beyond The Cafe</h2>
<p>Members enjoy partnerships with yoga studios, co-working hubs, and boutique hotels. Sync your loyalty card with Apple Wallet or Google Wallet for instant check-ins.</p>
<ul>
  <li>Refer a friend and both accounts receive bonus brew credits.</li>
  <li>Watch for limited-edition merch drops in the Draco app.</li>
  <li>Track progress and perks inside the <a href="/loyalty">loyalty dashboard</a>.</li>
</ul>
<p>Join for free online or at the register so you never miss a Denpasar-exclusive perk.</p>
`,
    publishedAt: createIso('2025-09-24T08:00:00+08:00'),
    createdAt: createIso('2025-09-18T14:05:00+08:00'),
    category: 'Loyalty',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-020',
    title: 'Zero-Proof Pairings: Elevating Mocktails with Single-Origin Coffee',
    slug: 'zero-proof-coffee-mocktails',
    excerpt: "Experience zero-proof mocktails at Draco Coffee and Eatery blending cold brew, tropical botanicals, and sparkling teas for nightlife in Denpasar.",
    content: /* html */ `
<p>Our zero-proof program proves you don't need alcohol to celebrate in Bali. Each mocktail layers single-origin coffee, botanical syrups, and sparkling teas to deliver a sophisticated evening experience at Draco Coffee and Eatery.</p>
<h2>Signature Serves To Sip</h2>
<p>The Midnight Spritz mixes cold brew, calamansi, and tonic, while the Tropic Glow combines cascara, pineapple shrub, and nutmeg foam. Both drinks photograph beautifully for social feeds.</p>
<h2>Perfect Pairings For Night-Out Plans</h2>
<p>Pair mocktails with grazing boards, vegan satay skewers, or dessert flights for a balanced Denpasar evening.</p>
<ul>
  <li>Zero-proof menu launches nightly after 5 PM.</li>
  <li>Ask for custom pairings during private events or celebrations.</li>
  <li>Seasonal flavors rotate monthly to keep menus fresh.</li>
</ul>
<p>Request the zero-proof list when you arrive and discover your new favorite Bali ritual.</p>
`,
    publishedAt: createIso('2025-10-08T08:00:00+08:00'),
    createdAt: createIso('2025-10-02T11:45:00+08:00'),
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-021',
    title: 'Mindful Morning Rituals with Draco Coffee',
    slug: 'mindful-morning-rituals-draco',
    excerpt: "Set the tone for your day in Denpasar with guided breathing, curated playlists, and signature morning beverages from Draco Coffee and Eatery.",
    content: /* html */ `
<p>Mornings at Draco Coffee and Eatery are intentionally unhurried. Our Denpasar team designed rituals that blend sensory grounding with energizing beverages so you can start the day present and inspired.</p>
<h2>Breathe, Sip, And Reset</h2>
<p>Begin with a two-minute breathing track from our Spotify channel, then savor a hand-poured V60 served alongside citrus zest and a mindfulness prompt.</p>
<h2>Build Your Personalized Routine</h2>
<p>Customize a morning board with seasonal fruit, overnight oats, or adaptogenic shots. Baristas offer pairing suggestions based on focus, creativity, or recovery goals.</p>
<ul>
  <li>Morning ritual service runs 7 AM-10 AM daily.</li>
  <li>Book a standing reservation if you like the same seat each visit.</li>
  <li>Download the ritual checklist PDF to recreate the experience at home.</li>
</ul>
<p>Let Draco transform your Bali mornings into mindful, energizing rituals.</p>
`,
    publishedAt: createIso('2025-10-22T08:00:00+08:00'),
    createdAt: createIso('2025-10-16T09:55:00+08:00'),
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-022',
    title: 'Monsoon Season Comfort Food: Bowls, Broths, and Brews',
    slug: 'monsoon-season-comfort-food',
    excerpt: "Warm up during Bali's monsoon season with Draco Coffee and Eatery's nutrient-rich bowls, collagen broths, and spiced beverages.",
    content: /* html */ `
<p>When rain sweeps through Denpasar, comfort food at Draco Coffee and Eatery becomes essential. Our monsoon menu centers on hearty soups, slow braises, and cozy drinks that chase away chill while supporting immunity.</p>
<h2>Signature Comforts To Order</h2>
<p>Try the lemongrass chicken congee, jackfruit rendang pot pie, or roasted pumpkin soup finished with coconut cream and chili oil.</p>
<h2>Brews That Bring The Warmth</h2>
<p>Pair your bowl with ginger turmeric lattes, spiced mochas, or a buttered kopi tubruk for extra richness. Our baristas craft beverage pairings based on your heat tolerance.</p>
<ul>
  <li>Available June through September with takeaway-friendly packaging.</li>
  <li>Order family-style sets for rainy night delivery.</li>
  <li>Guests bringing reusable containers receive discounted broth refills.</li>
</ul>
<p>Reserve seats in advance when storms are forecast; our Denpasar dining room fills quickly once the clouds roll in.</p>
`,
    publishedAt: createIso('2025-11-05T08:00:00+08:00'),
    createdAt: createIso('2025-10-30T12:20:00+08:00'),
    category: 'Menu',
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-c71a5aa2537c?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-023',
    title: 'Third-Wave Coffee Terms Explained for Curious Guests',
    slug: 'third-wave-coffee-explained',
    excerpt: "Decode third-wave coffee terminology-from washed to natural process-so you can order with confidence at Draco Coffee and Eatery in Denpasar.",
    content: /* html */ `
<p>Third-wave coffee vocabulary can feel intimidating. Consider this your cheat sheet for ordering like a pro at Draco Coffee and Eatery, Denpasar's specialty cafe destination.</p>
<h2>Processing Methods And What They Mean</h2>
<p>We break down washed, natural, and honey processes, explaining how each impacts acidity, body, and sweetness in your cup.</p>
<h2>Brew Methods And When To Choose Them</h2>
<p>Curious about V60 versus Aeropress? We outline brew profiles, ideal bean pairings, and how to describe your preferences to our baristas.</p>
<ul>
  <li>Download the printable glossary linked within the guide.</li>
  <li>Request a guided tasting flight to experience differences side by side.</li>
  <li>Attend our Coffee 101 classes every first Saturday.</li>
</ul>
<p>Knowledge unlocks better cups-keep this reference handy for your next Bali coffee run.</p>
`,
    publishedAt: createIso('2025-11-19T08:00:00+08:00'),
    createdAt: createIso('2025-11-13T14:15:00+08:00'),
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1522202205574-08b056568563?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-024',
    title: 'How Draco Filmmakers Capture Short-Form Stories',
    slug: 'draco-short-form-storytelling',
    excerpt: "Step behind the scenes with Draco Coffee and Eatery's in-house media team to learn how we film viral reels that spotlight Denpasar hospitality.",
    content: /* html */ `
<p>Short-form video keeps our Denpasar cafe connected to guests worldwide. Draco Coffee and Eatery's media team scripts, shoots, and edits weekly reels that highlight menu launches, staff spotlights, and Bali lifestyle moments.</p>
<h2>The Content Workflow</h2>
<p>We storyboard shoots, capture footage on digital and film cameras, and edit with on-screen captions for accessibility. Lighting plans ensure our coffee, pastries, and interiors photograph beautifully.</p>
<h2>How Guests Can Participate</h2>
<p>Join open filming days, submit song requests, or take over our TikTok for twenty-four hours. We love seeing Draco through the community's lens.</p>
<ul>
  <li>Check the blog calendar for upcoming filming sessions.</li>
  <li>Use #DracoStories to be featured in our community recap.</li>
  <li>Brands can request collaborative shoots through our media kit.</li>
</ul>
<p>Lights, camera, latte-be part of the next story we share from Denpasar.</p>
`,
    publishedAt: createIso('2025-12-03T08:00:00+08:00'),
    createdAt: createIso('2025-11-27T15:45:00+08:00'),
    category: 'Behind the Scenes',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
  {
    id: 'sample-post-025',
    title: 'Smarter Reservations: AI Waitlist and Table Planning',
    slug: 'ai-reservations-draco',
    excerpt: "Discover how Draco Coffee and Eatery's AI-powered reservation system reduces waits, personalizes seating, and delights Denpasar guests.",
    content: /* html */ `
<p>We upgraded Draco Coffee and Eatery's reservation system with AI to predict foot traffic, manage waitlists, and remember guest preferences. The Denpasar dining experience stays seamless even during Bali's busiest weekends.</p>
<h2>Less Waiting, More Sipping</h2>
<p>The platform analyzes historical data and live walk-ins to estimate wait times accurately. Opt in for SMS alerts so you can explore nearby boutiques until your table is ready.</p>
<h2>Personalized Seating For Every Guest</h2>
<p>Whether you prefer brew-bar seating or mezzanine pods, the system stores preferences and flags special occasions for our hosts. Add dietary notes before arrival so the kitchen can prepare.</p>
<ul>
  <li>Join the waitlist online and track status in real time.</li>
  <li>Add guest notes, allergies, or celebration details in advance.</li>
  <li>Loyalty members see dynamic availability inside the Draco app.</li>
</ul>
<p>Book your next visit to experience hospitality that is both human and high-tech.</p>
`,
    publishedAt: createIso('2025-12-17T08:00:00+08:00'),
    createdAt: createIso('2025-12-11T10:50:00+08:00'),
    category: 'Operations',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    readTime: 4,
  },
];

export function getSamplePosts(): BlogPost[] {
  return sampleBlogPosts.map((post) => ({ ...post }));
}

export function findSamplePostBySlug(slug: string): BlogPost | undefined {
  const match = sampleBlogPosts.find((post) => post.slug === slug);
  return match ? { ...match } : undefined;
}
