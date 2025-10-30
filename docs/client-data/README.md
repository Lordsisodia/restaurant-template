# Client Data Seeds

Starter files for seeding tenant-specific Supabase data during onboarding.

## Contents
- `menu/` — CSV/JSON helpers for `category` + `item` imports (see README inside).
- `blog.md` — workflow for drafting posts before inserting into `post` table.
- `loyalty.csv` — sample rows matching `loyalty_member` schema.

## Import Workflow
1. Duplicate seed files per tenant and adjust copy/imagery.
2. Use `restaurant-template/scripts/setup/import-*.mjs` helpers or Supabase CSV import to load data.
3. Record deviations or manual fixes in `docs/project-history/` for traceability.
