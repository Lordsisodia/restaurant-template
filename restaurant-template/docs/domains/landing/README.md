# Landing Domain

**Status:** Live – multiple hero/review template variants in production with MVX backlog items pending.

## Purpose
Owns the public marketing home page experience: hero narratives, testimonials, essentials strip, and initial CTAs.

## Structure
```
src/domains/customer-facing/landing/
├── sections/
│   ├── hero-section/           # HeroRenderer + variants + schema
│   ├── review-section/         # ReviewRenderer + variant registry
│   ├── essentials-section/     # Contact chips (hours/map/WhatsApp)
│   ├── menu-section/           # Signature dishes + overview grid
│   ├── story-section/          # Narrative teaser / carousel
│   ├── map-section/            # Google Maps embed section
│   ├── cta-section/            # Sticky mobile CTA bar
│   ├── specials-section/       # Specials grid + specialty slider variants
│   ├── instagram-section/      # Instagram grid feed
│   └── gallery-section/        # Gallery mosaics
├── shared/                     # Shared components/data/hooks/types/utils
├── feedback/                   # Landing-specific analytics hooks
└── index.tsx                   # Server component orchestrating sections
```

## Data dependencies
- Tenant config (`site_config.features`) selects hero/review/menu/story variants + copy.
- Reviews domain flagged `featured = true` surface into landing testimonials.
- Contact/delivery info pulled from `restaurants` + `site_config.features.contact`.
- Menu highlights rely on `category`/`item` cache (`getMenu` server action).
- Specialty slider uses beverage categories from the same menu payload.

## Backlog / Next steps
- **QuickActionsBar** integration (P0 in MVX backlog) – expose via new section once design ships.
- **Gallery & specials migration** – move remaining legacy templates into section scaffold.
- **Hero variant library** – document/design additional v0.dev imports; update `sections/hero-section/README.md`.
- **Instrumentation** – add analytics for CTA impressions + map interactions post-migration.

## References
- UX intent: `docs/ux/restaurant-mobile-mvx.md`, `docs/ux/page-blueprints.md`.
- Historical refactor notes: `docs/project-history/domains/REFACTOR-ANALYSIS.md`, `REFACTOR-COMPLETE.md`.
- Data schema: `docs/data-schema/tenancy.md` (contact + branding) & `docs/data-schema/reviews.md` (featured testimonials).
