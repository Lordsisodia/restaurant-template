# Blog Domain

Delivers the tenant blog experience: hero, category filters, listing grid, individual posts, and optional sidebar widgets. The domain follows the shared section scaffold so every surface has schemas, registries, templates, stories, and tests.

## Structure

```
src/domains/customer-facing/blog/
├── sections/
│   ├── hero-section/            # Hero renderer, registry, variants
│   ├── categories-section/      # Category pills + filtering callbacks
│   ├── listing-section/         # Featured carousel + post grid
│   ├── post-section/            # Single post layout + metadata
│   └── sidebar-section/         # Optional sidebar widgets stack
├── pages/
│   ├── BlogPage.tsx             # Blog list composition
│   └── BlogPostPage.tsx         # Single post composition
├── shared/
│   ├── components/              # Article cards, featured rows, shared headers
│   └── server/                  # Supabase repositories + mutations
├── docs/                        # Domain-specific implementation notes
└── index.ts                     # Public API exports (renderers, pages, types)
```

## Section Inventory

| Section | Variants | Notes |
| --- | --- | --- |
| `hero-section` | `primary`, `template-2`, `template-3` | Gradient hero with optional background and pill text. |
| `categories-section` | `primary` | Badge-based filters with active state callbacks. |
| `listing-section` | `primary` | Featured carousel, grouped rows, responsive post grid. |
| `post-section` | `primary` | Article layout using shared `PostHeader`. |
| `sidebar-section` | `primary` (placeholders for future) | Widget stack, ready for related posts/newsletter modules. |

## Usage

```tsx
import {
  HeroRenderer,
  CategoriesRenderer,
  ListingRenderer,
} from '@/domains/customer-facing/blog';

<HeroRenderer variant="primary" content={heroContent} />;
<CategoriesRenderer content={categoriesContent} onCategoryChange={setCategory} />;
<ListingRenderer variant="primary" content={listingContent} />;
```

Page components obtain data (Supabase or CMS) and map it into the section schemas before rendering.

## Related Docs

- `docs/domains/blog/README.md` – high-level objectives and backlog.
- `docs/domains/blog/*.md` – migration summary, setup guide, build notes.
- `docs/template-system/template-authoring-checklist.md` – section scaffolding workflow.
