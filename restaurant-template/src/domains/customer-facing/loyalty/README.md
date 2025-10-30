# Loyalty Domain

The loyalty experience is now organised around modular sections composed by the page layer. Each section owns its schema, templates, mocks, tests, and Storybook stories. Shared services and utilities live under `shared/`.

## Directory Map

- `sections/hero/` – renders the Loyalty Hero (renderer + templates + tests + stories).
- `sections/membership-showcase/` – interactive membership card section.
- `sections/tier-highlights/` – tier comparison grid content.
- `sections/top-diners-leaderboard/` – leaderboard for high-performing members.
- `shared/` – cross-section services, hooks, data, and helper utilities.
- `pages/` – page-level orchestrators (e.g. `LoyaltyPage`, admin variants).

## Section Anatomy

Every section follows the shared scaffold:

- `index.tsx` – renderer entrypoint (exports `<Loyalty<Section>Renderer>` helpers).
- `types/` – Zod schema + TypeScript contracts.
- `templates/<variant>/` – variant implementations with metadata.
- `data/mock.ts` – Storybook/test fixtures matching the schema.
- `stories/` – Storybook stories wired to mocks.
- `tests/` – vitest coverage for registry wiring.
- `shared/` – atoms/hooks/utils scoped to the section.

## Shared Layer

- `shared/services/loyalty.repository.ts` – Supabase accessors for loyalty members.
- `shared/services/index.ts` – public export surface.

Add future shared hooks/components alongside services and re-export them via the appropriate `shared/*/index.ts`.

## Working Tips

1. Run `node scripts/tools/scaffold-section.mjs customer-facing/loyalty <section-key>` to add new sections.
2. Keep pages thin—derive data, parse with the section schema, and pass the typed content into renderers.
3. Prefer consuming shared services (`import { listMembers } from '@/domains/customer-facing/loyalty/shared/services'`) instead of duplicating Supabase queries.
4. Update Storybook mocks whenever schemas change to keep stories and tests green.
