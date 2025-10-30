# Blog Domain Restructuring · Migration Summary

_Last updated: October 29, 2025_

## 🎯 Objective
Align the blog domain with the shared Section Architecture so that every surface (hero, filters, listing, post, sidebar) ships with a registry, schema, mocks, tests, and Storybook coverage—matching the landing, menu, and reviews domains.

## ✅ What Changed

- **New section scaffolds**: `hero-section/`, `categories-section/`, `listing-section/`, `post-section/`, and `sidebar-section/` were introduced with registries, schemas, mocks, stories, and Vitest smoke tests.
- **Legacy folders removed**: `blog-hero-templates/`, `blog-list-templates/`, `blog-post-templates/`, `blog-categories/`, and `blog-sidebar/` were retired.
- **Renderer API surface**: Domain consumers now import renderers instead of raw templates:
  ```tsx
  import { HeroRenderer } from '@/domains/customer-facing/blog/hero-section';
  import { ListingRenderer } from '@/domains/customer-facing/blog/listing-section';
  ```
- **Pages refactored**: `pages/BlogPage.tsx` and `pages/BlogPostPage.tsx` assemble the new sections, while the app routes (`src/app/(public)/blog`) map database payloads into the new schemas.
- **Server utilities relocated**: Supabase helpers moved from `server/` to `shared/server/blogRepository.ts` and are re-exported via `@/domains/customer-facing/blog/shared/server`.

## 📦 New Directory Snapshot

```
src/domains/customer-facing/blog/
├── hero-section/
├── categories-section/
├── listing-section/
├── post-section/
├── sidebar-section/
├── pages/
├── shared/
│   ├── components/
│   │   ├── ArticleCard.tsx
│   │   └── PostHeader.tsx
│   └── server/
│       └── blogRepository.ts
└── *.md (docs + migration notes)
```

## 🔗 Key Entry Points

| Area | Import From | Notes |
| --- | --- | --- |
| Hero renderer | `@/domains/customer-facing/blog/hero-section` | `HeroRenderer`, `heroRegistry`, mocks |
| Categories renderer | `@/domains/customer-facing/blog/categories-section` | Supports `onCategoryChange` callback |
| Listing renderer | `@/domains/customer-facing/blog/listing-section` | Handles featured carousel + category rows |
| Post renderer | `@/domains/customer-facing/blog/post-section` | Includes `PostHeader` shared component |
| Sidebar renderer | `@/domains/customer-facing/blog/sidebar-section` | Optional widgets stack |
| Supabase access | `@/domains/customer-facing/blog/shared/server` | `listPosts`, `getPostBySlug`, mutation helpers |

## 🧪 Quality Checklist

- [x] Section registries validated via Vitest smoke tests
- [x] Storybook stories render every variant with mocks
- [x] `BlogPage` filters data using `CategoriesRenderer`
- [x] `BlogPostPage` renders `PostRenderer` + keeps CTA footer
- [x] App routes updated to new server import path
- [x] Old template directories removed

## 🚀 Follow-up Ideas

1. **Sidebar widgets**: Design real widgets (recent posts, tag cloud) to replace placeholder variants.
2. **Additional listing variants**: Flesh out `template-2` / `template-3` with editorial layouts once design lands.
3. **Post enhancements**: Add related posts + share toolbar using `sidebar-section` or new sections.
4. **Tenancy overrides**: Store preferred section variants per tenant and pass into renderers.
5. **Analytics**: Hook listing/category interactions into shared tracking utilities.

## 📚 Reference Docs
- [README.md](./README.md) – quick reference and usage samples
- [ARCHITECTURE.md](./ARCHITECTURE.md) – deep-dive on sections and schemas
- [BUILD-SUMMARY.md](./BUILD-SUMMARY.md) – implementation notes per component
- [DATABASE-READY.md](./DATABASE-READY.md) – Supabase schema expectations
