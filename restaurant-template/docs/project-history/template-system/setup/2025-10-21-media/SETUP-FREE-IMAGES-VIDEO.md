# 🎨 Setup FREE Images + Video (5 Minutes)

**Cost:** $0/month for 100 restaurants
**Storage:** Cloudinary (25 GB images) + Supabase (1 GB videos)

---

## Step 1: Get FREE Cloudinary Account (2 mins)

1. **Go to:** https://cloudinary.com/users/register_free
2. **Sign up** with your email
3. **After login**, go to **Dashboard**
4. **Copy these 3 values:**
   - **Cloud Name** (e.g., `dxyz123`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `aBcDeFgHiJkLmNoPqRsTuVwXyZ`)

---

## Step 2: Add Cloudinary to .env.local (1 min)

Open `.env.local` and add:

```bash
# Cloudinary (for images)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name-here
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here
```

---

## Step 3: Get FREE Unsplash API Key (2 mins)

*For demo/seed images of Indonesian food*

1. **Go to:** https://unsplash.com/oauth/applications/new
2. **Fill in:**
   - Application name: `SISO Restaurant Demo`
   - Description: `Demo images for restaurant SaaS`
3. **Accept terms** and create
4. **Copy "Access Key"**

Add to `.env.local`:
```bash
# Unsplash (for demo images)
UNSPLASH_ACCESS_KEY=your-access-key-here
```

---

## Step 4: Create Video Bucket in Supabase (1 min)

1. **Go to:** https://supabase.com/dashboard/project/ntrklmkzyfnrtfbpdypd
2. **Click:** Storage (in sidebar)
3. **Click:** "New bucket"
4. **Name:** `restaurant-videos`
5. **Public:** Toggle ON (so videos can be viewed)
6. **File size limit:** 50 MB
7. **Click:** "Create bucket"

---

## ✅ Done!

Your `.env.local` should now have:

```bash
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://ntrklmkzyfnrtfbpdypd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Cloudinary (for images)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Unsplash (for demo images)
UNSPLASH_ACCESS_KEY=your-access-key
```

---

## 🎨 What You'll Get:

Once I integrate everything:

✅ **Beautiful hero section** with Indonesian food images
✅ **Image gallery** (20+ stunning food photos)
✅ **Video hero support** (restaurant owners upload videos)
✅ **Auto-optimized images** (WebP, lazy loading)
✅ **Fast loading** (Cloudinary CDN + Supabase CDN)
✅ **Admin upload widget** (drag & drop images/videos)

**All for $0/month!** 🎉

---

## 📹 Video Compression Guide for Restaurant Owners:

When uploading hero videos, keep them small:

### **Option 1: Use Online Tool (Easy)**
- https://www.freeconvert.com/video-compressor
- Upload video
- Target size: 5-8 MB
- Download compressed version
- Upload to your site

### **Option 2: Use Handbrake (Free Desktop App)**
- Download: https://handbrake.fr/
- Open video
- Preset: "Web" → "Gmail Small 5 Minutes 720p30"
- Start encode
- Result: ~7 MB for 15 seconds

### **Option 3: Use FFmpeg (Command Line)**
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1280:720 -c:a aac -b:a 96k output.mp4
```

**Target:**
- Resolution: 1280×720 (720p)
- Length: 10-15 seconds
- Format: MP4 (H.264)
- File size: 5-8 MB

---

**After you've added the credentials, let me know and I'll populate your site with real images!** 🚀
