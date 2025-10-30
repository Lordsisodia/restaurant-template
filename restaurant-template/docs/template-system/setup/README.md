# Setup Guides

Use this folder to get a tenant-ready instance of the restaurant template. Start with the quick checklist below, then dive into the individual guides when you need detail.

## 1. Core Flow
1. **Environment & Dependencies** – follow `COMPLETE-SETUP-GUIDE.md` for the end-to-end workflow (Node, env vars, database, runtime).
2. **Authentication** – configure Google OAuth + Supabase by following `AUTH-SETUP.md`.
3. **Media Storage** – connect Cloudinary, Supabase storage, and Unsplash via `MEDIA-SETUP.md`.
4. **Tenant Seed** – use `DRACO-COMPLETE-SETUP.md` as a reference for what “done” looks like (data, reviews, assets).

## 2. File Map
- `COMPLETE-SETUP-GUIDE.md` – master checklist from prerequisites through deployment.
- `AUTH-SETUP.md` – actionable Supabase Auth + Google OAuth instructions (with test steps).
- `MEDIA-SETUP.md` – free-tier strategy and configuration for images, videos, and demo assets.
- `DRACO-COMPLETE-SETUP.md` – Draco-specific completion log; treat as a gold-standard tenant example.

Historic guides and verbose walkthroughs now live under `docs/project-history/template-system/setup/`. Check there when you need the long-form narrative or earlier decisions.

**When updating:** keep these docs task-focused and link back to client data / template-system references where needed so future tenants can repeat the flow quickly.
