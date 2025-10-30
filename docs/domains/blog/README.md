# Blog Domain

**Status:** Production — list and detail pages render Supabase-backed posts.

## Purpose
Power SEO-friendly storytelling via SSR blog index/detail pages and admin authoring tools integrated with Supabase Markdown/MDX content.

## Current Coverage
- Public `/blog` listing with image-forward cards, category tags, and read-time display.
- Dynamic `/blog/[slug]` route loading post content from Supabase, with fallback messaging when drafts aren’t published.
- Admin page for creating/updating posts (`post` table) including publish scheduling and hero imagery.
- Server repository providing typed helpers (`listPosts`, `getPostBySlug`, `createPost`, `updatePost`).

## Data Dependencies
- Supabase tables: `post`, `tag`, `post_tag` (see `docs/data-schema/blog.md`).
- Posts store HTML/MDX strings; consider storing structured blocks in `page_block` for advanced layouts.

## Near-Term Tasks
- Add tag management UI and linking between posts and tags in admin.
- Generate RSS feed + sitemap updates when posts publish.
- Integrate Cloudinary image picker for hero and inline images.

## References
- Code: `restaurant-template/src/domains/blog/`
- Data reference: `docs/data-schema/blog.md`
- Content workflow: `docs/client-data/blog.md`
