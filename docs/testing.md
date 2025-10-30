# Testing Checklist

## Automated
- Run `pnpm lint` and `pnpm test` inside `restaurant-template/`.
- Execute Playwright smoke suite (coming soon) for landing/menu/blog flows if available.

## Manual Smoke
- **Home (`/`)** — hero renders tenant branding; specials carousel loads without errors; reviews section shows published items or fallback samples.
- **Menu (`/menu`)** — category segments render, items load from Supabase, skeleton fallback clears, item detail modal opens.
- **Reviews (`/reviews`)** — cards display rating/comment; filters operate; admin publish/unpublish reflects on reload.
- **Loyalty (`/loyalty`)** — leaderboard populates with Supabase data; CTAs route correctly.
- **Blog (`/blog`)** — list shows latest posts; detail view renders serialized content and handles missing slug gracefully.
- **Chat (`/chat`)** — hero CTAs link to WhatsApp/contact; quick replies render macros from Supabase.
- **Admin (`/admin/*`)** — menu and reviews pages allow create/update/delete when authenticated via Supabase session.

## Performance
- Lighthouse mobile score ≥ 90 on home and menu routes (use Chrome DevTools/Pagespeed).
- Supabase query inspector: menu + reviews queries respond <150 ms on cached data.

## Regression Tracking
- Log issues in release notes (`docs/project-history/`) with date, route, and fix owner.
- Capture Supabase row IDs for data-related bugs to reproduce quickly.
