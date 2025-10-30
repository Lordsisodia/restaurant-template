# Section Architecture Playbook

Use this guide when adding or refactoring any domain section (e.g. About Us hero, Menu header, Landing CTA). It explains the agreed folder scaffold, the shared tooling we just introduced, and the minimum documentation/tests every template needs. Bootstrap the structure with `pnpm scaffold:section <domain> <section>` and then adapt the generated files to match the actual data contract and UI.

## Folder Skeleton

```
<section>/
├── README.md                    # section overview + data contract + variant table
├── index.ts                     # public API (renderSection, types, hooks)
├── registry.ts                  # createSectionRegistry() usage + variant config
├── types/
│   ├── index.ts                 # SectionContent, SectionVariant, props
│   └── schema.ts                # createSectionSchema() with Zod
├── data/
│   ├── mock.ts                  # defineSectionMocks() per variant
│   └── fixtures/                # optional JSON fixtures for Storybook/tests
├── shared/
│   ├── components/              # atoms/molecules reused across variants
│   ├── hooks/                   # shared hooks (import '@/shared/section-tools')
│   └── utils/                   # shared helpers + adapters
├── templates/
│   ├── primary/
│   │   ├── README.md (or usage.md)
│   │   ├── index.ts             # exports template entry
│   │   └── <files>              # variant-only components/hooks/utils
│   ├── template-2/
│   └── template-3/
├── stories/
│   └── Section.stories.tsx      # Storybook story rendering every variant
└── tests/
    └── section.spec.tsx         # smoke render + registry coverage
```

## Shared Utilities

- `createSectionRegistry` and `assertVariantConfig` (from `@/shared/section-tools`) enforce that every variant ships with the required metadata and a loader. Always wrap the exported registry with `createSectionRegistry({ ... })`.
- `resolveVariant` provides a safe fallback whenever an unknown variant string is requested.
- `createSectionSchema` wraps a Zod schema and throws a typed error when incoming data is invalid.
- `defineSectionMocks` ensures the default variant has a sample payload – handy for Storybook and tests.
- `defineTemplateMetadata` offers a tiny helper for `templates/<variant>/metadata.ts` files so we never forget the description.

## Required Deliverables Per Section

1. **Registry** – `registry.ts` exports `createSectionRegistry({ defaultVariant, variants })` and is re-exported from `index.ts`.
2. **Schema** – `types/schema.ts` validates raw data; `types/index.ts` exports strongly typed props.
3. **Mocks** – `data/mock.ts` exposes `defineSectionMocks('Hero Section', { defaultVariant: 'primary', variants: { ... } })`.
4. **Template docs** – each template folder contains a short `README.md` or `usage.md` referencing `defineTemplateMetadata` output for automation.
5. **Stories/tests** – smoke render of every variant + snapshot/visual story for client previews.

## Workflow Checklist

1. Run the scaffold script (coming soon) or copy the skeleton above.
2. Create/update the Zod schema and mock payload before touching UI.
3. Build or migrate template components inside their folders; share UI pieces via `shared/`.
4. Register the template in `registry.ts` and expose through `index.ts`.
5. Update the section README with data contract and variant table.
6. Verify Storybook/tests succeed and run lint (`pnpm lint`).
7. Link back to this doc in the section README so future contributors read the playbook first.

When every domain section follows this pattern we can swap templates instantly, keep documentation consistent, and let future AIs extend the system without guesswork.
