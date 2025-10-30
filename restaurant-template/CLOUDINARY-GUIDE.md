# 🎨 Cloudinary Image Setup & Organization Guide

## 📁 STEP 1: Organize Your Images in Cloudinary

### Upload Structure (Do this in Cloudinary Dashboard)

Go to: https://console.cloudinary.com/pm/c-4fe9b087e1f6b59df09ceb06e7a7a4/media-explorer

**Create folders and upload:**
```
restaurant/
├── portfolio/         # Portfolio showcase images
│   ├── project-1
│   ├── project-2
│   └── project-3
├── menu/             # Food dish photos
│   ├── appetizers/
│   ├── mains/
│   └── desserts/
├── team/             # Staff photos
│   ├── chef-john
│   └── manager-sarah
├── hero/             # Hero/banner images
│   └── hero-main
└── gallery/          # General gallery
    └── interior-shots
```

### How to Upload:
1. Go to Media Library in Cloudinary
2. Click "Upload" button
3. Select folder structure (create folders as needed)
4. Drag & drop images
5. **Note the filename** (you'll use this in code)

---

## 💻 STEP 2: Use Images in Your Code

### Basic Usage (with auto-editing!)

```tsx
import CloudinaryImage from '@/components/CloudinaryImage';

export default function Portfolio() {
  return (
    <div className="portfolio-grid">
      {/* Auto-cropped to 1200x800, optimized, lazy-loaded */}
      <CloudinaryImage
        src="restaurant/portfolio/project-1"
        alt="Modern restaurant interior"
        preset="portfolioHero"
      />

      {/* Same image as thumbnail - auto-resized to 400x300 */}
      <CloudinaryImage
        src="restaurant/portfolio/project-1"
        alt="Modern restaurant interior thumbnail"
        preset="portfolioThumbnail"
      />
    </div>
  );
}
```

### With Effects (Image Editing!)

```tsx
{/* Sharpen food images automatically */}
<CloudinaryImage
  src="restaurant/menu/mains/pasta-carbonara"
  alt="Creamy Pasta Carbonara"
  preset="menuItem"
  effect="sharpen"
/>

{/* Vintage effect for team photos */}
<CloudinaryImage
  src="restaurant/team/chef-john"
  alt="Chef John"
  preset="teamMember"
  effect="vintage"
/>

{/* Warm tone for hero images */}
<CloudinaryImage
  src="restaurant/hero/hero-main"
  alt="Restaurant atmosphere"
  preset="heroFull"
  effect="warm"
/>
```

---

## 🎨 STEP 3: Available Presets & Effects

### Image Presets (Auto Sizes & Crops)

| Preset | Size | Best For |
|--------|------|----------|
| `portfolioHero` | 1200x800 | Large showcase images |
| `portfolioThumbnail` | 400x300 | Grid thumbnails |
| `menuItem` | 600x600 | Food photos |
| `teamMember` | 400x400 | Staff headshots (auto face-detect) |
| `heroFull` | 1920x1080 | Hero banners |
| `gallerySquare` | 500x500 | Instagram-style grid |

### Image Effects (Auto Editing)

| Effect | What it Does |
|--------|--------------|
| `sharpen` | Makes images crisp (great for food) |
| `vibrant` | Boosts colors |
| `warm` | Adds warm orange/red tones |
| `cool` | Adds cool blue/green tones |
| `vintage` | Sepia/retro look |
| `blackAndWhite` | Grayscale |
| `blur` | Background blur effect |
| `brightness` | Brightens the image |
| `contrast` | Increases contrast |
| `cartoonify` | Cartoon effect |
| `vignette` | Darkens edges |

---

## 📋 STEP 4: Real-World Examples

### Portfolio Page
```tsx
// app/portfolio/page.tsx
import CloudinaryImage from '@/components/CloudinaryImage';

const portfolioItems = [
  { id: 1, src: 'restaurant/portfolio/modern-interior', title: 'Modern Design' },
  { id: 2, src: 'restaurant/portfolio/outdoor-patio', title: 'Outdoor Space' },
  { id: 3, src: 'restaurant/portfolio/private-dining', title: 'Private Events' },
];

export default function PortfolioPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolioItems.map((item) => (
        <div key={item.id} className="group cursor-pointer">
          <CloudinaryImage
            src={item.src}
            alt={item.title}
            preset="portfolioHero"
            effect="vibrant"
            className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
          />
          <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
        </div>
      ))}
    </div>
  );
}
```

### Menu Page with Food Images
```tsx
// app/menu/page.tsx
const menuItems = [
  { name: 'Pasta Carbonara', image: 'restaurant/menu/mains/carbonara' },
  { name: 'Grilled Salmon', image: 'restaurant/menu/mains/salmon' },
  { name: 'Tiramisu', image: 'restaurant/menu/desserts/tiramisu' },
];

export default function MenuPage() {
  return (
    <div className="menu-grid">
      {menuItems.map((item) => (
        <div key={item.name} className="menu-item">
          <CloudinaryImage
            src={item.image}
            alt={item.name}
            preset="menuItem"
            effect="sharpen" // Makes food look extra crispy!
            className="rounded-lg"
          />
          <h4>{item.name}</h4>
        </div>
      ))}
    </div>
  );
}
```

### Team Page with Face Detection
```tsx
// app/team/page.tsx
const team = [
  { name: 'Chef John', role: 'Head Chef', image: 'restaurant/team/chef-john' },
  { name: 'Sarah', role: 'Manager', image: 'restaurant/team/manager-sarah' },
];

export default function TeamPage() {
  return (
    <div className="team-grid">
      {team.map((member) => (
        <div key={member.name} className="text-center">
          {/* Auto-centers on face! */}
          <CloudinaryImage
            src={member.image}
            alt={member.name}
            preset="teamMember"
            className="rounded-full mx-auto"
          />
          <h4>{member.name}</h4>
          <p>{member.role}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🚀 STEP 5: Quick Start Checklist

- [ ] Images uploaded to Cloudinary in organized folders
- [ ] `.env.local` created with cloud name
- [ ] `next-cloudinary` package installed
- [ ] `CloudinaryImage` component created
- [ ] `cloudinary-config.ts` set up with presets
- [ ] Test one image on a page

---

## 💡 Pro Tips

### 1. Name Files Descriptively
```
❌ IMG_1234.jpg
✅ restaurant/portfolio/modern-interior-night-view.jpg
```

### 2. Use Same Image, Different Presets
```tsx
{/* Hero */}
<CloudinaryImage src="dish-1" preset="menuItem" />

{/* Thumbnail */}
<CloudinaryImage src="dish-1" preset="portfolioThumbnail" />
```

### 3. Combine Effects
Want to edit in code? Just change the effect prop:
```tsx
<CloudinaryImage src="..." preset="menuItem" effect="warm" />
<CloudinaryImage src="..." preset="menuItem" effect="sharpen" />
<CloudinaryImage src="..." preset="menuItem" effect="vibrant" />
```

### 4. No Editing Software Needed!
- Cloudinary auto-crops
- Cloudinary auto-optimizes
- Cloudinary auto-resizes
- Cloudinary applies effects
- All via URL transformations!

---

## 🎯 What You Get Automatically

✅ **Perfect Sizes** - Every preset has optimal dimensions
✅ **Face Detection** - Team photos auto-center on faces
✅ **Auto Format** - WebP/AVIF for modern browsers
✅ **Lazy Loading** - Images load as you scroll
✅ **Responsive** - Different sizes for mobile/tablet/desktop
✅ **SEO Optimized** - Proper alt tags
✅ **Zero Vercel Impact** - Stays under 250MB limit
✅ **CDN Delivery** - Fast worldwide

---

## 📊 Current Usage (Free Tier)

- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: Unlimited
- **Current Usage**: Check at https://console.cloudinary.com/pm/c-4fe9b087e1f6b59df09ceb06e7a7a4/getting-started

---

## Need Help?

1. **Upload Issues?** Check folder structure in Cloudinary
2. **Image Not Showing?** Verify filename matches upload
3. **Want Custom Effect?** Add to `IMAGE_EFFECTS` in config
4. **New Preset Needed?** Add to `IMAGE_PRESETS` in config
