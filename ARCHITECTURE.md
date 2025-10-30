# Blog Domain · Architecture Documentation

## 🧱 Section Inventory

| Section | Folder | Default Variant | Content Schema Highlights |
| --- | --- | --- | --- |
| Hero | `hero-section/` | `primary` | `title`, `subtitle`, `backgroundImageUrl`, optional `pillText` |
| Categories | `categories-section/` | `primary` | `categories[] { key, label, count }`, `activeCategoryKey` |
| Listing | `listing-section/` | `primary` | `posts[]`, optional `featuredPosts[]`, `categoryGroups[]` |
| Post | `post-section/` | `primary` | `post` record (`content`, `imageUrl`, `readTimeMinutes`, etc.) |
| Sidebar | `sidebar-section/` | `primary` | `widgets[] { title, body, items[] }` |

Each section follows the shared [Section Architecture Playbook](../../../../docs/domains/section-architecture.md): renderer + registry + schema + mocks + stories + tests.

## 📁 Directory Layout

```
src/domains/customer-facing/blog/
├── hero-section/
├── categories-section/
├── listing-section/
├── post-section/
├── sidebar-section/
├── pages/
│   ├── BlogPage.tsx
│   ├── BlogPostPage.tsx
│   └── AdminBlogPage.tsx
├── shared/
│   ├── components/
│   │   └── (ArticleCard, PostHeader, etc.)
│   ├── server/
│   │   └── blogRepository.ts
│   └── utils/…
└── *.md (reference docs)
```

## 🧩 Section Details

### Hero Section (`hero-section/`)
- **Renderer**: `HeroRenderer`
- **Variants**: `primary`, `template-2`, `template-3`
- **Schema**: `title`, `subtitle`, optional `backgroundImageUrl`, `pillText`
- **Shared assets**: none yet (uses domain-wide `SectionHeading`)
- **Usage**: `HeroRenderer({ content: heroContent })`

### Categories Section (`categories-section/`)
- **Renderer**: `CategoriesRenderer`
- **Variants**: `primary`, `template-2`, `template-3`
- **Schema**: `categories` array of `{ key, label, count?, pillText? }`
- **Interactivity**: `onCategoryChange` callback passed via renderer props
- **Shared assets**: reserved folders for future pill primitives

### Listing Section (`listing-section/`)
- **Renderer**: `ListingRenderer`
- **Variants**: `primary`, `template-2`, `template-3`
- **Schema**:
  - `posts[]`: canonical feed (required)
  - `featuredPosts[]`: optional carousel source
  - `categoryGroups[]`: optional grouped rows (name + posts)
  - `emptyStateTitle`, `emptyStateMessage`
- **Shared components**: `ArticleCard`, `HorizontalScroller`, `FeaturedRow`, `CategoryRow`
- **Templates**:
  - `primary`: featured carousel + category strips + grid
  - `template-2/3`: editorial placeholders for future designs

### Post Section (`post-section/`)
- **Renderer**: `PostRenderer`
- **Schema**: single `PostContent` record (`content`, `imageUrl`, `readTimeMinutes`, `backLinkHref`, etc.)
- **Shared components**: `PostHeader`
- **Variants**: `primary` (production), `template-2/3` placeholders

### Sidebar Section (`sidebar-section/`)
- **Renderer**: `SidebarRenderer`
- **Schema**: `widgets[]` with optional `items[] { label, href, description }`
- **Variants**: `primary` (glassmorphism), `template-2/3` experimental placeholders

## 🧮 Page Composition

`pages/BlogPage.tsx` wires the sections:
1. Builds `heroContent` from tenant metadata
2. Computes category options (`CategoriesContent`)
3. Normalises posts into `ListingContent`
4. Renders
   ```tsx
   <HeroRenderer content={heroContent} />
   <CategoriesRenderer content={categoriesContent} onCategoryChange={setActiveCategory} />
   <ListingRenderer content={listingContent} />
   ```

`pages/BlogPostPage.tsx` renders the article experience:
```tsx
const postContent: PostContent = {/* mapped from database */};
<PostRenderer content={postContent} />
```
Future enhancements can co-locate a `SidebarRenderer` to show widgets next to the article.

## 🗄️ Data + Server

Functions that talk to Supabase live in `shared/server/blogRepository.ts` and are re-exported from `shared/server/index.ts`:
```ts
import { listPosts, getPostBySlug } from '@/domains/customer-facing/blog/shared/server';
```
They are consumed by:
- `src/app/(public)/blog/page.tsx`
- `src/app/(public)/blog/[slug]/page.tsx`
- `pages/AdminBlogPage.tsx`

## 🔄 Migration Notes

- Legacy `blog-*-templates/` directories have been removed. The `listing-section`, `hero-section`, etc. now own their registries, schemas, and mocks.
- Shared UI atoms were moved to `listing-section/shared/components` and `post-section/shared/components`.
- Docs, stories, and tests now live alongside each section, mirroring the landing domain pattern.

## ✅ Checklist

- [x] Section registries registered via `createSectionRegistry`
- [x] Zod schemas exported through `types/schema.ts`
- [x] Mocks available in `data/mock.ts` for Storybook + tests
- [x] Vitest smoke tests covering each registry variant
- [x] Storybook stories rendering every variant
- [x] Server utilities centralised in `shared/server`
