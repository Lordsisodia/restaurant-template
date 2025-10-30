# App Folder Map

This Next.js `app/` directory is organised into route groups so it is easier to see what is live, what is planned, and what is developer tooling.

## Route Groups

| Group | Purpose | Key entries |
| --- | --- | --- |
| `(public)` | Customer-facing experience (production) | `/`, `/about`, `/menu`, `/reviews`, `/blog`, `/chat`, `/our-story`, `/membership` |
| `(archive)` | Pages we might ship later. Each route renders a "coming soon" placeholder and is tagged `robots: noindex`. Move a route back into `(public)` once it is ready. | `/contact`, `/gift-cards`, `/orders`, `/reservations`, `/specials` |
| `(admin)` | Back-office UI and utilities. Includes the admin dashboard, content tools, and the debug health check (`/admin/debug/health`). | `/admin/*` |
| `api` | App Router API routes. Production endpoints live alongside admin/debug utilities under `api/admin/debug/*`. | `/api/*` |
| `demo` | Component playgrounds for designers/devs. Pages 404 outside `NODE_ENV=development`. | `/demo/*` |

## Adding or Reviving Routes

1. **Ready for customers?** Place the route under `(public)` and wire it to the relevant domain module. Then run this quick checklist:
   - add/update the page `metadata` export (title + description),
   - surface the route in `TenantHeader` navigation if it should appear in menus,
   - confirm the sitemap picks it up (auto-generated from `(public)` routes).
2. **Future idea / parked work?** Start under `(archive)` using the shared `ComingSoon` component. Add real implementation later, then move the folder into `(public)`.
3. **Internal-only tooling?** Keep it inside `admin` (UI) or `api/admin/*` (API). Apply your own auth checks as we lock down the dashboard.

## Diagnostics & SEO Helpers

- **Debug health:** `/admin/debug/health` summarises env variables and links to JSON probes at `/api/admin/debug/status` and `/api/admin/debug/landing-probe`.
- **Robots & sitemap:** `robots.txt` now references the sitemap, and `sitemap.xml/route.ts` emits the current core routes. Set `NEXT_PUBLIC_SITE_URL` for accurate absolute URLs.

## Future Cleanup Ideas

- Replace the placeholder archive pages with actual domain imports when each feature is greenlit.
- Once a dedicated membership slug is rolled out everywhere, remove the legacy `/loyalty` alias.
- If the demos are no longer needed, delete `src/app/demo` or move them into Storybook.
