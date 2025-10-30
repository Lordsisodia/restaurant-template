# Blog Post Section Architecture

Implements the shared section scaffold (`docs/domains/section-architecture.md`) for single blog post layouts.

- `index.tsx` – renderer helpers and exports
- `registry.ts` – variant metadata + lazy loaders
- `types/` – schema + props
- `data/mock.ts` – sample post payloads
- `shared/` – reusable pieces across variants (header, meta blocks, etc.)
- `templates/<variant>/` – variant implementations
- `stories/` – Storybook coverage
- `tests/` – registry smoke tests

Variants enabled: `primary`, `template-2`, `template-3`.
