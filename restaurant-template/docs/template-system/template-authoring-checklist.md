# Template Authoring Checklist

Follow this whenever you add a new section template or variant. It complements the detailed scaffold explained in `docs/domains/section-architecture.md`.

## Before you start
- [ ] Confirm the domain + section name (`landing/hero`, `about-us/sections/story-section`, etc.).
- [ ] Decide the variant slug (`template-4`, `gradient-words`, etc.) and what tenant metadata will drive it.
- [ ] Identify data requirements (fields from Supabase, `site_config`, or tenant config).

## Scaffold & structure
1. **Create folders**
   - Run `pnpm scaffold:section <domain> <section>` (when available) or copy the skeleton from `docs/domains/section-architecture.md`.
   - Ensure the section contains `registry.ts`, `types/`, `data/`, `templates/<variant>/`, `stories/`, and `tests/`.
2. **Schema & types**
   - Update `types/schema.ts` with a Zod schema that validates the payload.
   - Export typed props from `types/index.ts`.
3. **Mock data**
   - Add representative payloads in `data/mock.ts` using `defineSectionMocks` (cover each variant if possible).

## Build the variant
4. **Implement UI**
   - Place variant-specific components under `templates/<variant>/`.
   - Share cross-variant pieces via `shared/components`, `shared/hooks`, etc.
5. **Metadata & registry**
   - Describe the variant in `templates/<variant>/README.md` or `metadata.ts`.
   - Update `registry.ts` to register the new variant (and set `defaultVariant` if needed).
   - Expose the registry via the section’s `index.ts`.

## Verification
6. **Storybook / preview**
   - Add or update `stories/Section.stories.tsx` to render all variants with mock data.
7. **Tests & linting**
   - Add a smoke test in `tests/section.spec.tsx` (render each variant, assert registry wiring).
   - Run `pnpm lint` (and Storybook/test commands if available).

## Documentation & cookbook
8. **Section README**
   - Update the section’s `README.md` with a data contract table and variant descriptions.
9. **Variant cookbook**
   - Add a brief entry to `docs/template-system/template-variants.md` (name, description, required data).
10. **Site config (if needed)**
    - If the variant relies on `site_config.features`, document the flag in `docs/template-system/site-config.md` and add a migration updating tenant data.

## Post-checks
- [ ] Run the Storybook build or visual review for product/PM sign-off.
- [ ] Verify the new variant works with domain entry pages locally.
- [ ] Update `docs/project-history/` if this replaces a legacy template.

Keeping this list close ensures every template ships with validated data, documentation, and easy discoverability for future tenants.
