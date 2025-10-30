# Component Inventory and Mapping (Mobile MVX)

Status: draft • Owner: Eng • Last updated: 2025-10-21

## Existing components (paths)
- Header (desktop + mobile hamburger): `restaurant-template/src/shared/components/TenantHeader.tsx`
- Footer: `restaurant-template/src/shared/components/TenantFooter.tsx`
- Page blocks renderer (hero, feature grid, CTA): `restaurant-template/src/shared/components/PageBlocksRenderer.tsx`
- Marketing layout wrapper: `restaurant-template/src/app/(marketing)/layout.tsx`
- Home composition (fallback blocks): `restaurant-template/src/app/page.tsx`

## New components to add (MVX)
- `QuickActionsBar.tsx` — sticky bottom bar with four primary actions (Menu, Order, Call/WA, Reserve).
- `SectionTabs.tsx` — horizontally scrollable section tabs under the hero.
- `HeroMedia.tsx` — hero with full‑bleed image/video, logo lockup, and two CTAs.

## Integration plan
1) Render `QuickActionsBar` in `marketing` layout so it appears on all public pages.
2) Insert `SectionTabs` in the home page and other public sections as needed.
3) Swap current hero in `PageBlocksRenderer` with `HeroMedia` when imagery is present; keep JSON fallback otherwise.

## Tenant data required
- features.contact.phone or features.contact.whatsapp for quick actions.
- Hours, address, and delivery partners for essentials chips.

## Tracking
- Fire `nav.quick_action_click` with { action: "menu|order|call|reserve" }.
- Fire `nav.section_tab_click` with { section: "menu|specials|reviews|contact" }.

