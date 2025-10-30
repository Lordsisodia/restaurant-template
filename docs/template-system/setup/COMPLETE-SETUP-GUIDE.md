# Complete Setup Guide

Provision a new tenant using the `restaurant-template/` Next.js project.

## Prerequisites
- Supabase project with SQL access + storage enabled.
- Vercel project (or preferred host) for `restaurant-template` deployment.
- Cloudinary account with folder-per-tenant convention.
- Environment variables copied from `restaurant-template/.env.example` (see `scripts/setup/init-restaurant.mjs`).

## Steps
1. **Install dependencies** — `cd restaurant-template && pnpm install` (or `npm install`).
2. **Run migrations** — apply SQL files under `restaurant-template/supabase/migrations/` via Supabase CLI or dashboard.
3. **Seed tenant** — execute `pnpm setup:init` to create base restaurant + site config, or run `scripts/setup/init-restaurant.mjs` manually.
4. **Import menu/reviews** — use `pnpm setup:menu` / `pnpm setup:reviews` scripts or Supabase CSV imports based on `docs/client-data/`.
5. **Upload media** — follow `docs/template-system/setup/MEDIA-SETUP.md` for Cloudinary folder creation and bulk uploads.
6. **Configure auth** — set Supabase environment variables and test `updateSession` middleware per `docs/template-system/setup/AUTH-SETUP.md`.
7. **Deploy** — connect repo to Vercel, set env vars, and trigger first deploy.
8. **Verify** — run through `docs/testing.md` smoke tests and note results in `docs/project-history/`.

## Helpful References
- Supabase helper scripts: `restaurant-template/scripts/dev/*`
- Deployment: `docs/template-system/deployment/DRACO-DEPLOYMENT-GUIDE.md`
- Troubleshooting: `restaurant-template/src/app/(admin)/debug` routes.
