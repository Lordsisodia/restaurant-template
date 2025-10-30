# Tenant Image Namespaces

Each subfolder in here matches a restaurant slug (e.g. `draco`). Everything inside a tenant folder belongs exclusively to that client.

Recommended substructure (copy the Draco example when adding a new tenant):

```
public/images/tenants/<slug>/
├── brand/        # Logos, color palettes, typography shots
│   └── logo/     # SVG + PNG logo variants, favicons, app icons
├── hero/         # Homepage hero/banner photography
├── menu/
│   ├── food/
│   ├── drinks/
│   └── desserts/
├── gallery/      # Marketing gallery photos
├── interior/     # Dining room & ambiance shots
├── exterior/     # Storefront, signage, parking
├── events/       # Seasonal/event artwork
├── reviews/      # Customer photos that back testimonials
├── social/       # Crops for Instagram, Facebook, etc.
└── team/         # Owner and staff portraits
```

When onboarding a new restaurant:
1. Duplicate the folder, rename it to the tenant slug, and clear out Draco-specific media.
2. Populate categories as assets arrive; keep unreadied folders with a `.gitkeep` so the structure survives.
3. Document the tenant’s asset status in a `README.md` inside their folder (see `draco/README.md`).
