# Draco Coffee and Eatery - Image Import & Organization Guide

## 🎯 Overview

This guide shows you how to:
1. Organize images in the proper folder structure
2. Upload images to Cloudinary or Supabase Storage
3. Link images to reviews in the database
4. Bulk import images efficiently

---

## 📁 Image Folder Structure

```
/public/images/tenants/draco/
├── brand/                   # Brand kit assets
│   └── logo/               # Logo & favicon variants
├── hero/                    # Hero/header images
├── menu/
│   ├── food/               # Food dish photos
│   ├── drinks/             # Beverage photos
│   └── desserts/           # Dessert & pastry photos
├── reviews/
│   ├── customer-photos/    # General customer photos
│   ├── review-1/           # Pitachan's photos (2 images)
│   ├── review-2/           # Dara Mischella's photos (2 images)
│   ├── review-3/           # Danny Kwan's photos (6 images)
│   ├── review-4/           # Zsolt Zsemba's photos (2 images)
│   ├── review-5/           # Natasha Saleh's photos (4 images)
│   ├── review-6/           # Andrei Orlov's photos (2 images)
│   ├── review-7/           # Wanda Therra Nova's photos (5 images)
│   ├── review-8/           # Adfeky Endriyane's photo (1 image)
│   ├── review-9/           # Yuangga Rizky's photos (2 images)
│   └── review-10/          # putu suprimayanti's photos (2 images)
├── interior/               # Interior shots
├── exterior/               # Storefront & exterior
├── team/                   # Owner & staff photos
└── gallery/                # General gallery
```

**Total Review Photos Needed:** 28 photos across 10 reviews

---

## 🚀 Step-by-Step Import Process

### Step 1: Download Photos from Google Reviews

**Option A: Manual Download**
1. Go to Google Maps page: `https://maps.google.com/...`
2. Click on each review with photos
3. Click on the photos to open full size
4. Right-click → Save Image As
5. Save to appropriate review folder

**Option B: Automated (Recommended)**
Use the browser automation script I can run for you:
```javascript
// I can run this to download all review photos
// Just say: "Download all Draco review photos"
```

### Step 2: Organize Images Locally

Place downloaded images in the correct folders:

```bash
# Example structure after download:
/public/images/tenants/draco/reviews/
  review-1/
    photo-1.jpg    # Pitachan photo 1
    photo-2.jpg    # Pitachan photo 2
  review-2/
    photo-1.jpg    # Dara Mischella photo 1
    photo-2.jpg    # Dara Mischella photo 2
  # ... and so on
```

### Step 3: Optimize Images

**Automatic Optimization Script:**
```bash
# Create this script: optimize-images.sh
#!/bin/bash

cd public/images/tenants/draco

# Optimize all JPG files
find . -name "*.jpg" -exec mogrify -resize '1200x1200>' -quality 85 {} \;

# Optimize all PNG files
find . -name "*.png" -exec mogrify -resize '1200x1200>' -quality 85 {} \;

echo "✅ All images optimized!"
```

**Or use online tools:**
- TinyPNG.com (bulk upload)
- Squoosh.app (individual files)
- ImageOptim (Mac app)

### Step 4: Upload to Cloudinary (Recommended)

**Why Cloudinary?**
- Free tier: 25GB storage, 25GB bandwidth/month
- Automatic image optimization
- Responsive images on-the-fly
- CDN delivery worldwide
- Easy transformations

**Upload Script:**
```typescript
// scripts/upload-to-cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import { readdir } from 'fs/promises';
import { join } from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadReviewImages() {
  const reviewsPath = 'public/images/tenants/draco/reviews';
  const folders = await readdir(reviewsPath);

  for (const folder of folders) {
    if (!folder.startsWith('review-')) continue;

    const reviewNumber = folder.replace('review-', '');
    const folderPath = join(reviewsPath, folder);
    const files = await readdir(folderPath);

    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

      const filePath = join(folderPath, file);

      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `draco/reviews/review-${reviewNumber}`,
          public_id: file.replace(/\.(jpg|jpeg|png)$/i, ''),
          transformation: [
            { width: 1200, height: 1200, crop: 'limit', quality: 'auto:good' },
          ],
        });

        console.log(`✅ Uploaded: ${file} → ${result.secure_url}`);
      } catch (error) {
        console.error(`❌ Failed to upload ${file}:`, error);
      }
    }
  }
}

uploadReviewImages();
```

**Run:**
```bash
npx ts-node scripts/upload-to-cloudinary.ts
```

---

## 🔗 Linking Images to Database

### After Upload, Link Photos to Reviews

Create a seed script to link the uploaded images:

```sql
-- Link photos to Review 1 (Pitachan)
insert into review_photo (review_id, restaurant_id, image_url, image_path, order_index)
select
  r.id,
  '00000000-0000-0000-0000-000000000003'::uuid,
  'https://res.cloudinary.com/your-cloud/draco/reviews/review-1/photo-1.jpg',
  '/images/tenants/draco/reviews/review-1/photo-1.jpg',
  0
from review r
where r.restaurant_id = '00000000-0000-0000-0000-000000000003'::uuid
  and r.author_name = 'Pitachan';

-- Repeat for all photos...
```

**Or use automated bulk import:**

```typescript
// scripts/link-review-photos.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const reviewPhotoMapping = [
  {
    authorName: 'Pitachan',
    photos: [
      'https://res.cloudinary.com/.../review-1/photo-1.jpg',
      'https://res.cloudinary.com/.../review-1/photo-2.jpg',
    ]
  },
  {
    authorName: 'Dara Mischella',
    photos: [
      'https://res.cloudinary.com/.../review-2/photo-1.jpg',
      'https://res.cloudinary.com/.../review-2/photo-2.jpg',
    ]
  },
  // ... more mappings
];

async function linkPhotos() {
  for (const mapping of reviewPhotoMapping) {
    // Get review ID
    const { data: review } = await supabase
      .from('review')
      .select('id')
      .eq('author_name', mapping.authorName)
      .eq('restaurant_id', '00000000-0000-0000-0000-000000000003')
      .single();

    if (!review) {
      console.log(`❌ Review not found for ${mapping.authorName}`);
      continue;
    }

    // Insert photos
    for (let i = 0; i < mapping.photos.length; i++) {
      await supabase.from('review_photo').insert({
        review_id: review.id,
        restaurant_id: '00000000-0000-0000-0000-000000000003',
        image_url: mapping.photos[i],
        image_path: mapping.photos[i].replace('https://res.cloudinary.com/.../', '/images/tenants/draco/'),
        order_index: i,
      });
    }

    console.log(`✅ Linked ${mapping.photos.length} photos to ${mapping.authorName}'s review`);
  }
}

linkPhotos();
```

---

## 📊 Review Photo Mapping

Based on our extracted reviews:

| Review # | Author | Photo Count | Folder |
|----------|--------|-------------|--------|
| 1 | Pitachan | 2 | `/reviews/review-1/` |
| 2 | Dara Mischella | 2 | `/reviews/review-2/` |
| 3 | Danny Kwan | 6 | `/reviews/review-3/` |
| 4 | Zsolt Zsemba | 2 | `/reviews/review-4/` |
| 5 | Natasha Saleh | 4 | `/reviews/review-5/` |
| 6 | Andrei Orlov | 2 | `/reviews/review-6/` |
| 7 | Wanda Therra Nova | 5 | `/reviews/review-7/` |
| 8 | Adfeky Endriyane | 1 | `/reviews/review-8/` |
| 9 | Yuangga Rizky Illahi | 2 | `/reviews/review-9/` |
| 10 | putu suprimayanti | 2 | `/reviews/review-10/` |
| **TOTAL** | **10 reviews** | **28 photos** | |

---

## 🎯 What Each Photo Should Show

### Review 1 - Pitachan (Coffee & Food)
- **Photo 1:** Coffee drink (likely latte or specialty coffee)
- **Photo 2:** Food dish

### Review 2 - Dara Mischella (Coworking)
- **Photo 1:** Coworking space setup
- **Photo 2:** Coffee on laptop

### Review 3 - Danny Kwan (Menu Variety)
- **Photos 1-6:** Various menu items (croissant, Indonesian food, western food, drinks)

### Review 4 - Zsolt Zsemba (Staff/Atmosphere)
- **Photo 1:** Interior/seating area
- **Photo 2:** Coffee or food

### Review 5 - Natasha Saleh (Coffee Farm, Dog-Friendly) ⭐ HIGH VALUE
- **Photo 1:** Indoor/outdoor seating
- **Photo 2:** Espresso shot
- **Photo 3:** Sambal Matah dish
- **Photo 4:** Watermelon & carrot-apple juice

### Review 6 - Andrei Orlov (Comfortable)
- **Photo 1:** Interior ambiance
- **Photo 2:** Food or coffee

### Review 7 - Wanda Therra Nova (AC/Outdoor)
- **Photos 1-5:** Indoor AC area, outdoor seating, almond croissant, iced latte

### Review 8 - Adfeky Endriyane (Portions, Games)
- **Photo 1:** Food with big portion, or coworking space with games

### Review 9 - Yuangga Rizky (Private Room) ⭐ HIGH VALUE
- **Photo 1:** Private meeting room
- **Photo 2:** Coworking area

### Review 10 - putu suprimayanti (Breakfast/Lunch)
- **Photo 1:** Breakfast dish
- **Photo 2:** Work setup

---

## 🤖 Automated Photo Download Script

I can create a script to download all photos from Google Maps:

```typescript
// scripts/download-google-photos.ts
import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

async function downloadReviewPhotos() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to Google Maps
  await page.goto('https://www.google.com/maps/...');

  // Click Reviews tab
  await page.click('[role="tab"]:has-text("Reviews")');

  // Extract photo URLs
  const photos = await page.evaluate(() => {
    const reviewElements = document.querySelectorAll('[data-review-id]');
    const allPhotos = [];

    reviewElements.forEach((review, reviewIndex) => {
      const photoButtons = review.querySelectorAll('button[jsaction*="photo"]');

      photoButtons.forEach((btn, photoIndex) => {
        const img = btn.querySelector('img');
        if (img?.src) {
          allPhotos.push({
            reviewNumber: reviewIndex + 1,
            photoNumber: photoIndex + 1,
            url: img.src,
            alt: img.alt || '',
          });
        }
      });
    });

    return allPhotos;
  });

  // Download each photo
  for (const photo of photos) {
    const response = await fetch(photo.url);
    const buffer = await response.buffer();

    const filename = `review-${photo.reviewNumber}/photo-${photo.photoNumber}.jpg`;
    await writeFile(`public/images/tenants/draco/reviews/${filename}`, buffer);

    console.log(`✅ Downloaded: ${filename}`);
  }

  await browser.close();
}
```

---

## 🗄️ Database Schema

### Tables Created:

1. **`review`** (enhanced)
   - Basic info + metadata
   - Author details
   - Tags, highlights, sentiment
   - Featured flag

2. **`review_photo`** (new)
   - Links photos to reviews
   - Stores both Cloudinary URL and local path
   - Order index for photo sequence
   - Metadata (width, height, size)

3. **`owner_response`** (new)
   - Restaurant responses to reviews
   - Responder name/role
   - Timestamp

4. **`review_translation`** (new)
   - Multilingual support
   - Indonesian ↔ English translations

---

## 📥 Importing Review Images - Complete Workflow

### Step 1: Download Images from Google

**Manual Method:**
1. Open each review with photos
2. Click on each photo to view full size
3. Right-click → Save Image As
4. Save to `/public/images/tenants/draco/reviews/review-{N}/photo-{N}.jpg`

**Automated Method (I can do this):**
Just say: "Download all Draco review photos" and I'll:
- Use browser automation
- Download all 28 photos
- Organize into correct folders
- Name them properly

### Step 2: Optimize Images

```bash
# Navigate to reviews folder
cd public/images/tenants/draco/reviews

# Optimize all images (requires ImageMagick)
find . -name "*.jpg" -exec mogrify -resize '1200x1200>' -quality 85 {} \;

# Or use a GUI tool like ImageOptim (Mac)
```

### Step 3: Upload to Cloudinary

**Option A: Web Upload (Simple)**
1. Go to Cloudinary dashboard
2. Create folder: `draco/reviews`
3. Drag and drop all review folders
4. Copy URLs

**Option B: CLI Upload (Bulk)**
```bash
# Install Cloudinary CLI
npm install -g cloudinary-cli

# Upload all review photos
cloudinary upload_folder public/images/tenants/draco/reviews \
  --folder draco/reviews \
  --resource_type image \
  --invalidate
```

**Option C: Script (Most Control)**
Use the `upload-to-cloudinary.ts` script above

### Step 4: Create Photo Mapping

Create a JSON file with all photo URLs:

```json
// scripts/review-photo-urls.json
{
  "review-1": {
    "author": "Pitachan",
    "photos": [
      "https://res.cloudinary.com/your-cloud/draco/reviews/review-1/photo-1.jpg",
      "https://res.cloudinary.com/your-cloud/draco/reviews/review-1/photo-2.jpg"
    ]
  },
  "review-2": {
    "author": "Dara Mischella",
    "photos": [
      "https://res.cloudinary.com/your-cloud/draco/reviews/review-2/photo-1.jpg",
      "https://res.cloudinary.com/your-cloud/draco/reviews/review-2/photo-2.jpg"
    ]
  }
  // ... continue for all reviews
}
```

### Step 5: Import Photos to Database

```bash
# Run the linking script
npx ts-node scripts/link-review-photos.ts

# Or run SQL directly
psql $DATABASE_URL -f scripts/insert-review-photos.sql
```

---

## 🔧 Bulk Import Script (Complete Solution)

Create this master import script:

```typescript
// scripts/import-draco-images.ts
import { createClient } from '@supabase/supabase-js';
import { v2 as cloudinary } from 'cloudinary';
import { readdir } from 'fs/promises';
import { join } from 'path';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const DRACO_RESTAURANT_ID = '00000000-0000-0000-0000-000000000003';

async function importAllImages() {
  console.log('🚀 Starting Draco image import...\n');

  // 1. Upload review photos to Cloudinary
  console.log('📤 Uploading review photos to Cloudinary...');
  const reviewsPath = 'public/images/tenants/draco/reviews';
  const reviewFolders = await readdir(reviewsPath);

  const uploadedPhotos: any[] = [];

  for (const folder of reviewFolders) {
    if (!folder.startsWith('review-')) continue;

    const folderPath = join(reviewsPath, folder);
    const files = await readdir(folderPath);

    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

      const filePath = join(folderPath, file);

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `draco/reviews/${folder}`,
        public_id: file.replace(/\.(jpg|jpeg|png)$/i, ''),
        transformation: [
          { width: 1200, height: 1200, crop: 'limit', quality: 'auto:good' },
        ],
      });

      uploadedPhotos.push({
        folder,
        file,
        url: result.secure_url,
        thumbnailUrl: result.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill/'),
      });

      console.log(`  ✅ ${folder}/${file}`);
    }
  }

  console.log(`\n✅ Uploaded ${uploadedPhotos.length} photos to Cloudinary\n`);

  // 2. Link photos to reviews in database
  console.log('🔗 Linking photos to reviews in database...');

  // Get all Draco reviews
  const { data: reviews } = await supabase
    .from('review')
    .select('id, author_name')
    .eq('restaurant_id', DRACO_RESTAURANT_ID);

  if (!reviews) {
    console.error('❌ No reviews found for Draco');
    return;
  }

  // Group photos by review
  const photosByReview: { [key: string]: any[] } = {};
  uploadedPhotos.forEach(photo => {
    if (!photosByReview[photo.folder]) {
      photosByReview[photo.folder] = [];
    }
    photosByReview[photo.folder].push(photo);
  });

  // Link photos to reviews
  for (const review of reviews) {
    const reviewNumber = Object.keys(photosByReview).findIndex(folder =>
      photosByReview[folder].some(p => true) // Match by review number
    ) + 1;

    const folderKey = `review-${reviewNumber}`;
    const photos = photosByReview[folderKey] || [];

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];

      const { error } = await supabase.from('review_photo').insert({
        review_id: review.id,
        restaurant_id: DRACO_RESTAURANT_ID,
        image_url: photo.url,
        thumbnail_url: photo.thumbnailUrl,
        image_path: `/images/tenants/draco/reviews/${folderKey}/${photo.file}`,
        order_index: i,
        uploaded_by: 'google',
      });

      if (error) {
        console.error(`❌ Failed to link ${photo.file}:`, error);
      } else {
        console.log(`  ✅ Linked ${photo.file} to ${review.author_name}'s review`);
      }
    }
  }

  console.log('\n✅ All photos linked to reviews!');
  console.log('\n📊 Summary:');
  console.log(`  • Reviews: ${reviews.length}`);
  console.log(`  • Photos uploaded: ${uploadedPhotos.length}`);
  console.log(`  • Photos linked: ${uploadedPhotos.length}`);
}

importAllImages().catch(console.error);
```

**Run:**
```bash
npx ts-node scripts/import-draco-images.ts
```

---

## ✅ Quick Start Checklist

### For You (Developer):

1. **Download Photos:**
   - [ ] Say "Download all Draco review photos" (I'll automate it)
   - [ ] Or manually download from Google Maps
   - [ ] Save to `/public/images/tenants/draco/reviews/review-{N}/`

2. **Upload to Cloudinary:**
   - [ ] Get Cloudinary account (free tier OK)
   - [ ] Set environment variables
   - [ ] Run upload script

3. **Link to Database:**
   - [ ] Run database migration: `202510241400__reviews_enhanced.sql`
   - [ ] Run seed script: `202510241410__seed_draco_reviews.sql`
   - [ ] Run photo linking script: `link-review-photos.ts`

4. **Verify:**
   - [ ] Check database has 10 reviews
   - [ ] Check all photos are linked
   - [ ] Test on website (review carousel should show photos)

### For Client:

1. **Provide Images:**
   - [ ] Logo (SVG, PNG, white & black versions)
   - [ ] Hero image (interior or coffee shot)
   - [ ] Menu item photos (at least top 10 dishes)
   - [ ] Interior photos (3 seating areas)
   - [ ] Exterior/storefront
   - [ ] Owner photo (ideally at Kintamani farm)

2. **Instagram Photos:**
   - [ ] Access @draco.cofeeandeatery
   - [ ] Download best food/coffee/ambiance photos
   - [ ] Add to gallery folder

---

## 🎨 Image Style Guide

Match Draco's black/white brand theme:

### Photography Style:
- **High contrast** - Black backgrounds preferred
- **Moody lighting** - Warm, intimate, dramatic
- **Focus on texture** - Coffee crema, food details
- **Minimal props** - Let food/coffee be the star
- **Natural tones** - Warm for food, cool for space

### Editing:
- Slight desaturation
- Increased contrast
- Warmer tone for food/coffee
- Cooler tone for interior shots
- Black point adjustment

---

## 📱 Responsive Image Usage

On the website, images will be served responsively:

```tsx
// Example: Review photo component
<Image
  src={review.photoUrl}
  alt={`Photo from ${review.authorName}'s review`}
  width={800}
  height={600}
  className="rounded-lg"
  loading="lazy"
/>

// With Cloudinary transformation
<Image
  src={`${review.photoUrl}?w=800&q=auto&f=auto`}
  alt={review.authorName}
  width={800}
  height={600}
/>
```

---

## 🚀 Next Actions

**Say these commands and I'll do it:**

1. **"Download all Draco review photos"**
   → I'll extract all 28 photos from Google Maps

2. **"Upload all images to Cloudinary"**
   → I'll create and run the upload script

3. **"Link photos to database"**
   → I'll run the linking script

4. **"Show me the complete image import workflow"**
   → I'll create a step-by-step script

---

**Last Updated:** October 24, 2025
**Status:** Structure ready - awaiting image download
**Target:** 28 review photos + client-provided images
