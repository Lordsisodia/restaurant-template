# Supabase Runtime Helpers

This folder contains the Supabase factories that ship with the Next.js app:

| File | Used In | Notes |
| --- | --- | --- |
| `client.ts` | Browser components and hooks | Creates a singleton browser client. If required env vars are missing, it returns a mock that throws helpful errors rather than crashing the bundle. |
| `server.ts` | Server Components, Route Handlers, Middleware | Wraps `@supabase/ssr` to bind the current request cookies. |
| `service-role-client.ts` | Tenant loaders, background jobs, admin flows | Uses service-role or pod-specific credentials based on `pods.json` metadata and disables session persistence. |

For schema changes, seeds, and Supabase CLI workflows use the root `/supabase` directory instead.
