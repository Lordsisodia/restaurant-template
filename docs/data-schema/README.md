# Data Schema Index

Quick reference for Supabase tables that power the restaurant template. Full definitions live in `restaurant-template/supabase/migrations/`.

## Available Docs
- `landing.md`
- `menu.md`
- `reviews.md`
- `loyalty.md`
- `blog.md`
- `chat.md`

## Conventions
- Every table includes `restaurant_id` for tenant scoping; RLS policies restrict access to the active tenant.
- Timestamp columns (`created_at`, `updated_at`) rely on the shared `set_updated_at` trigger where applicable.
- Prefer enums or constrained text fields for statuses (`status`, `scope`, `type`) defined in migrations.
