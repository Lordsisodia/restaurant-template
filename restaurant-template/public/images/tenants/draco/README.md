# Draco Coffee And Eatery - Image Organization System

This folder contains all media assets for Draco Coffee And Eatery organized by category.

---

## Shared logo assets
- Draco logos now live in `/public/images/tenants/draco/brand/logo/`. Use those paths for headers, favicons, and app icons so every tenant pulls from the same source of truth.

## 📁 Folder Structure

```
/public/images/tenants/draco/
├── brand/                   # Brand assets and logo variants
│   ├── logo/               # SVG/PNG logos, favicons, app icons
│   ├── color-palette.png   # Brand colors reference
│   ├── typography.png      # Font samples
│   └── brand-guide.pdf     # Full brand guidelines
│
├── hero/                    # Hero/header images
│   ├── hero-main.jpg       # Main hero image (1920x1080)
│   ├── hero-coffee.jpg     # Coffee-focused hero
│   ├── hero-food.jpg       # Food-focused hero
│   └── hero-interior.jpg   # Interior ambiance hero
│
├── menu/                    # Menu item photos
│   ├── food/               # Food dishes
│   │   ├── nasi-bakar-ayam.jpg
│   │   ├── nasi-bakar-cumi.jpg
│   │   ├── chicken-sambal-matah.jpg
│   │   ├── chicken-katsu.jpg
│   │   ├── beef-burger.jpg
│   │   ├── spaghetti-carbonara.jpg
│   │   └── [...more dishes]
│   │
│   ├── drinks/             # Beverages
│   │   ├── espresso.jpg
│   │   ├── latte.jpg
│   │   ├── iced-coffee.jpg
│   │   ├── smoothie-kumbasari.jpg
│   │   ├── cocktail-espresso-martini.jpg
│   │   └── [...more drinks]
│   │
│   └── desserts/           # Desserts & pastries
│       ├── almond-croissant.jpg
│       ├── pancake-tropical.jpg
│       ├── pisang-goreng.jpg
│       └── [...more desserts]
│
├── reviews/                 # Customer review photos
│   ├── customer-photos/    # General customer submissions
│   │   ├── customer-1.jpg
│   │   ├── customer-2.jpg
│   │   └── [...]
│   │
│   ├── review-1/           # Pitachan's review photos
│   │   ├── photo-1.jpg
│   │   └── photo-2.jpg
│   │
│   ├── review-2/           # Dara Mischella's review photos
│   │   ├── photo-1.jpg
│   │   └── photo-2.jpg
│   │
│   └── [more review folders]
│
├── interior/               # Interior photos
│   ├── seating-indoor.jpg  # AC indoor seating
│   ├── seating-outdoor.jpg # Outdoor smoking area
│   ├── private-room.jpg    # Private meeting room
│   ├── coworking-space.jpg # Coworking area
│   ├── counter.jpg         # Coffee counter
│   └── ambiance-*.jpg      # Various ambiance shots
│
├── exterior/               # Exterior & storefront
│   ├── storefront-day.jpg
│   ├── storefront-night.jpg
│   ├── entrance.jpg
│   ├── signage.jpg
│   └── parking.jpg
│
├── team/                   # Staff & owner photos
│   ├── owner-joe.jpg       # Owner photo
│   ├── barista-1.jpg
│   ├── team-photo.jpg      # Group photo
│   └── coffee-farm.jpg     # Owner at Kintamani farm
│
├── gallery/                # General gallery photos
│   ├── coffee-roasting.jpg # Roasting process
│   ├── coffee-beans.jpg
│   ├── latte-art.jpg
│   ├── food-prep.jpg
│   └── atmosphere-*.jpg
│
├── events/                 # Events & specials
│   ├── event-1.jpg
│   └── [...]
│
└── social/                 # Social media specific
    ├── instagram-stories/  # Vertical format (1080x1920)
    ├── instagram-feed/     # Square format (1080x1080)
    └── facebook-cover/     # Facebook cover (820x312)
```

---

## 📸 Image Specifications

### General Guidelines
- **Format:** JPG for photos, PNG for graphics/transparency, SVG for logos
- **Quality:** High-resolution originals, optimized versions for web
- **Naming:** Use kebab-case (lowercase with hyphens)
- **Optimization:** Compress before uploading (use TinyPNG, ImageOptim, etc.)

### Size Requirements

| Category | Dimensions | Max File Size | Format |
|----------|-----------|---------------|--------|
| **Logo** | Vector (SVG) | 50KB | SVG, PNG |
| **Hero Images** | 1920x1080px | 300KB | JPG |
| **Menu Items** | 800x800px | 150KB | JPG |
| **Review Photos** | 800x600px | 100KB | JPG |
| **Interior/Exterior** | 1200x800px | 200KB | JPG |
| **Gallery** | 1200x800px | 200KB | JPG |
| **Instagram Stories** | 1080x1920px | 200KB | JPG |
| **Instagram Feed** | 1080x1080px | 150KB | JPG |

---

## 🎨 Image Guidelines

### Menu Photography
- **Lighting:** Natural light or warm artificial light
- **Styling:** Clean, minimal props
- **Angle:** 45-degree angle or top-down
- **Background:** Dark wood or black surfaces (matches brand)
- **Props:** Coffee beans, minimal greenery, white plates

### Interior Photography
- **Time:** Natural daylight or evening ambiance
- **Focus:** Show the space, people optional
- **Highlight:** Different seating areas (3 zones)
- **Include:** Coworking setup, private room, outdoor area

### Coffee/Drinks Photography
- **Steam:** Capture steam for hot drinks
- **Condensation:** Show cold drinks with condensation
- **Latte Art:** Showcase coffee artistry
- **Props:** Coffee beans, dark surfaces

### Food Photography
- **Fresh:** Photograph immediately after plating
- **Garnish:** Ensure garnishes are fresh and appealing
- **Portions:** Show the "big portions" mentioned in reviews
- **Color:** Enhance warm tones slightly

---

## 📥 Import Process

### Step 1: Organize Source Images
1. Collect all images from:
   - Client (owner)
   - Google reviews
   - Social media (Instagram)
   - Professional photographer (if hired)

2. Sort into temporary folders by category

### Step 2: Optimize Images
```bash
# Using ImageMagick to resize and optimize
mogrify -resize 1920x1080\> -quality 85 *.jpg

# Or use online tools:
# - TinyPNG (tinypng.com)
# - Squoosh (squoosh.app)
# - ImageOptim (Mac)
```

### Step 3: Rename Files
Follow naming convention:
- `{category}-{descriptor}-{number}.jpg`
- Examples:
  - `food-nasi-bakar-ayam-1.jpg`
  - `interior-coworking-space-1.jpg`
  - `review-pitachan-1.jpg`

### Step 4: Upload to Folders
Place files in appropriate folders as per structure above

### Step 5: Update Database
Run the seed script to link images to reviews:
```bash
npm run db:seed:reviews
```

---

## 🔗 Linking Images to Database

### For Menu Items
```sql
update menu_item
set image_url = '/images/tenants/draco/menu/food/nasi-bakar-ayam.jpg'
where name = 'Nasi Bakar Ayam';
```

### For Reviews
```sql
-- Insert review photo
insert into review_photo (review_id, restaurant_id, image_url, image_path, order_index)
values (
  'review-uuid',
  'draco-restaurant-uuid',
  'https://your-cdn.com/image.jpg',
  '/images/tenants/draco/reviews/review-1/photo-1.jpg',
  0
);
```

### For Hero Images
```json
// In tenant config (pods.json)
{
  "brand": {
    "heroUrl": "/images/tenants/draco/hero/hero-main.jpg"
  }
}
```

---

## 🌐 Using Cloudinary (Recommended)

Instead of storing large images in the repo, use Cloudinary:

### Setup
1. Create Cloudinary account (free tier: 25GB)
2. Get API credentials
3. Upload images to Cloudinary
4. Use Cloudinary URLs in database

### Advantages
- **Automatic optimization** - Cloudinary optimizes images
- **Responsive images** - Generate different sizes on-the-fly
- **CDN delivery** - Fast global delivery
- **Transformations** - Crop, resize, filter on URL
- **Lazy loading** - Better performance

### Example Cloudinary URLs
```
Original:
https://res.cloudinary.com/your-cloud/image/upload/draco/menu/nasi-bakar.jpg

Optimized (800px wide):
https://res.cloudinary.com/your-cloud/image/upload/w_800,q_auto,f_auto/draco/menu/nasi-bakar.jpg

Thumbnail (200px):
https://res.cloudinary.com/your-cloud/image/upload/w_200,h_200,c_fill/draco/menu/nasi-bakar.jpg
```

---

## ✅ Image Checklist

### Essential Images (High Priority)
- [ ] Logo (white & black SVG/PNG)
- [ ] Favicon
- [ ] Hero image (main)
- [ ] Nasi Bakar Ayam (signature dish)
- [ ] Nasi Bakar Cumi
- [ ] Chicken Sambal Matah
- [ ] Coffee (latte/espresso)
- [ ] Espresso Martini (signature cocktail)
- [ ] Interior coworking space
- [ ] Interior AC area
- [ ] Outdoor seating
- [ ] Owner photo (from farm)
- [ ] 5-10 customer review photos

### Nice to Have (Medium Priority)
- [ ] All menu items with photos
- [ ] Multiple interior angles
- [ ] Coffee roasting process
- [ ] Latte art examples
- [ ] Staff photos
- [ ] Kintamani farm photos
- [ ] More customer photos from reviews

### Future (Low Priority)
- [ ] Event photos
- [ ] Seasonal specials
- [ ] Social media templates
- [ ] Promotional graphics

---

## 🚀 Next Steps

1. **Collect Images:**
   - Ask client for logo, interior, exterior, menu photos
   - Download customer photos from Google reviews
   - Check Instagram (@draco.cofeeandeatery)

2. **Organize Locally:**
   - Sort into proper folders
   - Rename following convention
   - Optimize file sizes

3. **Upload Options:**
   - **Option A:** Keep in repo (for small collections <50 images)
   - **Option B:** Upload to Cloudinary (recommended for >50 images)
   - **Option C:** Use Supabase Storage

4. **Update Database:**
   - Run seed script to link reviews to photos
   - Update menu items with image URLs
   - Set hero images in config

5. **Test Website:**
   - Verify all images load correctly
   - Check mobile responsive images
   - Test image lazy loading
   - Verify image optimization

---

## 📝 Notes

- All images should reflect Draco's **black/white brand theme**
- Focus on **strong coffee, coworking, and authentic Indonesian food**
- Highlight **3 seating areas** (indoor AC, outdoor smoking, private room)
- Emphasize **coffee farm connection** in owner photos
- Show **big portions** mentioned in reviews
- Include **dog-friendly** imagery if possible

---

**Last Updated:** October 24, 2025
**Status:** Structure ready - awaiting image uploads
**Image Count:** 0/100 (target)
