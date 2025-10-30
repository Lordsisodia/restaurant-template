# Loyalty Domain

**Status:** Beta — customer page and leaderboard live; admin workflows in progress.

## Purpose
Reward repeat guests with tiered benefits, track point balances, and highlight top diners using Supabase-driven data.

## Current Coverage
- Public loyalty page featuring hero CTA, membership showcase, tier highlights, and leaderboard fed by `loyalty_member` points.
- Server repository to list/create/update/delete members with tenant scoping via `restaurant_id`.
- Admin experience skeleton (`/admin/loyalty`) reusing shared table templates for CRUD (needs UX polish).

## Data Dependencies
- Supabase table: `loyalty_member` (see `docs/data-schema/loyalty.md`).
- Feature flags: `site_config.features.loyalty` toggles nav exposure; defaults live in `pods.json`.

## Near-Term Tasks
- Add rewards catalog UX once `loyalty_reward` schema lands.
- Implement automated point accrual (orders → loyalty) using Supabase functions or edge workers.
- Localise copy and add transactional email hooks for tier promotions.

## References
- Code: `restaurant-template/src/domains/loyalty/`
- Data reference: `docs/data-schema/loyalty.md`
- Feature blueprint: `docs/template-system/features/loyalty.md`
