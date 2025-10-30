# 🚀 Multi-Deployment Architecture (25 Vercel Projects)

## Your Setup

```
25 Clients = 25 Separate Vercel Deployments

Each Client:
├── Own GitHub repo
├── Own Vercel deployment (250 MB limit)
├── Own domain (client-a.com)
└── Shares Supabase database (multi-tenant)

Vercel Free Tier PER DEPLOYMENT:
├── Deployment size: 250 MB
├── Bandwidth: 100 GB/month
├── Build minutes: Shared across account
└── Can have multiple deployments ✅
```

## 📊 Per-Client Capacity Analysis

### What Fits in 250 MB?

```
Typical Deployment Breakdown:

Next.js Build Output:
├── JavaScript bundles: 20-30 MB
├── CSS files: 5-10 MB
├── HTML pages: 2-5 MB
├── node_modules (production): 10-15 MB
└── Code Subtotal: ~50 MB

Available for Images: 200 MB ✅

One Restaurant Needs (optimized):
├── Menu photos (50 items):
│   └── 50 × 200 KB = 10 MB
├── Gallery photos (30):
│   └── 30 × 200 KB = 6 MB
├── Review photos (10):
│   └── 10 × 100 KB = 1 MB
├── Hero/banners (5):
│   └── 5 × 600 KB = 3 MB
└── TOTAL: ~20 MB

RESULT: 20 MB << 200 MB ✅
PLENTY OF ROOM!
```

## 🎯 Hardcode vs Cloudinary Decision

### Option 1: Full Hardcode (RECOMMENDED for your setup!)

**Architecture:**
```
Each Client Repo:
public/
├── menu/
│   ├── appetizers/
│   │   ├── wings.webp (120 KB)
│   │   └── nachos.webp (150 KB)
│   ├── entrees/
│   │   ├── burger.webp (200 KB)
│   │   └── steak.webp (250 KB)
│   ├── desserts/
│   └── drinks/
│       SUBTOTAL: 10 MB
├── gallery/
│   ├── interior-1.webp (200 KB)
│   ├── food-1.webp (180 KB)
│   └── ... (30 total)
│       SUBTOTAL: 6 MB
├── reviews/
│   ├── customer-1.webp (80 KB)
│   └── ... (10 total)
│       SUBTOTAL: 1 MB
└── hero/
    └── main.webp (2 MB)
        SUBTOTAL: 3 MB

TOTAL: 20 MB per deployment ✅

Supabase (shared):
├── Menu metadata (name, price, description)
├── Image PATHS: "/menu/burger.webp" (local paths!)
├── Review text
└── Per client: ~150 KB
```

**Pros:**
- ✅ Zero external dependencies
- ✅ Blazing fast (Vercel CDN)
- ✅ Works offline in development
- ✅ Free forever
- ✅ Simple architecture
- ✅ Full version control
- ✅ Easy rollback

**Cons:**
- ❌ Image updates require redeploy (~2 min)
- ❌ Repo size grows over time
- ❌ Non-technical clients need git knowledge

**Cost: $0/month**

---

### Option 2: Cloudinary Hybrid

**Architecture:**
```
Each Client Repo:
├── Code only (no images)
└── 50 MB deployment

Cloudinary:
├── All images (20 MB per client)
└── 25 clients × 20 MB = 500 MB

Supabase:
├── Cloudinary URLs
└── Metadata
```

**Pros:**
- ✅ Tiny deployments (50 MB)
- ✅ No redeploy for image updates
- ✅ Image transformations
- ✅ Auto-optimization

**Cons:**
- ❌ External dependency
- ❌ Free tier limits (25 GB)
- ❌ Slight latency (extra network hop)

**Cost: $0/month (within free tier)**

---

### Option 3: Minimal Hardcode + Cloudinary

**Architecture:**
```
Hardcoded (per deployment):
├── Critical images only: 5 MB
│   ├── Hero image (2 MB)
│   ├── Featured menu items (3 MB)
│   └── Above-the-fold only
└── Fast initial load

Cloudinary:
├── Bulk menu items: 7 MB
├── Full gallery: 6 MB
├── Review photos: 1 MB
└── Below-the-fold content
```

**Pros:**
- ✅ Best of both worlds
- ✅ Fast initial load
- ✅ Easy bulk updates

**Cons:**
- ❌ More complex
- ❌ Split image management

---

## 📊 Detailed Comparison

| Metric | Full Hardcode | Cloudinary | Hybrid |
|--------|--------------|------------|---------|
| **Deployment Size** | 70 MB | 50 MB | 55 MB |
| **Vercel Bandwidth** | High | Low | Medium |
| **Image Updates** | Redeploy | Instant | Mixed |
| **External Deps** | None | Cloudinary | Cloudinary |
| **Offline Dev** | ✅ Yes | ❌ No | ⚠️ Partial |
| **Complexity** | Simple | Medium | Complex |
| **Performance** | Fastest | Fast | Fastest (critical) |
| **Cost** | $0 | $0 | $0 |

## 💰 Scaling Analysis

### Full Hardcode Limits

```
Per Deployment:
├── Vercel: 250 MB limit
├── Used: 70 MB (code + images)
├── Remaining: 180 MB buffer ✅

Per Client Monthly:
├── Bandwidth: 100 GB/month
├── Typical usage: 10-30 GB/month
├── Remaining: 70-90 GB buffer ✅

25 Deployments:
├── Total bandwidth: 2,500 GB/month available
├── Typical usage: 250-750 GB/month
└── Well under limits ✅

Supabase (shared):
├── Database: 500 MB
├── 25 clients × 150 KB = 3.75 MB
├── Usage: 0.75% ✅

GitHub:
├── Per repo: 20 MB (images)
├── Limit: 1 GB recommended
├── Usage: 2% ✅

VERDICT: Can easily handle 100+ clients!
```

### With Cloudinary

```
Vercel:
├── 50 MB per deployment
├── Much smaller builds
├── Lower bandwidth usage

Cloudinary:
├── Free tier: 25 GB storage
├── 25 clients: 500 MB
├── Can handle 1,000+ clients

Supabase:
├── Same as hardcode

VERDICT: Can handle 1,000+ clients!
```

## ✅ My Recommendation: Full Hardcode

**For Your Architecture (25 Deployments + Shared Supabase):**

### Why Hardcode Everything?

1. **You Have the Space**
   - 250 MB per deployment
   - Only need 20-30 MB per client
   - 10× under limit!

2. **Simpler Architecture**
   - No Cloudinary dependency
   - No upload workflows
   - Just git push → auto-deploy

3. **Better Performance**
   - Vercel CDN is extremely fast
   - No extra DNS lookup to Cloudinary
   - Images are co-located with code

4. **Version Control**
   - Images tracked in git
   - Easy rollback
   - Full history

5. **Free Forever**
   - Vercel free tier is generous
   - No external service limits

### Implementation

```
Template Repo:
├── Fork per client
└── Each client customizes

Client Repo Structure:
restaurant-template/
├── public/
│   ├── menu/
│   │   └── *.webp (optimized images)
│   ├── gallery/
│   │   └── *.webp
│   └── reviews/
│       └── *.webp
├── src/
│   └── data/
│       ├── menu.json (metadata)
│       └── restaurant.json (info)
├── scripts/
│   └── optimize-images.js (run before commit)
└── .env
    └── SUPABASE_* (shared database)

Size: 20-30 MB per repo ✅
```

### Database Schema

```sql
-- Shared Supabase (multi-tenant)

CREATE TABLE clients (
  id UUID PRIMARY KEY,
  name TEXT,
  slug TEXT UNIQUE,
  vercel_url TEXT -- e.g., "client-a.vercel.app"
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  name TEXT,
  description TEXT,
  price DECIMAL,
  category TEXT,
  image_path TEXT, -- "/menu/burger.webp" (local path!)
  display_order INT
);

-- Note: image_path is LOCAL path, not Cloudinary!
-- Images are served from same Vercel deployment
```

### Update Flow

```
Client wants to update menu image:

1. Replace public/menu/burger.webp
2. Run: node scripts/optimize-images.js
3. git commit -m "Update burger photo"
4. git push
5. Vercel auto-deploys (~2 min)
6. New image live ✅

Optional: Update Supabase metadata
- Name, price changes via Supabase dashboard
- No redeploy needed for text changes
```

## 🎨 Optimization Guide

### Image Optimization Script

```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const dirs = ['menu', 'gallery', 'reviews', 'hero'];

  for (const dir of dirs) {
    const dirPath = path.join('public', dir);
    const files = fs.readdirSync(dirPath, { recursive: true });

    for (const file of files) {
      if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

      const inputPath = path.join(dirPath, file);
      const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

      // Optimize to WebP
      await sharp(inputPath)
        .webp({ quality: 85 })
        .resize(1200, null, { withoutEnlargement: true })
        .toFile(outputPath);

      console.log(`✅ ${file} → WebP (${getSize(outputPath)})`);

      // Remove original
      fs.unlinkSync(inputPath);
    }
  }
}

optimizeImages();
```

**Results:**
- Original: 50 × 500 KB = 25 MB
- Optimized: 50 × 200 KB = 10 MB
- **Savings: 60%**

## 📈 Capacity Limits

### Maximum Clients (Full Hardcode)

```
Constraint Analysis:

Vercel Deployment Size:
├── Limit: 250 MB per deployment
├── Used: 70 MB
└── ✅ NOT A BOTTLENECK

Vercel Bandwidth:
├── Limit: 100 GB/month per deployment
├── Expected: 20 GB/month per restaurant
└── ⚠️ POSSIBLE BOTTLENECK at high traffic

Supabase Database:
├── Limit: 500 MB
├── Per client: 150 KB
├── Max: 3,000 clients
└── ✅ NOT A BOTTLENECK

Supabase Bandwidth:
├── Limit: 5 GB/month (shared)
├── Text-only queries
├── ~200 MB/month for 25 clients
└── ⚠️ BOTTLENECK at 60+ clients

GitHub Repo Size:
├── Limit: 1 GB (recommended)
├── Used: 30 MB per repo
└── ✅ NOT A BOTTLENECK

REALISTIC MAX:
├── With current setup: 50-60 clients
├── Bottleneck: Supabase bandwidth
├── Solution: Upgrade Supabase ($25/month) for 200+ clients
```

## 🎯 Final Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│ 25 Clients = 25 Separate Stacks                │
└─────────────────────────────────────────────────┘

Client A:
├── GitHub Repo A (30 MB)
│   └── All images hardcoded
├── Vercel Deployment A (70 MB deployed)
│   ├── Domain: client-a.com
│   └── Images served via Vercel CDN
└── Supabase (shared)
    └── Metadata + local paths

Client B:
├── GitHub Repo B (30 MB)
├── Vercel Deployment B (70 MB)
├── Domain: client-b.com
└── Supabase (shared)

... (23 more clients)

Cost per client: $0
Total cost: $0/month for 25 clients 🎉
```

---

## ✅ Final Answer

**Question:** "How much storage for images with 250 MB limit?"

**Answer:**
```
With separate deployments:
├── Each gets 250 MB
├── Code uses: ~50 MB
├── Available for images: ~200 MB
└── You only need: ~20 MB

PLENTY OF ROOM! ✅

Recommendation: HARDCODE EVERYTHING
└── No Cloudinary needed
```

**Your setup is PERFECT for hardcoding all images! 🚀**
