# Loyalty Feature Blueprint

## Value Proposition
Increase repeat visits with tiered rewards, points tracking, and leaderboards tied to real Supabase data.

## Experience Overview
- Public loyalty page: hero CTA, membership benefits, tier highlights, and leaderboard sourced from `loyalty_member` points.
- Admin console: manage members (create/edit/delete), adjust points, set last-visit dates.
- Automation hooks: future integration with orders to auto-earn points and trigger lifecycle comms.

## Implementation Checklist
1. Apply migration `restaurant-template/supabase/migrations/202510200940__orders_loyalty_reviews_chat.sql` to create `loyalty_member`.
2. Seed sample members via `docs/client-data/loyalty.csv` or admin UI.
3. Ensure `site_config.enabled_pages` includes `loyalty` and add any hero copy under `site_config.features.loyalty`.
4. Deploy UI components from `restaurant-template/src/domains/loyalty/` and verify `/loyalty` + `/admin/loyalty` routes.

## KPIs
- New loyalty sign-ups per week
- Average points balance per active member
- Reward redemption rate (once rewards schema ships)
