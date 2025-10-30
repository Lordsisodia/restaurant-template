# 🎯 Shared Supabase + Shared Vercel Architecture

## Your Setup

```
Infrastructure:
├── 1 Supabase instance (all clients)
├── 1 Vercel deployment (all clients)
└── 25 GitHub repos (1 per client - but for what?)

Constraints:
├── Supabase Free: 500 MB database, 5 GB bandwidth
├── Vercel Free: 100 GB bandwidth/month
└── Question: What to hardcode vs database?
```

## 🎯 Critical Decision: Multi-Repo Strategy

### Option 1: Client Repos Are Just for Images/Assets

```
Main Platform Repo (yours):
├── Deployed to Vercel
├── Serves all clients
└── Reads from shared Supabase

Client Repos (per restaurant):
├── Just stores their images
├── Images uploaded to Cloudinary
└── URLs saved to Supabase

Workflow:
1. Client adds images to their repo
2. CI/CD uploads to Cloudinary
3. URLs saved to Supabase
4. Main app reads from Supabase
```

### Option 2: Each Client = Separate Vercel Deployment

```
Each Client Gets:
├── Own GitHub repo (forked from template)
├── Own Vercel deployment (free tier)
├── Shares Supabase database (multi-tenant)
└── All images hardcoded in their repo

25 clients = 25 Vercel free accounts ✅
```

**Which one is it?** Let me address both scenarios:

---

## 📊 Scenario A: Shared Vercel Deployment

**If all clients use ONE Vercel deployment:**

### Supabase Free Tier Breakdown (CRITICAL!)

```
Database Size: 500 MB

NEVER store images in database!
Only store:
├── Text (menu names, descriptions) ~2 KB per item
├── URLs (Cloudinary/GitHub URLs) ~200 bytes
├── Client metadata ~1 KB per client
└── Reviews text ~500 bytes per review

25 Clients Calculation:
├── Clients: 25 × 1 KB = 25 KB
├── Menu items: 1,250 × 2 KB = 2.5 MB
├── Gallery: 750 × 500 bytes = 375 KB
├── Reviews: 250 × 800 bytes = 200 KB
TOTAL: ~3 MB / 500 MB (0.6%) ✅

Bandwidth: 5 GB/month
├── Menu queries: ~100 MB/month
├── Gallery queries: ~50 MB/month
├── Reviews queries: ~20 MB/month
TOTAL: ~170 MB / 5 GB (3.4%) ✅

BOTTLENECK: Bandwidth, not database size
MAX CLIENTS: 60-100 before hitting bandwidth limit
```

### Vercel Free Tier

```
Bandwidth: 100 GB/month

Image Serving (if hardcoded in main repo):
├── 1,000 page loads/day × 2 MB images = 2 GB/day
├── 2 GB × 30 days = 60 GB/month
USAGE: 60 GB / 100 GB (60%) ⚠️

With Cloudinary (images external):
├── 1,000 page loads/day × 50 KB HTML = 50 MB/day
├── 50 MB × 30 days = 1.5 GB/month
USAGE: 1.5 GB / 100 GB (1.5%) ✅

VERDICT: Use Cloudinary for images!
```

### Optimal Strategy: Shared Deployment

```
✅ CLOUDINARY: All images (menu, gallery, reviews)
├── Free tier: 25 GB storage
├── Each client: ~40 MB
├── 25 clients: 1 GB / 25 GB (4%) ✅

✅ SUPABASE: Only metadata
├── Menu item names, prices, descriptions
├── Cloudinary URLs (not images!)
├── Review text (not photos!)
├── 3 MB / 500 MB (0.6%) ✅

✅ CLIENT GITHUB REPOS: Source images
├── Client adds images to their repo
├── GitHub Actions → uploads to Cloudinary
├── Cloudinary URL → saved to Supabase
├── Your app reads from Supabase

❌ HARDCODING: Only template assets
├── Logo, icons, backgrounds
├── Shared across all clients
├── ~5 MB in main platform repo
```

**Cost: $0/month for 25 clients ✅**

---

## 📊 Scenario B: Separate Vercel Deployments

**If each client has OWN Vercel deployment:**

### Each Client Deployment

```
Per Client:
├── GitHub repo: 20-25 MB (all images hardcoded)
├── Vercel deployment: 100 GB bandwidth
├── Supabase: Shared database (multi-tenant)

Cost per client: $0
```

### Hardcode Everything in Client Repos

```
Client Repo Structure:
public/
├── menu/
│   ├── burger.webp (120 KB)
│   └── ... (50 items = 6 MB)
├── gallery/
│   └── ... (30 photos = 3.6 MB)
└── reviews/
    └── ... (10 photos = 1 MB)

TOTAL: 10-15 MB ✅

Supabase Usage:
├── Menu metadata: name, price, description
├── Image paths: "/menu/burger.webp" (local!)
├── Review text only
├── ~150 KB per client
TOTAL: 25 × 150 KB = 3.75 MB ✅
```

**Cost: $0/month per client ✅**

---

## 🎯 Key Decision: What Goes Where?

### IF Shared Vercel Deployment:

| Data Type | Storage | Reason |
|-----------|---------|--------|
| **Menu photos** | Cloudinary | Too large for one repo serving 25 clients |
| **Gallery photos** | Cloudinary | Same |
| **Review photos** | Cloudinary or Hardcode templates | Depends on if shared or unique |
| **Menu metadata** | Supabase | Text is tiny, easy to query |
| **Review text** | Supabase | Text only |
| **Template assets** | Hardcode in main repo | Shared across all |

### IF Separate Vercel Deployments:

| Data Type | Storage | Reason |
|-----------|---------|--------|
| **Menu photos** | Hardcode in client repo | Each repo is isolated, 10 MB is fine |
| **Gallery photos** | Hardcode in client repo | Same |
| **Review photos** | Hardcode in client repo | Same |
| **Menu metadata** | Supabase | Easy updates without redeploy |
| **Review text** | Supabase | Same |
| **Template assets** | Hardcode in each repo | Or shared Supabase |

---

## 💰 Cost Analysis

### Scenario A: Shared Vercel (1 deployment)

```
Vercel Free Tier:
├── 100 GB bandwidth
├── Serving 25 clients
├── MUST use Cloudinary for images
└── Cost: $0

Cloudinary:
├── 25 GB free
├── 25 clients × 40 MB = 1 GB
└── Cost: $0

Supabase:
├── 500 MB database
├── 5 GB bandwidth
├── Used: 3 MB + 170 MB/month
└── Cost: $0

GitHub:
├── Main repo: 50 MB (code only)
├── 25 client repos: 5 MB each (raw images before upload)
└── Cost: $0

TOTAL: $0/month ✅
MAX CAPACITY: 60 clients before bandwidth issues
```

### Scenario B: Separate Vercel (25 deployments)

```
Per Client:
├── Vercel: 100 GB bandwidth (images served locally)
├── GitHub: 20 MB repo
├── Supabase: Shared, ~150 KB used
└── Cost: $0

25 Clients:
├── 25 Vercel accounts (free)
├── 25 GitHub repos (free)
├── 1 Supabase (free, 3.75 MB used)
└── Total: $0/month

TOTAL: $0/month ✅
MAX CAPACITY: 100+ clients easily
```

---

## ✅ Recommendations

### WHICH ARCHITECTURE ARE YOU USING?

**Option 1: Shared Vercel (1 deployment for all)**
```bash
# Choose this if:
✅ You manage one codebase
✅ Clients access via subdomains (client-a.yourdomain.com)
✅ Easier to maintain centrally

STRATEGY:
├── Cloudinary: ALL images
├── Supabase: Metadata + text
└── Main repo: Code only (~50 MB)
```

**Option 2: Separate Vercel (25 deployments)**
```bash
# Choose this if:
✅ Each client gets their own domain
✅ Each client can customize their site
✅ Full isolation per client

STRATEGY:
├── Hardcode: ALL images in client repos
├── Supabase: Optional, just for dynamic text
└── Each repo: ~20 MB
```

---

## 🎯 My Recommendation

Based on "each client has own GitHub" → **Option 2** (Separate Vercel)

### Architecture:

```
Template Repo (yours):
└── Fork/duplicate per client

Client-A Repo:
├── public/
│   ├── menu/ (6 MB)
│   ├── gallery/ (3.6 MB)
│   └── reviews/ (1 MB)
├── Deploy to: Vercel (client-a account)
├── Database: Shared Supabase (optional)
└── Domain: client-a.com

Client-B Repo:
├── Same structure
├── Own Vercel deployment
└── Own domain

Shared Supabase (optional):
├── Just for dynamic text
├── Menu names, prices (not images!)
├── Review text (not photos!)
└── Total: 3-5 MB for 25 clients
```

### What to Hardcode vs Database:

```
✅ HARDCODE (in each client repo):
├── Menu item photos
├── Gallery photos
├── Review photos
├── All images (~10-15 MB per client)
└── GitHub limit: 1 GB (you use 15 MB) ✅

✅ DATABASE (shared Supabase):
├── Menu item metadata (name, price, description)
├── Review text and ratings
├── Analytics/tracking
├── Contact form submissions
└── ONLY TEXT - Image paths like "/menu/burger.webp"

❌ NEVER DATABASE:
├── Actual image files
├── Large binary data
└── Anything over 1 MB per row
```

### Limits:

```
GitHub:
├── Per repo: 1 GB limit
├── You use: 15-20 MB ✅
├── 50× under limit!

Vercel (per client):
├── 100 GB bandwidth/month
├── Images served via Vercel CDN
├── Plenty for one restaurant

Supabase (shared):
├── Database: 500 MB
├── 25 clients: 3-5 MB ✅
├── Can handle 100+ clients!

TOTAL COST: $0/month for 25 clients 🎉
```

---

## 🚀 Client Onboarding Flow

**For each new restaurant:**

1. **Fork template to client repo**
   ```bash
   gh repo create client-restaurant --template your-template
   ```

2. **Add client images**
   ```bash
   # Optimize first
   node scripts/optimize-images.js client-photos/

   # Copy to public
   cp -r client-photos/menu/* public/menu/
   cp -r client-photos/gallery/* public/gallery/
   ```

3. **Update Supabase (optional)**
   ```sql
   INSERT INTO clients (name, slug)
   VALUES ('Restaurant Name', 'restaurant-slug');

   -- Menu items with LOCAL image paths
   INSERT INTO menu_items (client_id, name, price, image_path)
   VALUES (uuid, 'Burger', 12.99, '/menu/burger.webp');
   ```

4. **Deploy to Vercel**
   ```bash
   # Connect repo in Vercel dashboard
   # OR use their Vercel account
   vercel --prod
   ```

5. **Connect domain**
   ```
   restaurant-name.com → Vercel
   ```

**Time: 20-30 minutes per client**

---

## 📊 Final Answer: Hardcode vs Database

### For 25 Clients with Separate Repos + Shared Supabase:

**HARDCODE (in each client's GitHub repo):**
- ✅ ALL images (menu, gallery, reviews)
- ✅ Size: 10-20 MB per repo
- ✅ Served via Vercel CDN (fast!)
- ✅ No Cloudinary needed

**DATABASE (shared Supabase):**
- ✅ Menu item text (name, description, price)
- ✅ Image paths: "/menu/burger.webp" (not URLs!)
- ✅ Review text and ratings
- ✅ Client metadata
- ✅ Total: ~3-5 MB for 25 clients

**GitHub Size: 15-20 MB per client ✅**
**Supabase Size: 3-5 MB total ✅**
**Cost: $0/month ✅**

**You can scale to 100+ clients with this architecture! 🚀**
