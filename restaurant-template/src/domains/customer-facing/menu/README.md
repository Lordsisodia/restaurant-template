# Menu Domain · Section-Driven Architecture

The menu experience now follows the shared section scaffold so every UI slice ships with a registry, schema, mocks, Storybook story, and smoke test. Two sections are currently implemented (`menu-header`, `menu-categories`); the remaining templates will migrate next using `pnpm scaffold:section`.

## Directory Overview

```
src/domains/customer-facing/menu/
├── sections/
│   ├── menu-header/            # Header section (renderer + variants)
│   ├── menu-categories/        # Category browser section
│   ├── menu-category-selector/ # Sticky nav + filter control
│   ├── menu-item-card/         # Dish card used across sections
│   └── menu-item-detail/       # Full-screen detail drawer
├── shared/                     # Cross-section hooks, services, types, utils, legacy components
│   ├── data/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── utils/
├── pages/                      # Page composition (wires renderers together)
├── hooks.ts                    # Public re-export of shared hooks
├── types.ts                    # Public re-export of shared types/constants
├── utils.ts                    # Public re-export of shared utils
├── data.ts                     # Public re-export of shared data fixtures
├── server/                     # Re-export of shared services for server-only consumers
└── README.md
```

### Sections
- `sections/menu-header/` exposes `MenuHeaderRenderer`, `menuHeaderRegistry`, and typed content for the hero. The primary variant mirrors the previous glass hero UI and is fully driven by schema/mocks.
- `sections/menu-categories/` composes the category selector, item grid, item card, and detail dialog renderers. It owns loading/error/empty behaviour so the page only passes data + flags.
- `sections/menu-category-selector/` provides the sticky tabbed navigation + dropdown filter.
- `sections/menu-item-card/` wraps the hero-style dish card with price, dietary badges, and nutrition chips.
- `sections/menu-item-detail/` renders the full-screen detail dialog used when a guest selects a dish.

Every section folder contains:
- `types/schema.ts` – Zod schema + generated TypeScript types
- `data/mock.ts` – defineSectionMocks() payloads for Storybook/tests
- `templates/<variant>/` – UI implementation + metadata
- `registry.ts` – variant registry describing metadata and loaders
- `stories/` / `tests/` – smoke coverage that exercises the registry

### Shared Layer
The legacy `hooks/`, `types/`, `utils/`, `server/`, and `components/` directories were collapsed into `shared/`. Only cross-section code should live here:
- `shared/hooks` – React Query hooks and the service facade
- `shared/services` – Supabase repository + helpers
- `shared/types` – `MenuItem`, `MenuCategory`, fallbacks, query config
- `shared/utils` – helpers like `getMenuItemImage`, `enrichMenuItems`
- `shared/components` – error boundary + fallback wrappers still used by `MenuPageShell`

Public entrypoints (`hooks.ts`, `types.ts`, etc.) re-export from `shared/` so existing imports continue to work while we migrate consumers.

## Public API

```ts
import {
  MenuPage,
  MenuHeaderRenderer,
  MenuCategoriesRenderer,
  type MenuHeaderContent,
  type MenuCategoriesContent,
  useMenuItems,
  useMenuCategories,
} from '@/domains/customer-facing/menu';
```

- `MenuPage` – default composition that wires the header and categories renderers.
- `MenuHeaderRenderer` – render any header variant by passing `MenuHeaderContent`.
- `MenuCategoriesRenderer` – render the category browser; pass fetched data and state flags via `MenuCategoriesContent`.
- `useMenuItems` / `useMenuCategories` / `usePrefetchMenuData` – shared hooks backed by the Supabase service.

## Adding a New Section

```bash
pnpm scaffold:section menu <section-key> --component=<PascalCase> --variants=primary
```
1. Run the scaffold inside `restaurant-template/`.
2. Move existing UI, schema, mocks, and stories into the generated folder.
3. Update the registry + metadata.
4. Export the new renderer/types from `src/domains/customer-facing/menu/index.ts`.
5. Replace legacy imports in pages with the new renderer.

## Outstanding Follow-ups
- Migrate menu search, detail, and grid templates into dedicated sections (mirroring `menu-categories`).
- Delete `menu-search-templates/` once the section exists.
- Slim the `shared/components` folder after the remaining sections own their UI.
- Update docs under `docs/domains/menu/` as each section lands.

For historical notes, see `docs/domains/menu/archive/`.
