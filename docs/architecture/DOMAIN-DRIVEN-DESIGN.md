# Domain-Driven Design Notes

## Domain Boundaries
- **Landing** — marketing entry point, static content with personalization hooks.
- **Menu** — product catalogue, pricing, and availability.
- **Reviews** — social proof, moderation workflows.
- **Loyalty** — member lifecycle and incentives.
- **Blog** — editorial content pipeline.
- **Chat** — guest conversations and support handoff.
- **Admin** — internal tooling and orchestration.
- **Shared** — cross-domain primitives and services.

## Layering
- UI templates consume typed domain services.
- Domain services call data access functions located in `src/domains/<name>/actions.ts`.
- Shared providers manage Supabase client, theming, and analytics contexts.

## Aggregates & Entities
- Tenants own aggregates; each domain entity references `tenant_id`.
- Keep write models in domain boundaries; avoid cross-domain mutations.

## Future Considerations
- Introduce bounded contexts for catering vs. dine-in experiences if scope expands.
- Evaluate event-driven integration for loyalty to sync with POS systems.
