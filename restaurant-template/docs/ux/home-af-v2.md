# Home Above‑the‑Fold v2 (mobile‑first)

Status: draft • Last updated: 2025‑10‑22

Derived from Bali benchmark patterns to out‑perform typical restaurant landings.

## Structure (mobile)
- Header: logo + title; right side shows a persistent primary CTA (Reserve or Order).
- SectionTabs: Menu • Specials • Reviews • Contact (overflow in hamburger).
- HeroMedia: food/venue image with 1–2 lines of copy and two CTAs (Reserve/Menu).
- Essentials chips (`essentials-section` primary): Hours • Map • WhatsApp/Call • Partners (GoFood/Grab/ShopeeFood).
- What’s On (optional): 2–4 cards for specials/events/promos.

## Rules
- Keep hero copy ≤ 110 chars; never more than 2 lines.
- One decisive action (Reserve or Order) should be present twice: header and hero.
- EssentialsChips must be visible without scrolling on standard mobile viewports.

## Defaults
- If tenant lacks brand assets, use default hero and neutral chips; hide Partners if not configured.
- If tenant is reservation‑led, second CTA becomes “View Menu”; if takeaway‑led, second CTA becomes “Order Now”.

## Acceptance
- On first paint, users see: logo/title, tabs, hero with two CTAs, and essentials chips.
- Scrolling 1 screen reveals What’s On or Popular Dishes.

## Implementation Notes
- Components to add: `EssentialsRenderer`, `PartnerBadges`, `WhatsOnCarousel`, `PopularDishesGrid`.
- Analytics: track chip clicks and CTA usage.

References: docs/research/benchmarks/benchmark-summary.md
