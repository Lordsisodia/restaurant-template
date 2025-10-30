# Mobile QA Checklist (Restaurant MVX)

Status: draft • Owner: QA • Last updated: 2025-10-21

## Devices & setup
- Test on iPhone 13/14 and a mid‑tier Android (e.g., Pixel 5a or Moto G‑class) in light/dark modes.
- Test on Wi‑Fi and throttled 4G (Chrome DevTools).

## Above‑the‑fold
- Header shows logo at left and a visible primary CTA at right (Order or Reserve); never hidden by hamburger.
- Sticky Quick Actions bar is visible: Menu, Order, Call/WA, Reserve. Tap targets ≥ 44×44. Safe‑area insets handled.
- Hero contains food image/video, a one‑line value prop, and two CTAs: Order, View Menu.

## First scroll
- Popular dishes visible with image, price, and Add/Customize.
- Specials visible with badges/tags and validity text.
- Social proof visible: rating badge and 1–3 reviews.
- Essentials strip present: Hours, Location (opens maps), Delivery partners, WhatsApp/Call.

## Navigation
- Section tabs (Menu • Specials • Reviews • Contact) remain discoverable on scroll.
- Hamburger reveals secondary pages; focus trap and ESC close work.

## Content & a11y
- All images have `alt` text; decorative images use empty alt.
- Color contrast meets WCAG AA (verify with axe DevTools or Lighthouse).
- Focus indicators visible; keyboard navigation does not trap.

## Performance (mobile)
- LCP ≤ 2.5s; CLS < 0.1; TBT < 200ms on throttled 4G mid‑tier device profile.
- Hero image is responsive and preloaded; no layout shift.

## Essentials
- WhatsApp/Call launches the correct app with correct number.
- Hours and Location are current; Map link opens native maps.
- Delivery partner chips are correct for the tenant (Grab/Gojek/etc.).

## Sign‑off artifact
- Attach: 4 screenshots (above‑the‑fold, popular dishes, specials, essentials strip) for both light and dark.
- Include Lighthouse JSON and axe report summary.

