# Blog Sidebar Section Architecture

Implements the shared section scaffold (`docs/domains/section-architecture.md`) for sidebar widgets shown alongside blog content.

- `index.tsx` – renderer helpers and exports
- `registry.ts` – variant metadata + lazy loaders
- `types/` – schema and props shared by variants
- `data/mock.ts` – Storybook/test payloads
- `shared/` – reusable sidebar primitives
- `templates/<variant>/` – variant implementations
- `stories/` – Storybook coverage
- `tests/` – registry smoke coverage

Variants shipped: `primary`, `template-2`, `template-3`.
