# Blog Domain · Quick Reference

> 📘 See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full section-by-section blueprint.

## 🚀 Overview

The customer-facing blog now follows the shared [Section Architecture Playbook](../../../../docs/domains/section-architecture.md). Every slice of the experience (hero, filters, feed, post view, sidebar) ships with a registry, schema, mocks, Storybook story, and smoke test.

## 📂 Primary Sections

| Section | Purpose | Entry Point |
| --- | --- | --- |
| Hero | Announces the blog landing hero | `@/domains/customer-facing/blog/hero-section` |
| Categories | Filter pills + topic navigation | `@/domains/customer-facing/blog/categories-section` |
| Listing | Featured carousel, category rows, and grid feed | `@/domains/customer-facing/blog/listing-section` |
| Post | Single-article reader experience | `@/domains/customer-facing/blog/post-section` |
| Sidebar | Optional supporting widgets for detail pages | `@/domains/customer-facing/blog/sidebar-section` |

### Usage Examples

```tsx
import { HeroRenderer } from '@/domains/customer-facing/blog/hero-section';
import { CategoriesRenderer } from '@/domains/customer-facing/blog/categories-section';
import { ListingRenderer } from '@/domains/customer-facing/blog/listing-section';

<HeroRenderer content={heroContent} variant="primary" />
<CategoriesRenderer content={categoriesContent} onCategoryChange={setCategory} />
<ListingRenderer content={listingContent} />
```

```tsx
import { PostRenderer } from '@/domains/customer-facing/blog/post-section';
import { SidebarRenderer } from '@/domains/customer-facing/blog/sidebar-section';

<PostRenderer content={postContent} />
<SidebarRenderer content={sidebarContent} />
```

## 🏗️ Directory Layout

```
blog/
├── hero-section/         # Renderer, registry, templates, tests, stories
├── categories-section/
├── listing-section/
├── post-section/
├── sidebar-section/
├── pages/                # Client/server pages that compose sections
├── shared/               # Cross-section utilities (components, server, etc.)
├── ARCHITECTURE.md       # In-depth docs
├── BUILD-SUMMARY.md      # Implementation notes
├── MIGRATION-SUMMARY.md  # Historical migration log
└── README.md             # (this file)
```

Each section folder follows the shared scaffold:

```
<section>/
├── README.md
├── index.tsx             # Public renderer + helpers
├── registry.ts           # createSectionRegistry wiring
├── types/                # Zod schema + TypeScript surface
├── data/mock.ts          # Storybook/test payloads
├── templates/<variant>/  # Variant implementations + metadata
├── stories/              # Storybook stories
└── tests/                # Vitest smoke coverage
```

## ✅ Benefits

- Consistent section scaffolds across domains
- Strong typing from request payloads through UI renderers
- Variant registries enable instant swapping and tenant-specific theming
- Storybook, mocks, and tests travel with each section by default

## 📎 Next Steps

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for schema + variant details.
2. Use `ListingRenderer` mocks in Storybook to demo feeds without real data.
3. When introducing a new layout, start with `pnpm scaffold:section blog <section>` or copy an existing section directory.

---

**Last Updated:** October 29, 2025  
**Architecture Pattern:** Shared Section Architecture
