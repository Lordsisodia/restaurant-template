# ADR-0001: Mobile Navigation Pattern

Status: accepted • Deciders: Product, Design, Eng • Date: 2025-10-21

## Context
On phones, relying solely on a hamburger hides the primary journeys (Menu, Order, Call/WA, Reserve). Users perceived “no navigation.” We need a persistent, low-friction pattern.

## Decision
Adopt a dual-navigation approach on mobile:
- Persistent bottom Quick Actions: Menu, Order, Call/WA, Reserve.
- Top header keeps a visible primary CTA (Order or Reserve) at all times.
- Add a horizontal section scroller (Menu • Specials • Reviews • Contact) below the hero.
- Hamburger remains for overflow/secondary pages only.

## Consequences
- Implementation: build `QuickActionsBar`, `SectionTabs`, and integrate into `TenantLayout` for public pages.
- Content: require WhatsApp/phone, hours, address, and delivery partners per tenant.
- QA: add real-device checks (see `docs/ux/mobile-qa-checklist.md`).

## Alternatives considered
- Only top tabs (no sticky actions): discoverable but slower to core tasks.
- Only hamburger: lowest visual noise, highest friction and invisibility.

## Follow-ups
- Track usage of Quick Actions and section tabs in analytics once implemented.

