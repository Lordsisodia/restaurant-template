# ADR-0001: Multi-Tenant Template

## Status
Accepted — 2024-10-15

## Context
We needed a scalable approach to ship restaurant marketing + light ordering experiences rapidly across clients.

## Decision
Implement a shared multi-tenant template with:
- Supabase used for per-tenant data isolation via `tenant_id`
- Next.js app with domain-driven folder structure
- Cloudinary for media storage scoped per tenant
- Feature toggles enabling optional modules (loyalty, blog, chat)

## Consequences
- Faster tenant launches using common infrastructure
- Requires strict RLS policies and audit logging to maintain isolation
- Demands thorough documentation to onboard new contributors (captured in `docs/`)
