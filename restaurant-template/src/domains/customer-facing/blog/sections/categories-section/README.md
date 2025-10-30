# Blog Categories Section Architecture

Follows the shared section playbook (`docs/domains/section-architecture.md`). Exposes filter controls for blog categories while remaining renderer-driven.

- `index.tsx` – renderer helpers and exports
- `registry.ts` – variant metadata and lazy loaders
- `types/` – schema + props shared by all variants
- `data/mock.ts` – Storybook/test payloads
- `shared/` – reusable primitives for future variants
- `templates/<variant>/` – variant implementations
- `stories/` – Storybook coverage
- `tests/` – registry sanity checks

Variants included: `primary`, `template-2`, `template-3`.
