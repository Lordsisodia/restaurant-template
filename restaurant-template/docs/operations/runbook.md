# Runbook – Operating the Restaurant Template

Day-to-day operations, deployment, and recovery procedures. Keep this up to date as we add automation or monitoring.

For metrics/logging guidance, see `docs/observability.md`.

## Environments
- **Local / Preview:** Vercel preview deployments + Supabase dev project.
- **Production:** Vercel production deployment mapped to the tenant’s domain and Supabase prod project.

## Deployments
1. `npm run build` locally (or rely on Vercel CI) to catch build errors.
2. Deploy via Vercel (merge to `main` or manual promotion).
3. Post-deploy checks:
   - Hit `/`, `/menu`, `/reviews`, `/loyalty`, `/blog`, `/chat`, `/admin/menu`.
   - Run the mobile QA checklist (`docs/ux/mobile-qa-checklist.md`) on a real device or emulator.
   - Check Supabase logs for new errors (`supabase logs tail`).

## Rollback
- **Vercel:** `vercel rollback <deployment-id>` or restore previous production deployment in dashboard.
- **Supabase migrations:** `supabase db rollback` (or apply inverse migration). Keep migrations idempotent to reduce risk. Document rollbacks in `docs/project-history/`.

## Seeding / Tenant data refresh
1. Update structured content in `docs/client-data/` (menu, reviews, branding).
2. Run scripts under `supabase/scripts/` (or use `supabase db reset && supabase db push` for dev) to sync data.
3. For production updates, prefer targeted SQL via Supabase dashboard or `supabase db remote commit` with a migration.
4. Validate pages after seeding; images must exist in the Cloudinary folders referenced by the data.

## Cloudinary & asset quotas
- Free tier: 25 GB storage / month, 25 GB bandwidth.
- Monitor usage in the Cloudinary console. If nearing limits, archive old assets or upgrade the plan.
- Tenant asset checklist lives in `docs/client-data/images/README.md`.

## Supabase maintenance
- Enable daily backups (Supabase dashboard).
- Review RLS policies when adding new tables (`docs/data-schema/` lists ownership expectations).
- Track error logs via Supabase “Log Explorer” or ship them to an external sink.

## Monitoring & Alerts (to establish)
- Set up Vercel Analytics or a synthetic monitor for core pages (LCP, uptime).
- Add Supabase alerts for slow queries, error spikes, or exceeded quotas.
- Log all ordering/chat/loyalty mutations for audit (future work).

## Incident checklist
1. Assess scope – which tenants/routes are affected?
2. Roll back Vercel deploy if the issue was introduced by code.
3. For data issues, revert the latest migration or restore from Supabase backup.
4. Document the incident and resolution in `docs/project-history/` (timestamped file).

## Access / Credentials
- Supabase keys stored in `.env.local` (see `docs/template-system/setup/COMPLETE-SETUP-GUIDE.md`). Rotate keys if compromised.
- Google OAuth client is shared; update `.env` + Supabase provider settings together.
- Cloudinary API keys per tenant group; store in the team password vault.

## TODOs
- Automate smoke tests post-deploy (Cypress/Playwright) and link results here.
- Define alert thresholds for Supabase error rates and Cloudinary usage.
- Document access control for `/admin` routes once auth roles are finalised.
