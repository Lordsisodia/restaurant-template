# Observability & Metrics

Tracking health in production (or staging) so we can detect issues early. Most of this is aspirational until instrumentation is wired up—treat TODOs as backlog items.

## Application metrics
- **Performance**: target LCP ≤ 2.5s, INP ≤ 200ms, CLS < 0.1 on key routes (`/`, `/menu`, `/reviews`). Use Vercel Analytics or Lighthouse CI to collect metrics per deployment.
- **Errors**: aggregate Next.js server/client errors (Sentry, Vercel error overlay, or Supabase log drains). TODO: integrate Sentry/Logflare and document dashboard links here.
- **Usage**: track page views, menu interactions, review submissions. TODO: add simple analytics events (Google Analytics or PostHog) and list dashboards.

## Supabase monitoring
- **Query performance**: watch for slow queries in Supabase Log Explorer. Flag indexes missing for menu/reviews queries.
- **Resource quotas**: monitor row limits, bandwidth, and storage (alerts via Supabase dashboards).
- **Error logs**: set up alerts for repeated failures in `review`/`menu` actions or RLS rejections.

## Cloudinary monitoring
- Storage/bandwidth usage (free tier 25 GB). Configure monthly alerts in Cloudinary console.
- Track transformation usage if variant heavy hero templates expand.

## Operational alerts (TODO)
- [ ] Configure uptime checks for public routes (`/`, `/menu`, `/reviews`, `/chat`).
- [ ] Alert on Vercel deployment failures.
- [ ] Alert on Supabase error spikes (HTTP 500s or log severity > warning).
- [ ] Alert on loyalty/member write failures.

## Logging standards
- Use structured `console` logging on server actions (JSON with `domain`, `action`, `restaurant_id`) to ease filtering in Supabase/Vercel logs.
- Ensure sensitive data is never logged (tokens, PII). Scrub before emitting.

## Incident response
- Combine with `docs/runbook.md` incident checklist. When an incident occurs, capture:
  - Time detected / by whom
  - Blast radius (tenants/routes affected)
  - Root cause
  - Fix applied and follow-up tasks
- File summary in `docs/project-history/` with timestamp for future reference.

## Future work
- Instrument API routes with timing & error metrics (StatsD, OpenTelemetry, etc.).
- Add synthetic checks or Playwright cron job hitting critical flows.
- Define SLOs (e.g., 99% of menu requests < 300ms) and monitor via dashboards.
