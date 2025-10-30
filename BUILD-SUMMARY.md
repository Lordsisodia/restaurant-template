# Blog Domain · Build Summary

_Last updated: October 29, 2025_

## 🧱 Section Implementations

| Section | File | Highlights |
| --- | --- | --- |
| Hero (`hero-section`) | `templates/primary/HeroPrimary.tsx` | Full-bleed hero with gradient overlay, uses shared `SectionHeading`, optional background image + pill copy |
| Categories (`categories-section`) | `templates/primary/CategoriesPrimary.tsx` | Badge-based filter pills, active state styling, accepts `onCategoryChange` callback |
| Listing (`listing-section`) | `templates/primary/ListingPrimary.tsx` | Featured carousel + category rows + grid feed, reuses `ArticleCard`, `FeaturedRow`, `CategoryRow`, handles empty state copy |
| Post (`post-section`) | `templates/primary/PostPrimary.tsx` | Uses shared `PostHeader`, typography-rich article body, CTA footer retains existing links |
| Sidebar (`sidebar-section`) | `templates/primary/SidebarPrimary.tsx` | Widget stack driven by structured data, placeholder variants available for future designs |

### Shared Components
- `listing-section/shared/components/ArticleCard.tsx`
- `listing-section/shared/components/FeaturedRow.tsx`
- `listing-section/shared/components/CategoryRow.tsx`
- `post-section/shared/components/PostHeader.tsx`

### Stories & Tests
All sections ship with Storybook stories (`stories/*.stories.tsx`) and Vitest registry tests (`tests/*section.spec.ts`). Mocks live in `data/mock.ts` for each section.

## 📄 Page Composition

### `pages/BlogPage.tsx`
```tsx
<HeroRenderer content={heroContent} />
<CategoriesRenderer content={categoriesContent} onCategoryChange={setActiveCategory} />
<ListingRenderer content={listingContent} />
```
- Derives category chips and listing payloads from Supabase data.
- Filters posts client-side while keeping featured/category groups hydrated for the listing section.

### `pages/BlogPostPage.tsx`
```tsx
<PostRenderer content={postContent} />
```
- Maps database record to `PostContent` schema.
- Keeps existing CTA footer under the section renderer.

Admin workflow (`pages/AdminBlogPage.tsx`) continues to use `createPost`/`updatePost` from the relocated server module.

## 🗄️ Server + Data

- Supabase helpers now reside in `shared/server/blogRepository.ts`.
- Consumers import via `@/domains/customer-facing/blog/shared/server`.
- Exports: `listPosts`, `getPostBySlug`, `createPost`, `updatePost`, `deletePost`, plus the shared `BlogPost` interface.

## 🧪 Quality Checklist

- [x] Section registries registered with `createSectionRegistry`
- [x] Zod schemas defined per section to validate incoming content
- [x] Storybook stories render each variant from mocks
- [x] Vitest smoke tests ensure registry metadata stays in sync
- [x] App routes updated to new server import path
- [x] Legacy template folders removed

## 🎯 Next Enhancements

1. Flesh out listing/post template placeholders (`template-2`, `template-3`) once design assets land.
2. Build real sidebar widgets (recent posts, tag cloud) using the new schema.
3. Introduce tenancy-aware variant selection (store a preferred variant per tenant and pass to renderers).
4. Extend `listing-section` with optional pagination utilities if dataset grows.
5. Add analytics hooks to category interactions and featured carousel.
