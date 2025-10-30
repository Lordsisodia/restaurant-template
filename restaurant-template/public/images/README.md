# Public Image Library

This folder is the source of truth for every static asset that ships with the template. Everything lives under `/public/images`, and files are served verbatim by Next.js when referenced with a leading `/images/...` path.

## Top-Level Layout

```
public/images/
├── shared/            # Reusable assets that ship with the template
│   ├── backgrounds/   # Slider, drawer, and section backgrounds
│   ├── defaults/      # Placeholder hero/dish shots used as fallbacks
│   ├── gallery/       # Generic gallery images safe for any tenant
│   ├── icons/         # UI & social icons (SVG)
│   └── partners/      # Third-party/partner logos (e.g., GrabFood)
└── tenants/           # Real client assets, grouped by tenant slug
    └── draco/         # Current example tenant (Draco Coffee & Eatery)
        ├── brand/     # Brand collateral (`logo/` lives here)
        ├── hero/      # Homepage hero photography
        ├── menu/      # Food/drink/dessert imagery
        ├── gallery/   # Marketing gallery photos
        ├── interior/  # Indoor ambience shots
        ├── exterior/  # Storefront & signage
        ├── events/    # Event & promo graphics
        ├── reviews/   # Customer-submitted media
        ├── social/    # Social-media crops (stories, feed, covers)
        └── team/      # Owner and staff portraits
```

## Working With Assets
- **Use kebab-case file names** (`iced-latte.jpg`, `grab-food.svg`).
- **Keep originals elsewhere.** Commit only optimized web-ready assets.
- **Defaults live in `shared/`.** Reference them with `/images/shared/...` so every tenant gets the same fallback experience.
- **Tenant media lives under `tenants/<slug>/`.** Copy the Draco folder as a starting point whenever you onboard a new restaurant.

## Adding a New Tenant
1. Duplicate `public/images/tenants/draco` as `public/images/tenants/<new-slug>`.
2. Replace the contents category-by-category (hero, menu, reviews, etc.).
3. Update the new tenant’s README to document what’s populated and what’s still pending.
4. Point configuration (`pods.json`, seed data, components) at the new `/images/tenants/<slug>/...` paths.

Keeping shared assets and tenant-specific media in separate namespaces lets us ship a clean template, swap client branding quickly, and avoid cross-tenant collisions.
