# Blog Content Workflow

## Content Sources
- Chef interviews, seasonal menu highlights, community events.

## Authoring Process
1. Draft articles in MDX/HTML and capture metadata (`title`, `excerpt`, `category`, `imageUrl`, `readTime`).
2. Reviewer signs off; set `publishedAt` when ready to go live.
3. Insert into Supabase `post` table (via admin UI or `scripts/setup/import-blog.mjs` when available).

## Required Columns (`post` table)
- `title`
- `slug` (auto-generated from title if omitted)
- `excerpt` (1–2 sentences)
- `content` (serialized HTML/MDX string)
- `published_at` (nullable timestamp)
- `category` (optional)
- `image_url` (hero asset)
- `read_time` (minutes, int)

## Formatting Guidelines
- Use H2 sections for major beats; keep length between 600–900 words.
- Include CTA blocks (reservations, loyalty) using shared components when rendering MDX.
- Reference Cloudinary assets with alt text and ensure they exist in tenant folders.

## SEO Checklist
- Unique meta title + description per post.
- Internal links to `/menu`, `/loyalty`, or relevant domains.
- Update sitemap (`restaurant-template/src/app/sitemap.xml.ts`) after publishing new content.
