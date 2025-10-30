# About Us Domain
# About Us Domain

Section-driven About page composed of reusable packages. Every section follows the common scaffold (types → data → registry → templates → stories → tests) and the domain root now exposes a `shared/` workspace for cross-section helpers.

```
about-us/
├── sections/
│   ├── hero-section/
│   ├── awards-section/
│   ├── cuisine-philosophy-section/
│   ├── story-section/
│   ├── team-section/
│   ├── values-section/
│   ├── venue-gallery-section/
│   ├── location-section/
│   ├── faq-section/
│   └── cta-section/
├── shared/               # components/data/hooks/services/types/utils shared across sections
├── pages/AboutPage.tsx   # domain composition layer
└── index.ts              # public API exports
```

## Section inventory

| Section | Variants | Notes |
|---------|----------|-------|
| sections/hero-section | primary · template-2 · template-3 | alternates pending design sign-off |
| sections/awards-section | primary · template-2 · template-3 | reviews + badges, social proof |
| sections/cuisine-philosophy-section | primary · template-2 · template-3 | scaffolded, awaiting art direction |
| sections/story-section | primary · template-2 · template-3 | timeline live; variants are placeholders |
| sections/team-section | primary · template-2 · template-3 | primary shipped, alternates TBD |
| sections/values-section | primary ✅ · template-2 ✅ · template-3 placeholder | new schema + shared icon map |
| sections/venue-gallery-section | primary ✅ · template-2 ✅ · template-3 placeholder | supports masonry + slider |
| sections/location-section | primary ✅ · template-2 ✅ · template-3 placeholder | shared contact + map utilities |
| sections/faq-section | primary ✅ · template-2 ✅ · template-3 placeholder | powered by chat accordion |
| sections/cta-section | primary ✅ · template-2 ✅ · template-3 placeholder | hero-aligned CTA variations |

## Conventions

- **Schemas**: Zod contracts live in `types/schema.ts`; keep TypeScript exports in `types/index.ts`.
- **Mocks**: `data/mock.ts` should stay in sync with Storybook stories and AboutPage sample data.
- **Variants**: Each template exports `metadata`, `load`, and a README describing when to use it. Placeholder variants must state that they are intentionally empty.
- **Shared helpers**: Promote utilities used by multiple sections into `about-us/shared/{components,data,hooks,services,types,utils}`. Keep section-specific helpers inside the section’s own `shared/` directory until reused elsewhere.
- **Scaffolding**: `node scripts/tools/scaffold-section.mjs about-us <section> --variants=primary,template-2,template-3` to add a new section package.

## AboutPage contract

`AboutPage` consumes renderer helpers instead of raw template components. Each section accepts an optional `...Variant` prop to select alternates while defaulting to the primary template.

```ts
export interface AboutPageData {
  hero: HeroContent;
  heroVariant?: HeroVariant;
  venueGallery: VenueGalleryContent;
  venueGalleryVariant?: VenueGalleryVariant;
  values: ValuesContent;
  valuesVariant?: ValuesVariant;
  location: LocationContent;
  locationVariant?: LocationVariant;
  faq: FaqContent;
  faqVariant?: FaqVariant;
  // cuisinePhilosophy, story, team, awards, cta follow same pattern
}
```

Use the exported render helpers (`HeroRenderer`, `ValuesRenderer`, etc.) for composition so future template changes do not leak implementation details into the page layer.
