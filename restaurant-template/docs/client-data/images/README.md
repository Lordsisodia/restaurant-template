# Images

This folder organizes all client-provided and development images.

## Folder Structure:

### `raw/`
**Purpose:** Original, unedited images provided by the client

**What to store:**
- High-resolution photos from client
- Original logo files
- Menu item photos (unprocessed)
- Interior/exterior photos
- Team photos
- Food photography

**Guidelines:**
- Never delete originals
- Keep organized by type (menu/, interior/, team/, etc.)
- Name files descriptively: `coffee-latte-original.jpg`

---

### `scraped/` ✓ (Contains scraped Google Maps images)
**Purpose:** Development-only images scraped from Google Maps or other sources

**What's here:**
- Google Maps photos
- Review images
- Location photos
- Temporary development assets

**Note:** This folder is gitignored and should not be deployed to production

---

### `processed/`
**Purpose:** Optimized, production-ready images

**What to store:**
- Compressed/optimized versions
- Resized for web (multiple sizes)
- Converted to modern formats (WebP, AVIF)
- Cropped/edited versions

**File Naming Convention:**
```
[item-name]-[size]-[format].[ext]

Examples:
- coffee-latte-large.webp
- coffee-latte-thumbnail.webp
- logo-dark-512x512.png
- hero-banner-1920x1080.jpg
```

**Recommended Sizes:**
- Thumbnails: 300x300px
- Cards: 600x400px
- Hero Images: 1920x1080px
- Full Size: 2400x1600px (max)

---

## Image Optimization Guidelines

### Compression
- JPEG: 80-85% quality
- PNG: Use TinyPNG or similar
- WebP: Modern browsers (preferred)

### File Size Targets
- Thumbnails: < 50KB
- Cards: < 150KB
- Hero: < 300KB
- Full size: < 500KB

### Tools
- [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
- [Squoosh](https://squoosh.app/) - Modern format conversion
- ImageMagick - Batch processing
- Next.js Image Component - Automatic optimization

---

## Workflow

1. **Client provides images** → Save to `raw/`
2. **Optimize for web** → Process and save to `processed/`
3. **Upload to storage** → Use Supabase storage or CDN
4. **Reference in code** → Import from `processed/` or use URLs

---

## Missing Images

If you need images but client hasn't provided them:
- [ ] Document what's needed
- [ ] Request from client
- [ ] Use placeholder images temporarily
- [ ] Track in project management
