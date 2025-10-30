# Draco Deployment Guide

Draco is the shared Vercel + Supabase stack for restaurant tenants.

## Environments
- **Preview** — Vercel previews on branches, Supabase staging project
- **Production** — main branch deploys, Supabase production project

## Release Checklist
1. Confirm migrations are applied to staging and production.
2. Review change log with account manager; capture approvals.
3. Tag release (`vX.Y.Z`) and trigger Vercel deployment.
4. Run smoke tests (`docs/testing.md`).
5. Update `docs/project-history/` with release summary.

## Rollback
- Revert to previous Git tag and redeploy.
- Restore Supabase backup from hourly snapshots if schema changes broke data.

## Monitoring
- Configure Vercel analytics and Supabase logs forwarding to the shared dashboard.
