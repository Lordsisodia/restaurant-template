# Restaurant Mobile MVX (Minimum Viable Experience)

Status: draft • Owner: UI/UX • Last updated: 2025-10-21

## Problem
The first impression on phones felt like a tech demo: hidden navigation, generic hero, and no immediate paths to core guest actions. We shipped a functional template instead of a mobile‑first experience.

## Goals (what must be true on mobile)
- Primary actions are visible without any tap: Menu, Order, Call/WhatsApp, Reserve.
- Food photography (or short looped video) anchors the hero with a branded logo lockup and 2 CTAs.
- First scroll prioritizes: Popular dishes (with price + add), Today’s Specials, Social Proof (rating/review), then anything else.
- Essentials are one tap away: Hours, Location/Map, Delivery partners (Grab/Gojek), WhatsApp/Call.
- Fast and accessible: LCP ≤ 2.5s on a mid‑tier Android; tap targets ≥ 44×44; contrast meets WCAG AA.

## Non‑Goals (for the MVX pass)
- Full branding system and bespoke art direction. We’ll use tokens + tasteful defaults first, polish later.
- Complex loyalty/account flows. We surface sign‑in and balance, but keep it optional for ordering.

## Above‑the‑fold requirements
- Sticky bottom Quick Actions bar (always visible on mobile):
  - Menu, Order, Call/WA, Reserve (icons + labels).
  - Avoid overlap with the browser toolbar; use safe‑area insets.
- Top header: logo lockup at left, a single primary CTA at right (Order/Reserve) that is never hidden.
- Hero: full‑bleed image/video of food; 1‑line value prop; two buttons (Order, View Menu).

## First‑scroll content (in order)
1) Popular Dishes: 4–8 items with image, price, and Add/Customize.
2) Today’s Specials: 2–4 cards with tags (spicy/vegan) and valid‑through text.
3) Social Proof: rating badge + 1–3 recent reviews.
4) Essentials strip: Hours, Location (opens map), Delivery partners, WhatsApp/Call chips.

## Navigation pattern (mobile)
- Dual‑nav approach:
  - Persistent bottom Quick Actions (primary tasks).
  - Top scroller tabs for sections (Menu • Specials • Reviews • Contact).
  - Hamburger remains for overflow/secondary pages.

## Content pack (must‑have assets)
- Logo (SVG/PNG), brand primary color, 1–2 hero photos (2000px wide, responsive), 8–12 dish photos (square, 1200px), short tagline, WhatsApp/phone, hours, address, delivery partners, ratings snippet.

## Performance & a11y budgets
- LCP ≤ 2.5s (Moto G4/Simulated 4G); CLS < 0.1; TBT < 200ms.
- Serve hero via `next/image` with width hints and preload.
- Tap targets ≥ 44×44; visible focus; aria‑labels for icon buttons; semantic landmarks.

## Benchmarks (quick references)
- Bakmi GM – quick‑order priority, promos.
- HokBen – sticky actions/deals.
- Sate Khas Senayan – cuisine‑forward sections.
- Marugame Udon (ID) – app‑centric flows.
- Burgreens – clean, minimal, CTA‑driven.

## Acceptance criteria (Definition of Done)
- Bottom Quick Actions present on all public pages; top CTA and scroller visible.
- Hero has real imagery and two CTAs; copy ≤ 110 chars.
- First scroll shows Popular → Specials → Social Proof before feature bullets.
- Essentials chips present and tappable (WA/Call, Hours, Map, Partners).
- Real‑device QA checklist passed (see `docs/ux/mobile-qa-checklist.md`).

## Implementation notes
- New components planned: `QuickActionsBar`, `SectionTabs`, `HeroMedia`.
- Component inventory and backlog live below for quick reference.

## Component inventory (Oct 2025)
- **TenantHeader / TenantFooter** – shared shell elements under `src/shared/components/`.
- **PageBlocksRenderer** – renders hero/feature/CTA blocks on marketing pages.
- **Marketing layout** – `src/app/(marketing)/layout.tsx` wraps public routes and will host the Quick Actions bar.
- **Home composition** – `src/app/page.tsx` stitches current landing experience pending MVX upgrades.

## Component backlog
**P0 – build before MVX release**
- `QuickActionsBar` (mobile sticky bar for Menu / Order / Call/WA / Reserve)
- `SectionTabs` (top scroll tabs mapping to Menu • Specials • Reviews • Contact)
- `HeroMedia` (image/video hero with logo and dual CTAs)
- `DishCard`, `SpecialsCard`, `RatingBadge + ReviewCard`
- `BottomSheet` (add/customise dish flow) & `StickyOrderCTA`

**P1 – immediately after MVX**
- `ImageWithFallback`, `Chip`, `Badge`, `Toast`
- `ListTile` essentials strip
- `MapLink`, `WhatsAppButton`, `CallButton`

**P2 – nice-to-have**
- Promo `Carousel`, skeleton loaders, admin table primitives.

### External inspirations
- Elementree extraction targets (recommendation form, elemental sections, hero) archived in `docs/project-history/components/2025-10-21-cherry-picked-components.md` for future import.
