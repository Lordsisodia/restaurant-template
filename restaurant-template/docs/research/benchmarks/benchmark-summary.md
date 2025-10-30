# Bali Web Benchmarks — Above‑the‑Fold Summary (mobile‑first)

Scope: 10 Bali restaurant sites — Sisterfields, Mama San, La Brisa, Locavore NXT, Kaum, Merah Putih, Motel Mexicola, Seasalt, Mozaic, (plus Potato Head hub for Kaum context).

## Key mobile patterns (what great sites do)
- Visible primary actions: Reserve/Menu/Order/WhatsApp visible without a menu tap.
- Hero clarity: 1–2 short lines + 1–2 clear CTAs (Reserve/Menu). Avoid long paragraphs.
- Essentials up front: hours, map/directions, delivery partners, contact chips.
- First‑scroll momentum: “Popular dishes” or “What’s On” tiles before generic copy.
- Sticky affordances: keep Reserve or quick actions visible as you scroll.
- Brand energy via imagery: food/venue shots with a subtle overlay for legibility.

## Comparative matrix (at‑a‑glance)
- Reserve‑led (Locavore NXT, Kaum, Mozaic, Seasalt): single bold CTA + minimal copy.
- Editorial/event‑led (Mama San, La Brisa, Motel Mexicola): hero + “What’s On” tiles, booking stays visible.
- Café/quick‑service (Sisterfields, Merah Putih): essentials + partners shown early; quick link to Menu/Order.

## Template deltas to outperform
1) Essentials chips (landing `essentials-section`): Hours • Map • Partners • WhatsApp under the hero on mobile.
2) What’s On row: 2–4 tiles for specials/events/promos; optional on/off per tenant.
3) Popular Dishes: 4–8 best‑sellers with price + Add on the home first scroll.
4) Sticky Reserve: keep Reserve visible (if reservations enabled) in header actions and bottom quick bar.
5) Brand overlay: ensure hero supports photography (overlay gradient, readable type).
6) Partner badges: GoFood/Grab/ShopeeFood badges/links near hero for café/casual tenants.
7) Ratings snippet: rating badge + one recent review pulled mid‑page.

## Actionable backlog (components)
- `EssentialsRenderer` (Hours/Map/WA/Partners)
- `WhatsOnCarousel` (compact cards)
- `PopularDishesGrid` (uses menu data)
- `PartnerBadges` (GoFood/Grab/ShopeeFood icons + links)
- `StickyReserveCTA` (header + bottom bar integration)

## Acceptance
- Above‑the‑fold shows hero + essentials + a primary CTA without scroll.
- First scroll surfaces What’s On or Popular Dishes.
- Quick actions persist as you scroll.

References
- See individual specs in docs/research/benchmarks/*.md
