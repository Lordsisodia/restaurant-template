# Blog Hero Section Architecture

Scaffolded manually to follow the shared section playbook (`docs/domains/section-architecture.md`).

- `index.tsx` – public API (renderer helpers and exports)
- `registry.ts` – variant metadata registry and component map
- `types/` – Zod schema + TypeScript types for the section
- `data/mock.ts` – Storybook/test payloads
- `shared/` – reusable atoms/hooks/utils for hero variants
- `templates/<variant>/` – per-variant implementations + metadata
- `stories/` – Storybook stories rendering every variant
- `tests/` – smoke coverage for the registry wiring

Variants shipped: `primary`, `template-2`, `template-3`.

See `docs/domains/section-architecture.md` for the full playbook.
