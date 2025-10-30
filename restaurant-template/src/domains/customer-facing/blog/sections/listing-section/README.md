# Blog Listing Section Architecture

Follows the shared section architecture (`docs/domains/section-architecture.md`).

- `index.tsx` – renderer helpers and exports
- `registry.ts` – variant registry metadata + lazy loaders
- `types/` – schema + props shared by all variants
- `data/mock.ts` – sample posts for Storybook/tests
- `shared/` – reusable components/hooks/utils for the listing experience
- `templates/<variant>/` – concrete implementations with metadata
- `stories/` – Storybook coverage
- `tests/` – registry smoke tests

Variants available: `primary`, `template-2`, `template-3`.
