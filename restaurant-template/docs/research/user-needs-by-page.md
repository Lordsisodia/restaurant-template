# User Needs by Page (Mobile‑first)

Status: draft • Owner: Product/Design • Updated: 2025‑10‑21

Notes
- Prioritize thumb‑reach, speed, and zero‑discovery to primary actions.
- Performance targets: LCP ≤ 2.5s good; INP ≤ 200ms; CLS < 0.1. See Web Vitals guidance. 
- Touch targets: ≥ 44×44 pt (Apple HIG); Material recommends 48dp min.

## Global (applies to all public pages)
- Persistent actions: Menu, Order, Call/WhatsApp, Reserve (bottom quick actions).
- Visible top CTA: Order or Reserve always visible in the header.
- Essentials discoverable in one tap: Hours, Location/Map, Delivery partners (Grab/Gojek), WhatsApp/Call.
- Language: ID/EN toggle for Bali audiences; currency: IDR.
- Payments (when applicable): GoPay, OVO, ShopeePay, cards — reflect local usage.

## Home (/)
User goals
- Decide quickly if the place fits (menu style, price vibe, availability today).
- Jump to order/reserve/call without hunting.

Must‑haves
- HeroMedia: appetizing image/video; two CTAs (Order, View Menu).
- SectionTabs: Menu • Specials • Reviews • Contact.
- Popular dishes: 4–8 items with price and Add.
- Today’s Specials: time‑boxed promos; badges (spicy/vegan/new).
- Social proof: rating summary + 1–3 reviews.
- Essentials strip: Hours, Map, Delivery partners, WhatsApp/Call.

## Menu (/menu)
User goals
- Browse quickly by category, see prices, add without deep drill‑downs.

Must‑haves
- Category chips (scrollable), search, diet tags (vegan/halal/spicy).
- DishCard: photo, name, short desc, price, tags, quick Add.
- BottomSheet for options (size, spice, sides, notes).
- StickyOrderCTA shows subtotal + Checkout; supports pickup/delivery choice.

## Specials (/specials)
- Grid of limited‑time items with validity (e.g., “Today”, “Fri–Sun”).
- CTA: Add or “See in Menu”.

## Orders (/orders)
User goals
- See live status and recent orders.

Must‑haves
- Status timeline: received → preparing → ready → out for delivery → delivered.
- Pickup instructions or courier tracking link (GoFood/GrabFood when applicable).
- Contact/issue button (WhatsApp/Call).

## Loyalty (/loyalty)
- Points summary, tier badge, recent activity, how to earn/redeem.
- CTA: Sign in with Clerk; show balance on card.

## Reviews (/reviews)
- Rating distribution, filters (recent/highest/with photos), write‑a‑review CTA.
- Surface a few photo reviews early.

## Reservations (/reservations)
- Date/time/party selector; preset chips; contact fields; confirmation sheet.
- Show hours, location, and rules (late policy, table time) up front.

## Contact (/contact)
- WhatsApp and Call buttons; hours; address with “Open in Maps”; email form.
- Delivery partner links.

## About (/about)
- Short brand story, chef note, team photo, provenance or halal info if relevant.

## Blog (/blog)
- Post list with categories; simple article template with hero image.

## Gift Cards (/gift-cards)
- Denomination selector, send/claim CTA, T&C summary.

## Accessibility & Performance
- Tap targets ≥ 44×44 pt; visible focus; semantic headings.
- Hero/media via responsive images with preload; avoid layout shifts.
- Keep INP (interaction latency) under 200ms; optimize cart interactions.

References
- Web Vitals thresholds (LCP ≤ 2.5s; INP ≤ 200ms): see docs and guidance.
- Apple HIG hit targets 44×44 pt; Material minimum touch sizes 48dp.

