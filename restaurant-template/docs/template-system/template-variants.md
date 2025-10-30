# Template Variant Cookbook

Catalog of notable template variants across domains. Use it to pick designs quickly or to see which data each variant expects before wiring it into tenant config.

> **Tip:** Combine this with `docs/data-schema/` for the payload fields, and check each template folder’s README for visuals/examples.

## Landing Domain

| Section | Variant | Description | Data Requirements |
| --- | --- | --- | --- |
| hero-section | `primary` | Classic centered hero with pill badge and CTA buttons. | tenant name, tagline, CTA labels/links, hero media (image/video). |
| hero-section | `gradient-words` | Animated gradient words (“Awake. Alive. Until 11 PM.”) hero. | `features.hero.words[]`, CTA copy, hero image/video. |
| hero-section | `video-overlay` | Full-bleed hero with looping video overlay. | Cloudinary video, fallback image, CTA copy. |
| review-section | `classic` | Three-up review cards with rating badge and CTA. | Featured reviews (`featured = true` from Supabase). |
| review-section | `image-masonry` | Gradient masonry wall of testimonials. | Same as above; photo URLs preferred. |
| review-section | `glass-swiper` | Glassmorphism carousel for marquee testimonials. | Featured reviews, ideally with `photo_urls`. |
| essentials-section | `primary` | Essentials chips (hours, map link, WhatsApp/chat). | `features.contact` payload, delivery partners. |
| menu-section | `signature-dishes` | Featured dishes carousel with CTA. | Menu `items[]`, optional delivery deep link. |
| menu-section | `overview` | Tabbed grid of menu items by category. | Menu `items[]`, optional `viewAllHref`. |
| story-section | `primary` | Narrative block with optional carousel + highlights. | Story copy, CTA, optional images/highlights. |
| map-section | `primary` | Google Maps embed with label + lazy loading. | Address string, optional label/iframe title. |
| cta-section | `primary` | Mobile sticky CTA bar (primary + secondary actions). | CTA objects (`label`, `href`), scroll threshold. |
| gallery-section | `grid` | 3-column mosaic gallery for venue/food imagery. | Array of image URLs. |
| specials-section | `grid` | Chef specials grid with CTA to full specials page. | Specials `items[]` with title, description, type. |
| specials-section | `slider` | Auto-sliding specialty drinks showcase. | Beverage `items[]` with category, price/image data. |
| instagram-section | `primary` | Six-tile Instagram grid with incentive CTA. | Handle, Instagram URL, optional custom images. |

(See `src/domains/customer-facing/landing/*-section/README.md` for full list.)

## About Us Domain

| Section | Variant | Description | Data Requirements |
| --- | --- | --- | --- |
| hero-section | `primary` | Landing-style hero with pill + gradient text. | Story headline, subheadline, CTAs, hero media. |
| hero-section | `template-2` | Split layout hero (image left, story right). | Image + copy blocks. |
| hero-section | `template-3` | Full-frame hero with overlay stats. | Stats, tagline, imagery. |
| story-section | `primary` | Timeline of key milestones (vertical). | Timeline entries (year, description, media). |
| story-section | `template-2` | Horizontal timeline cards. | Same data as primary. |
| venue-gallery-section | `primary` | Filterable masonry gallery with lightbox. | Gallery categories + image URLs. |
| awards-section | `primary` | Google rating card + testimonial quotes. | Rating score, review snippets, awards list. |
| awards-section | `template-2` | Badge-focused awards layout. | Awards list, rating info. |
| cuisine-philosophy-section | `primary` | Four pillar cards (e.g. Sourcing, Coffee). | Pillar title, description, icon per card. |
| team-section | `primary` | Team grid with portraits. | Team member names, roles, bios, images. |

## Menu Domain (planned)

Template variants will align with landing’s template architecture once menu templates migrate fully. Current focus is on item detail modal + card enhancements (see domain README).

## Reviews Domain

| Component | Variant | Description | Data Requirements |
| --- | --- | --- | --- |
| RatingsSummary | `primary` | Stats panel with average rating & distribution. | Output of `get_rating_breakdown` Supabase fn. |
| ReviewCard | `primary` | Rich review card with photos & highlights. | Review row + `photo_urls` + `highlights`. |
| ReviewCard | `template-2` | Minimalist card for dense layouts. | Review row. |
| FilterBar | `primary` | Sidebar filters (rating, source, tags). | Filter metadata (tags, sources). |
| FilterBar | `template-2` | Horizontal chip filter bar. | Same as primary. |
| ReviewsGrid | `primary` | Responsive grid layout. | Review cards. |
| ReviewsGrid | `template-2` | Masonry layout (future). | Review cards. |
| AddReviewModal | `primary` | Modal for submitting reviews. | Authenticated user metadata, form schema. |

## Loyalty Domain

| Section | Variant | Description | Data Requirements |
| --- | --- | --- | --- |
| HeroSection | `primary` | Hero with CTA to join loyalty programme. | Tenant name, CTA text, hero imagery. |
| MembershipShowcase | `primary` | Perks grid + copy. | Copy blocks for membership benefits. |
| TierHighlights | `primary` | Cards for Bronze/Gold/Platinum tiers. | Tier name, description, perks. |
| TopDinersLeaderboard | `primary` | Leaderboard of top members (points). | Loyalty members sorted by points. |

## Chat Domain

| Component | Variant | Description | Data Requirements |
| --- | --- | --- | --- |
| chat templates | `template-1` | Embedded chat widget (bottom-right). | Messages array, tenant info, macros. |
| chat templates | `template-2` | Full-page chat view. | Same plus layout preferences. |
| hero-section | `primary` | Assistant hero with badge + dual CTA layout. | Tenant name, badge, description, primary/secondary CTAs. |
| hero-section | `template-1` | Gradient-styled assistant hero. | Same as primary hero content. |
| hero-section | `template-2` | Split hero layout (image + copy). | Same as primary hero content. |
| hero-section | `template-3` | Compact hero for mobile/secondary placements. | Same as primary hero content. |
| quick-replies-section | `primary` | Grid of canned assistant replies with tags and timestamps. | Macros array (id, title, prompt, tags, createdAt). |

## How to Extend
1. Pick the relevant section scaffold (`docs/domains/section-architecture.md`).
2. Add a new template folder (`templates/template-4`), define metadata, schema, and mock data.
3. Update the domain README and this cookbook with a short entry (purpose + required data).
4. Add visuals (Storybook screenshot or Figma link) to help PMs/clients pick variants.

As new domains shed their legacy code (menu, reservations, gift-cards), add their template variants here for a complete catalogue.
