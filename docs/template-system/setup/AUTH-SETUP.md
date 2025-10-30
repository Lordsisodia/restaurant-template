# Auth Setup

The template relies on Supabase Auth for both customer experiences and the admin console. Follow this guide to configure the project end to end.

## Supabase Configuration
1. **Enable providers** — turn on Email magic links and any required OAuth providers in the Supabase dashboard.
2. **Environment variables** — set these for local `.env.local` and your hosting provider:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_DB_PASSWORD`
3. **Apply migrations** — run SQL files in `restaurant-template/supabase/migrations/` so tables, functions, and RLS policies exist before traffic hits the app.
4. **Session middleware** — confirm `restaurant-template/src/lib/supabase/middleware.ts` is active. It refreshes sessions and enforces redirects for `/admin` routes.
5. **Staff mapping** — insert staff accounts into the `staff_user` table after they sign in. RLS policies should check `restaurant_id` + `role` to authorise admin operations.
6. **Service role usage** — the admin mutations and setup scripts rely on the service role key; store it securely (environment variables or secrets manager).

## Optional Enhancements
- Use Supabase OTP or external identity providers for staff accounts if email-only sign-in is insufficient.
- Integrate Webhooks (Supabase Auth hooks) to provision staff records automatically on new sign-ups.
- Layer on feature flags in `site_config.features.auth` if you plan to mix public and authenticated customer flows.

## Testing Checklist
- Visit `/auth/signin` and complete a Supabase-authenticated login; ensure redirect lands on `/admin` (or chosen destination).
- Hit an admin API route (e.g. `/api/admin/debug/health`) unauthenticated to verify it returns HTTP 401.
- Check Supabase logs to confirm row-level security denies cross-tenant access.
