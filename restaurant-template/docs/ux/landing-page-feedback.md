# Landing Page Feedback (Ucodex Plan)

Owner: Product/UX
Date: 2025-10-22
Status: Draft for review

## 1) Goals
- Make the first scroll on mobile a full-bleed hero that feels premium (video preferred; graceful image fallback).
- Remove jank on initial load (avoid “black screen + icon” flash; show branded loader/skeleton and prioritize above‑the‑fold media).
- Make the core actions obvious: View Menu, Reserve a Table, Order/Delivery.
- Surface social proof and seasonal content immediately (specials carousel, 2–3 reviews, essentials like hours/location).
- Keep the nav minimal on mobile; expand to a full overlay when needed.
- End with a practical, trust‑building footer: key links, contact, optional address/map, and social.

## 2) What We Observed (App #1)
- Full-screen image on mobile with small logo and a top nav that opens into a full overlay.
- Refreshing the page often shows a black screen with only the icon before content appears.
- Below the hero: a specials/weekly strip with horizontal scrolling; sometimes a card for the menu; private events promoted; short “our story” text; opening times; gallery; strong footer.

Implications:
- The hero experience works, but the loading states and LCP media need improvement.
- The secondary strip (specials/story/opening times) is useful but should be lighter and faster.

## 3) Proposed Structure (Mobile‑First)
1) Top Nav
- Single burger icon; opens a full‑screen sheet/overlay with all links.
- Keep 2–3 quick actions visible near hero (e.g., Menu, Reserve).

2) Hero (Video Preferred)
- 100% of first viewport on mobile; 70–80vh on desktop.
- Autoplay muted background video on desktop; image poster on mobile unless good bandwidth detected.
- Clear dual CTAs: View Menu, Reserve Table. Optional tertiary: Order Online.

3) Menu Preview
- Short “Menu highlights” grid (4–6 items) with a See Menu button.

4) Specials / Weekly / Recommended
- Horizontal scroll (snap) cards. Show 3–6 items. Include validity (“This week”, “Today only”).

5) Private Events
- Single promo card linking to the events page; optional image carousel.

6) Story Teaser
- 2–3 lines with See Our Story; 1 supporting photo.

7) Essentials Strip
- Hours, Location, Contact, Delivery partners as compact chips.

8) Gallery (Optional)
- 6–8 images, lazy‑loaded, masonry or simple grid.

9) Newsletter or Loyalty
- One card: either “Join the newsletter” or “Get your loyalty card” (decide per business priorities).

10) Map/Directions (Optional)
- Embedded map if location matters; otherwise keep in footer.

11) Footer
- Brand block, key links, contact, social; address optional. Small legal links (Privacy/Terms).

## 4) Navigation Options (and Recommendation)
- Variant A: Burger only → overlay sheet listing all pages (cleanest on mobile).
- Variant B: 2–3 primary tabs + “More” button opening sheet (good compromise with many pages).
- Variant C: Scrollable pill tabs (for 4–8 sections). 

Recommendation: Start with Variant B (2–3 primary + “More”) for flexibility and focus; fall back to Burger only if pages are few.

## 5) Performance & Loading
- Avoid black‑screen on refresh: set body background to brand color; render logo/mark center with subtle fade; pre‑render hero poster image.
- Video guidelines: 1280×720, 24–30fps, H.264/MP4, 5–8MB target; provide `poster`. Respect `prefers-reduced-motion`.
- Images: provide `srcset` & `sizes`; use Next/Image; lazy‑load non‑critical media; compress aggressively; avoid layout shift.
- Budgets: LCP ≤ 2.5s (mobile), CLS ≤ 0.1, INP ≤ 200ms. Keep critical CSS in first paint. Preconnect to media CDNs.

## 6) Accessibility
- Overlay nav: trap focus; ESC to close; aria‑labels; visible focus rings.
- Hero video: no audio; pause/disable for `prefers-reduced-motion`. Always provide an image fallback with alt text.
- Carousels: keyboard reachable, visible pagination or next/prev controls.
- Color contrast: adhere to WCAG AA for text; ensure legible over media.

## 7) Content & CMS Model
- PageBlocks for: Hero, Menu Highlights, Specials, Story, Essentials, Gallery, Events Promo, Newsletter/Loyalty, Map, Footer.
- Site config drives nav labels, enabled pages, and features (e.g., `reservations`, `delivery.partners`).
- Specials and Reviews read from data sources; allow manual curation for highlights.

## 8) Implementation Mapping (This Repo)
- Top Nav variants host: `restaurant-template/src/shared/components/top-nav/TopNavHost.tsx:1` (switches between pills/segments/more‑sheet via `features.topNavVariant`).
- Hero (image): `restaurant-template/src/domains/customer-facing/landing/shared/components/HeroSection.tsx:1` (uses `ImageWithFallback`).
- Hero (video option): `restaurant-template/src/components/ui/hero-with-video.tsx:1` (desktop video + mobile image fallback).
- Landing composition: `restaurant-template/src/domains/customer-facing/landing/index.tsx:1` (hero, menu overview, specials, reviews, essentials, map).
- Footer: `restaurant-template/src/shared/components/TenantFooter.tsx:1` (links, contact, optional CTA; reads siteConfig features).
- Gallery: `restaurant-template/src/components/ui/simple-image-gallery.tsx:1` / `restaurant-template/src/components/ui/image-gallery.tsx:1`.
- Essentials strip: see Landing composition essentials block.

Notes:
- Reservations: wire CTAs to `/reservations` if enabled in `siteConfig.features`.
- Delivery partners: configured via `features.delivery.partners`.

## 9) Open Questions
1) Reservations vs Order Online: which is the primary CTA for this brand?
2) Hero video: do we have approved footage, or should we begin with a still image and add video later?
3) Newsletter vs Loyalty: which mechanism do we want for first‑party data capture on the landing page?
4) Location in footer: include address + map in the footer or on a separate Contact page only?
5) Specials cadence: daily, weekly, or seasonal? Who curates the highlights?
6) Private events: is there a dedicated page/form, or a simple contact CTA?
7) Social: which platforms are in‑scope (IG, TikTok, FB, Google)? Any embedded feeds?
8) Tone of copy: classic, modern, playful? Any brand words we should lock in?
9) Accessibility: any motion sensitivity preferences from stakeholders?
10) Analytics: GA4? Pixel? Any restrictions for consent banner and tracking?

## 10) 10 Exemplary Restaurant Websites (for visual reference)
Note: provided from prior knowledge; we’ll validate and refine together.
- Central (Lima) — `https://centralrestaurante.com.pe`
- Disfrutar (Barcelona) — `https://disfrutarbarcelona.com`
- Geranium (Copenhagen) — `https://geranium.dk`
- Noma (Copenhagen) — `https://noma.dk`
- Eleven Madison Park (NYC) — `https://www.elevenmadisonpark.com`
- Alinea (Chicago) — `https://www.alinearestaurant.com`
- The French Laundry (Yountville) — `https://thomaskeller.com/tfl`
- Osteria Francescana (Modena) — `https://www.osteriafrancescana.it`
- Pujol (Mexico City) — `https://pujol.com.mx`
- SingleThread (Healdsburg) — `https://www.singlethreadfarms.com`

## 11) Next Steps (Ucodex Backlog)
- Decide primary CTA (Reserve vs Order) → reflect in hero and footer.
- Choose top‑nav variant (`pills`, `segments`, or `more-sheet`).
- Approve hero media (poster image + optional video spec); compress and add to CDN.
- Confirm sections order and which are optional for MVP (Gallery/Map).
- Pick Newsletter vs Loyalty capture for the landing card.
- Provide hours, contact, address, and delivery partners list for Essentials.
- Define specials cadence and initial set to seed.

### Acceptance Criteria (MVP)
- Initial load shows branded background + logo; no black flash.
- Hero fills first viewport on mobile; video plays on desktop with image fallback on mobile.
- Two clear CTAs visible without scroll.
- Specials carousel is swipeable and keyboard accessible.
- Footer includes approved links and contact; address is either in footer or Contact page per decision.
- Core Web Vitals meet budgets on throttled mobile.
