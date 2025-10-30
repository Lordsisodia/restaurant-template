# Media Storage Setup (Cloudinary + Supabase + Unsplash)

**Goal:** Provide free-tier image and video storage for all tenants while keeping asset organization consistent.

## Stack Overview
- **Cloudinary** – primary image CDN (25 GB free tier) with transformations and responsive delivery.
- **Supabase Storage** – lightweight video hosting (1 GB free tier) for hero clips and promos.
- **Unsplash API** – seed/demo imagery for rapid prototyping.

## Configuration Checklist

### 1. Cloudinary (images)
1. Create a free account at [cloudinary.com](https://cloudinary.com/users/register_free).
2. Grab the credentials from the dashboard (**Cloud Name**, **API Key**, **API Secret**).
3. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<cloud-name>
   CLOUDINARY_API_KEY=<api-key>
   CLOUDINARY_API_SECRET=<api-secret>
   ```
4. Recommended folder hierarchy:
   ```
   restaurant/
   ├── menu/
   ├── hero/
   ├── gallery/
   ├── team/
   └── reviews/
   ```
5. Use the `CloudinaryImage` component presets (`menuItem`, `heroFull`, `gallerySquare`, etc.) to keep sizing consistent.

### 2. Supabase Storage (videos)
1. In the Supabase dashboard, open **Storage** → **New bucket**.
2. Name the bucket `restaurant-videos`, set it to **Public**, and keep the 50 MB max file size.
3. Encourage tenants to compress hero videos to 5–8 MB (720p, 10–15 seconds) using ffmpeg, Handbrake, or an online compressor.

### 3. Unsplash API (demo content)
1. Register an app at [unsplash.com/developers](https://unsplash.com/developers).
2. Store the Access Key in `.env.local`:
   ```bash
   UNSPLASH_ACCESS_KEY=<access-key>
   ```
3. Use it for seeding demo imagery (e.g., Indonesian food shots) during onboarding.

## Capacity Planning
- **Cloudinary:** ~18 MB per restaurant (hero + menu + gallery). 100 tenants ≈ 1.8 GB (well within 25 GB free tier).
- **Supabase:** 1 hero video per tenant at 7 MB ≈ 700 MB for 100 tenants (within 1 GB free tier). Compress aggressively.

## Optimisation Tips
- Lazy-load images and defer video loading (`loading="lazy"`, `preload="none"`).
- Leverage Vercel Image Optimization for additional caching and responsive breakpoints.
- Provide tenants with the compression cheatsheet so uploads stay within limits.

## Folder & Guide References
- Draco asset structure example: `/public/images/tenants/draco/` (see `docs/client-data/IMAGE-IMPORT-GUIDE.md`).
- Archived detailed walkthroughs live under `docs/project-history/template-system/setup/2025-10-21-media/`.
