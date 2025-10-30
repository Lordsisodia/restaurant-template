# Loyalty Domain

**Status:** MVP implemented – live loyalty highlights sourced from Supabase members table.

## Purpose
Showcase the loyalty programme (tiers, perks, top diners) and drive sign-ups without needing a separate marketing build.

## Page Composition
`src/domains/customer-facing/loyalty/pages/LoyaltyPage.tsx` now orchestrates typed section renderers:
1. `<LoyaltyHeroRenderer>` – hero banner (eyebrow, headline, CTA objects).
2. `<LoyaltyMembershipShowcaseRenderer>` – interactive membership card showcase.
3. `<LoyaltyTierHighlightsRenderer>` – gradient tier grid fed with tier copy.
4. `<LoyaltyTopDinersRenderer>` – leaderboard derived from Supabase members.

## Data Flow
- `listMembers()` (shared service) fetches loyalty members from Supabase.
- Leaderboard derived in-page; tiers currently hard-coded (replace with Supabase config when available).
- Tenant context pulled via `getTenantFromRequest()` to personalise copy.

## Backlog / Enhancements
- Store tier definitions + perks in Supabase instead of hard-coded arrays.
- Add redemption history / rewards carousel components.
- Connect to admin domain for managing members, tiers, and promotions.
- Localise copy and ensure accessibility for leaderboard tables.

## References
- Code: `src/domains/customer-facing/loyalty/`
- Data: Supabase loyalty tables (see `supabase/migrations/*loyalty*`).
- UX: `docs/ux/page-blueprints.md` (loyalty section) & `docs/research/user-needs-by-page.md` for expectations around loyalty programmes.
- Schema: `docs/data-schema/orders_loyalty_chat.md`
