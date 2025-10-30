# Specials Feature Blueprint

## Value Proposition
Promote time-bound discounts and highlighted dishes without redeploying the site. Specials power both landing page highlights and admin scheduling workflows.

## Experience Overview
- **Customer:** Landing page sections and menu callouts pull specials for the active tenant, showing savings text and availability windows.
- **Admin:** `/admin/specials` screen lists all specials with create/update/delete actions, scoped by `restaurant_id`.
- **API:** Server repository `restaurant-template/src/domains/archive/specials/server/specials.repository.ts` joins specials with menu items/categories and formats savings strings.

## Implementation Checklist
1. Apply migration `restaurant-template/supabase/migrations/202510200910__specials_core.sql` to create the `special` table.
2. Seed reference data (optional) via `scripts/setup/import-specials.mjs` or direct Supabase inserts.
3. Ensure menu categories (`category`) and items (`item`) exist—`special.target_id` references those UUIDs.
4. Expose specials in tenant config if needed (e.g. toggle in `site_config.features.specials`).
5. Verify landing page carousel (`SpecialtySlider`) and admin grid render newly created specials.

## Data Contract
- Table: `special`
  - `scope`: `item` | `category`
  - `target_id`: UUID of the menu item/category
  - `type`: `percent` | `fixed` | `bogo`
  - `value`: integer (percentage or amount in smallest currency unit)
  - `days_of_week`: array of weekday numbers (0 = Sunday)
  - Optional timing fields: `start_time`, `end_time`, `start_date`, `end_date`

## KPIs
- Conversion lift for highlighted dishes (order count vs. baseline)
- Average discount margin impact
- Percentage of specials configured with complete metadata (images, description)
