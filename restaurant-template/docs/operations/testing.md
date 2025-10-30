# Testing & QA Guide

Current testing posture + how to validate changes before deployment.

## Automated tests (current status)
- There is no formal unit/integration test suite checked in yet (TODO).
- Linting: `npm run lint` (ESLint) must pass—run locally or rely on CI.
- Type checking: `tsc --noEmit` (integrated via `npm run lint` with the new config).

## Manual regression checklist
1. **Marketing pages** (`/`, `/menu`, `/reviews`, `/loyalty`, `/blog`, `/chat`): verify content renders with tenant data.
2. **Admin routes** (`/admin/menu`, `/admin/reviews`, `/admin/blog`, `/admin/chat`): ensure auth gate holds and components load (no console errors).
3. **Mobile experience**: run through `docs/ux/mobile-qa-checklist.md` on a real device or simulator.
4. **Cloudinary assets**: confirm hero/menu/gallery images load and aren’t broken.
5. **Supabase actions**: tail logs (`supabase logs tail`) when testing mutations (e.g., seeding scripts, admin uploaders) to catch runtime errors.

## Recommended future work
- Add Playwright smoke tests covering primary customer flows (landing → menu → reviews) and login-protected admin screens.
- Create unit tests for domain actions (Supabase queries) using Supabase’s testing harness or mocked clients.
- Wire the test commands into CI (GitHub Actions) so merges require lint + tests.
- Document expected lighthouse budgets in CI or use Vercel analytics for automated performance checks.

## Recording results
- If manual QA finds regressions, log them under the relevant domain README backlog section.
- Major incidents/fixes should be archived in `docs/project-history/` with steps to reproduce and resolutions.
