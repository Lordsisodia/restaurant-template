# Draco Coffee And Eatery - Deployment Guide

## ✅ Implementation Status

### Completed

1. **Client Information Structure**
   - ✅ Created `/client-data/` folder with complete documentation
   - ✅ Added `template-system/reference/client-data.md` - Main strategic document (v2.0)
   - ✅ Added `client-data/menu/menu.md` - Complete menu (80+ items, 17 categories)
   - ✅ Added `client-data/branding/brand-colors.md` - Black/white theme system
   - ✅ Added `client-data/README.md` & `client-data/setup-guide.md` - Implementation roadmap

2. **Configuration Integration**
   - ✅ Created `/src/lib/client-config.ts` - Centralized TypeScript config
   - ✅ Updated `/src/shared/config/pods.json` - Added Draco tenant
   - ✅ Configured all business details (contact, hours, pricing, services)
   - ✅ Set up black/white color theme in theme tokens
   - ✅ Configured social media (Instagram: @draco.cofeeandeatery)
   - ✅ Set up delivery platforms (GoFood, GrabFood, Direct)

3. **Tenant Configuration**
   - **Restaurant ID:** `00000000-0000-0000-0000-000000000003`
   - **Slug:** `draco-coffee`
   - **Domains:**
     - `draco.localhost` (local development)
     - `draco.siso.agency` (staging)
     - `dracocoffee.com` (production - TBD)
     - `www.dracocoffee.com` (production - TBD)

4. **Brand & Design**
   - ✅ Primary theme: Black background (#000000), White text (#FFFFFF)
   - ✅ Accent color: Gold (#D4AF37)
   - ✅ Tagline: "Where Strong Coffee Meets Authentic Flavor"
   - ✅ Rating: 4.6/5 (149 Google reviews)

---

## 🚀 How to Access Draco Site

### Local Development

1. **Start the development server:**
   ```bash
   cd /Users/shaansisodia/DEV/PERSONAL/CLIENT-WORK/client-projects/Restraunt/restaurant-template
   npm run dev
   ```

2. **Access via localhost subdomain:**
   ```
   http://draco.localhost:3000
   ```

   Or add to your `/etc/hosts`:
   ```
   127.0.0.1 draco.localhost
   ```

3. **The site will automatically load with all Draco data:**
   - Business name: "Draco Coffee And Eatery"
   - Phone: 0813-3840-9090
   - Delivery: +62 819 9977 7138
   - Instagram: @draco.cofeeandeatery
   - Black/white theme
   - All 80+ menu items (from database)

---

## 📋 Configuration Details

### Contact Information
```javascript
{
  phone: "0813-3840-9090",
  phoneFormatted: "+62 813-3840-9090",
  whatsapp: "+62 819-9977-7138",
  deliveryPhone: "+62 819 9977 7138",
  email: "" // TBD
}
```

### Location
```javascript
{
  address: "Jl. Mahendradatta Selatan No.7b, Pemecutan Klod, Denpasar, Bali 80119",
  plusCode: "857P+PP",
  coordinates: { lat: null, lng: null } // TBD
}
```

### Operating Hours
```javascript
{
  general: "Open until 11:00 PM",
  closingTime: "23:00",
  timezone: "Asia/Makassar" // WITA (UTC+8)
}
```

### Pricing
```javascript
{
  min: 25000, // Rp 25K
  max: 195000, // Rp 195K
  typical: { min: 50000, max: 75000 }, // Rp 50-75K per person
  taxRate: 0.05, // 5% tax
  taxNote: "All prices exclude 5% tax"
}
```

### Services
```javascript
{
  dineIn: true,
  takeaway: true,
  delivery: true,
  noContactDelivery: true,
  deliveryPlatforms: ["GoFood", "GrabFood", "Direct"]
}
```

### Social Media
```javascript
{
  instagram: "https://instagram.com/draco.cofeeandeatery",
  instagramHandle: "@draco.cofeeandeatery",
  facebook: "", // TBD
  googleMaps: "" // TBD
}
```

### Menu Stats
```javascript
{
  totalCategories: 17,
  totalItems: 80,
  popular: [
    "Nasi Bakar Ayam",
    "Nasi Bakar Cumi",
    "Chicken Sambal Matah",
    "Specialty Coffee",
    "Espresso Martini"
  ]
}
```

---

## 🎨 Theme Configuration

### Colors (Black/White Theme)
```css
--color-primary: #000000          /* Black background */
--color-primary-foreground: #FFFFFF  /* White text */
--color-accent: #D4AF37           /* Gold accent */
--color-background: #000000       /* Black */
--color-foreground: #FFFFFF       /* White */
--color-muted: #1F1F1F           /* Dark gray */
--color-border: #404040          /* Medium gray */
--color-card: #1F1F1F            /* Dark gray cards */
```

### Fonts (TBD - Need client confirmation)
```javascript
{
  primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  heading: "'Poppins', sans-serif"
}
```

---

## 📊 Data Files Structure

```
restaurant-template/
├── client-data.md                    ← Main client documentation
├── client-data/
│   ├── README.md                     ← Implementation guide
│   ├── menu.md                       ← Full menu details
│   ├── client-data.js                ← JS data structures
│   └── brand-colors.md               ← Design system
├── src/
│   ├── lib/
│   │   └── client-config.ts          ← TypeScript config (NEW)
│   └── shared/
│       └── config/
│           └── pods.json             ← Tenant config (UPDATED)
└── DRACO-DEPLOYMENT-GUIDE.md         ← This file
```

---

## ⏳ Still Needed from Client

### High Priority
- [ ] **Daily operating hours** - Specific open/close times for each day
- [ ] **High-quality photos:**
  - [ ] Logo files (SVG, PNG)
  - [ ] Interior photos
  - [ ] Exterior/storefront
  - [ ] Food photography
  - [ ] Coffee preparation shots
  - [ ] Ambiance/atmosphere
- [ ] **Owner's story** - For About page
- [ ] **Google Maps link** - For location embed
- [ ] **Exact coordinates** - For map integration

### Medium Priority
- [ ] **Delivery areas** - Coverage zones for direct delivery
- [ ] **Minimum order** - For delivery service
- [ ] **Payment methods** - Cash, card, e-wallet, etc.
- [ ] **Parking information**
- [ ] **WiFi availability**
- [ ] **Seating capacity**

### Nice to Have
- [ ] **GoFood deep link** - Direct ordering link
- [ ] **GrabFood deep link** - Direct ordering link
- [ ] **Facebook page** - If they have one
- [ ] **Special events/promotions**
- [ ] **Staff photos/bios**
- [ ] **Awards or recognition**

---

## 🔄 Next Steps

### 1. Testing (Now)
```bash
# Access the site locally
npm run dev
# Visit: http://draco.localhost:3000

# Verify:
✅ Business name displays correctly
✅ Phone numbers work (click-to-call)
✅ WhatsApp links work
✅ Instagram link works
✅ Address displays correctly
✅ Black/white theme applied
✅ Menu loads (from database)
```

### 2. Menu Data (Next)
- The menu structure is ready in `/client-data/menu.md`
- Need to import menu data into Supabase database
- Use the existing SQL seed script or create new one
- Map 17 categories and 80+ items to database

### 3. Photos & Assets (When Available)
- Create `/public/images/shared/partners/draco/` folder
- Add logo files
- Add hero images
- Add menu item photos
- Add gallery photos

### 4. Final Touches (Before Launch)
- Complete operating hours schedule
- Add Google Maps embed
- Set up exact coordinates
- Add owner's story to About page
- Configure GoFood/GrabFood deep links
- Test all contact methods (phone, WhatsApp, etc.)
- Test on mobile devices
- Optimize images for performance

---

## 🌐 Domain Setup (For Production)

When ready to launch:

1. **Update `/src/shared/config/pods.json`:**
   ```json
   "domains": [
     "dracocoffee.com",
     "www.dracocoffee.com"
   ]
   ```

2. **Configure DNS:**
   - Point `dracocoffee.com` to Vercel
   - Point `www.dracocoffee.com` to Vercel
   - Add CNAME records

3. **Verify in Vercel:**
   - Add custom domains
   - Configure SSL certificates
   - Test domain resolution

---

## 📞 Quick Reference

**Client:** Draco Coffee And Eatery
**Location:** Denpasar, Bali, Indonesia
**Phone:** 0813-3840-9090
**Delivery:** +62 819 9977 7138
**Instagram:** @draco.cofeeandeatery
**Rating:** 4.6/5 (149 reviews)
**Hours:** Open until 11:00 PM
**Price Range:** Rp 25K - 195K (typical: Rp 50-75K per person)

**Local Dev URL:** http://draco.localhost:3000
**Tenant Slug:** draco-coffee
**Restaurant ID:** 00000000-0000-0000-0000-000000000003

---

**Document Version:** 1.0
**Created:** October 24, 2025
**Status:** Configuration Complete - Ready for Testing
**Next:** Import menu data, add photos, complete operating hours
