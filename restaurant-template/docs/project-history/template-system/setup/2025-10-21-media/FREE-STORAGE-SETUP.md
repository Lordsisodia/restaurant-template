# 💰 100% FREE Storage Setup for 100 Restaurants

**Strategy:** Hybrid storage using free tiers only
**Cost:** $0/month forever

---

## 📦 **The FREE Stack:**

### **1. Cloudinary (FREE 25 GB) - For Images**
```
✅ Menu item photos
✅ Gallery images
✅ Hero images
✅ Brand logos
✅ Auto WebP optimization
✅ Global CDN
✅ Responsive images

Free Tier:
- Storage: 25 GB
- Bandwidth: 25 GB/month
- Transformations: 25 credits/month
- API calls: Unlimited
```

### **2. Supabase Storage (FREE 1 GB) - For Videos**
```
✅ Hero videos (compressed)
✅ Promo videos
✅ Event highlight videos

Free Tier:
- Storage: 1 GB
- Bandwidth: 2 GB/month
- Max file size: 50 MB
```

### **3. Unsplash API (FREE) - For Stock Photos**
```
✅ Seed database with beautiful food photos
✅ 50 requests/hour
✅ High-res images
✅ Commercial use allowed

Use for initial demo content!
```

---

## 📊 **Capacity for 100 Restaurants:**

### **Images (Cloudinary):**
```
Per Restaurant:
- 3 hero images × 500 KB = 1.5 MB
- 50 menu items × 200 KB = 10 MB
- 20 gallery photos × 300 KB = 6 MB
- Logos/branding × 5 × 100 KB = 0.5 MB
Total: 18 MB per restaurant

100 restaurants × 18 MB = 1.8 GB
Cloudinary Free: 25 GB
Usage: 7.2% ✅ PLENTY of room!
```

### **Videos (Supabase Storage):**
```
Per Restaurant:
- 1 hero video (15 sec, 720p, compressed) = 7 MB

100 restaurants × 7 MB = 700 MB
Supabase Free: 1 GB
Usage: 70% ✅ Fits!

Tips to stay under limit:
- Keep videos 10-15 seconds
- Use 720p (not 4K)
- Compress with ffmpeg or handbrake
- Target 5-8 MB per video
```

---

## 🔧 **Setup Steps:**

### **Cloudinary (5 mins):**
1. Sign up: https://cloudinary.com/users/register_free
2. Get credentials from dashboard:
   - Cloud name
   - API key
   - API secret
3. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### **Unsplash (3 mins):**
1. Sign up: https://unsplash.com/developers
2. Create app
3. Get access key
4. Add to `.env.local`:
   ```bash
   UNSPLASH_ACCESS_KEY=your-access-key
   ```

### **Supabase Storage (2 mins):**
1. Go to Supabase Dashboard → Storage
2. Click "Create bucket"
3. Name: `restaurant-videos`
4. Public: Yes (for public viewing)
5. File size limit: 50 MB
6. Done!

---

## 📈 **Bandwidth Considerations:**

### **Monthly Bandwidth (100 Restaurants):**

**Scenario: 1000 visitors/month per restaurant**
```
Visitors: 100,000/month total

Per visitor:
- 1 hero image: 500 KB
- 3 menu images: 600 KB
- 1 video view: 7 MB
Total: 8.1 MB per visitor

Total bandwidth:
- Images: 100k × 1.1 MB = 110 GB/month
- Videos: 100k × 7 MB = 700 GB/month (if all watch)

Cloudinary Free: 25 GB/month ❌ Not enough!
Supabase Free: 2 GB/month ❌ Not enough!
```

**PROBLEM:** Bandwidth will exceed free tier quickly! 😱

---

## 💡 **Solution: Optimize for Bandwidth**

### **Strategy 1: Lazy Load + Only Load What's Needed**

```typescript
// Only load video when user scrolls to it
<video loading="lazy" preload="none">

// Only load full-res when clicked
<img loading="lazy" src="thumbnail.jpg" />
```

**Reduces bandwidth by 60-80%!**

### **Strategy 2: Use Vercel Image Optimization**

```typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  width={1920}
  height={1080}
  quality={75}  // Reduce from 100
/>
```

Vercel free tier: **100 GB/month** ✅

### **Strategy 3: Cloudflare R2 for FREE Bandwidth**

**This is actually the best FREE solution:**

```
Cloudflare R2:
- Storage: $0.015/GB = $0.06/month for 4 GB
- Bandwidth: $0 (FREE egress!)
- Video support: Unlimited file size
- CDN: Cloudflare global network

100,000 visitors × 8 MB = 800 GB bandwidth
Cost: $0 ✅ (egress is FREE!)
```

---

## 🎯 **UPDATED Recommendation for FREE:**

### **Use Cloudflare R2** (Basically Free: $0.06/month)

**Why R2 beats everything for FREE:**

| Feature | Cloudinary Free | Supabase Free | **Cloudflare R2** |
|---------|-----------------|---------------|-------------------|
| Storage | 25 GB | 1 GB | **Unlimited** ($0.015/GB) |
| Bandwidth | 25 GB/mo | 2 GB/mo | **FREE (unlimited!)** |
| Video support | ⚠️ 10 MB limit | ✅ 50 MB | ✅ **Unlimited** |
| File size | 10 MB | 50 MB | **No limit** |
| Cost at scale | FREE → $99/mo | $0 → $25/mo | **$0.06/mo forever** |

**For 100 restaurants with videos:**
```
Storage: 4 GB × $0.015 = $0.06/month
Bandwidth: UNLIMITED at $0
Total: $0.06/month 🤯
```

---

## 💎 **My FINAL Recommendation:**

### **Use Cloudflare R2 ($0.06/month = basically FREE)**

**I'll set this up with:**
1. ✅ R2 bucket for all images + videos
2. ✅ Cloudflare CDN (free, fast globally)
3. ✅ Next.js Image optimization
4. ✅ Fetch real Indonesian food photos from Unsplash
5. ✅ Admin upload widget
6. ✅ Video hero component

**Total cost:** $0.06/month (6 cents!)

**Want me to implement this?** It takes 45 minutes but you get:
- 🎥 Unlimited video support
- 🖼️ Unlimited images
- 🚀 FREE bandwidth forever
- 💰 6 cents/month for 100 restaurants

**OR** if you want even simpler (but limited):

### **Hybrid: Cloudinary (images) + Supabase (short videos)**
- Setup: 20 minutes
- Cost: $0
- Limit: Videos must be <8 MB (10-15 sec at 720p)

**Which approach?** R2 is more work but unlimited. Hybrid is simpler but video size limits. Your call! 🎯