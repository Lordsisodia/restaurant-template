# Media Setup

## Cloudinary Structure
- Root folder per tenant: `restaurant-tenants/<tenant-slug>/`
- Subfolders: `menu`, `landing`, `reviews`, `blog`, `loyalty` for targeted transformations.

## Upload Workflow
1. Standardize filenames with tenant prefix (e.g. `pizzico-menu-margherita.jpg`).
2. Use the bulk uploader for initial seeding; enable auto-tagging for alt text suggestions.
3. Store derived image URLs in Supabase tables using secure delivery URLs.

## Optimization Defaults
- Apply `f_auto,q_auto` plus width breakpoints `320,640,960,1280`.
- For background hero images, include `c_fill,g_auto` to maintain composition.

## Maintenance
- Archive seasonal assets into `archive/` subfolder after campaigns end.
- Schedule quarterly review of unused assets to control bandwidth.
