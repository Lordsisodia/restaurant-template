# Menu Domain

**Status:** Production — SSR customer page and admin management both live.

## Purpose
Provide a rich browsing experience for menu categories/items, plus admin CRUD tooling backed by Supabase schemas.

## Current Coverage
- Category-sections customer view with Suspense fallback, error boundary, and animated sections (`pages/MenuPageCategorySections`).
- Shared components for hero, filters, cards, detail modals, and empty/error states (`components/`).
- Server repository abstractions for Supabase data (`category`, `item`, `variant`, modifiers).
- Admin page (`/admin/menu`) for creating categories/items with optimistic UI via React Query.
- Utility scripts under `restaurant-template/scripts/setup/` for seeding menu tables.

## Data Dependencies
- Supabase tables: `category`, `item`, `variant`, `modifier_group`, `item_modifier_group`, `modifier`, `allergen_tag`, `item_allergen`, `availability_window` (see `docs/data-schema/menu.md`).
- Supabase policies rely on `restaurant_id` to scope rows per tenant.

## Near-Term Tasks
- Surface availability windows + modifier groups in the customer UI.
- Extend admin tooling with variant/modifier management and bulk imports.
- Connect Cloudinary asset picker for item imagery (currently manual URL input).

## References
- Code: `restaurant-template/src/domains/menu/`
- Data reference: `docs/data-schema/menu.md`
- Testing: `docs/testing.md`
