# Client Data Folder — Draco Coffee and Eatery

This folder contains all tenant-specific information for Draco Coffee and Eatery that we use to configure the restaurant template.

## 📁 Folder Structure

```
client-data/
├── README.md                 # Overview of structure and usage (this file)
├── setup-guide.md            # Step-by-step onboarding instructions
├── IMAGE-IMPORT-GUIDE.md     # Workflow for collecting and processing media
├── TESTIMONIALS-USAGE-GUIDE.md # How reviews/testimonials feed into the template
├── branding/                 # Colors, typography, logo assets
├── business-info/            # Company profile, contacts, hours
├── features/                 # Feature toggles and configuration
├── images/                   # Raw, processed, and scraped imagery
├── menu/                     # Structured menu data (80+ items)
├── reviews/                  # Featured, parsed, and raw reviews
├── seo/                      # SEO copy and metadata
└── ui-specifications/        # Page-level wireframes and specs
```

## 📋 Current Status

### ✅ Completed
- Full menu with prices and categories (`menu/`)
- Contact information, services, and ratings (`business-info/`)
- Template variables ready for direct code usage (`features/`)

### ⏳ Pending
- High-quality imagery in `images/processed/`
- Brand guidelines (colors, fonts) in `branding/`
- Detailed operating hours and story content in `business-info/`

## 🔗 Related Files

- `../template-system/reference/client-data.md` — Quick reference used by setup docs
- `../template-system/setup/DRACO-COMPLETE-SETUP.md` — End-to-end setup flow that references this folder
- `../template-system/deployment/DRACO-DEPLOYMENT-GUIDE.md` — Deployment checklist that expects data here

## 📊 Quick Stats

**Draco Coffee and Eatery**
- **Type:** Coffee Shop & Eatery
- **Location:** Denpasar, Bali
- **Rating:** 4.6/5 (149 reviews)
- **Menu:** 80+ items across 17 categories
- **Price Range:** Rp 25,000 - 195,000
- **Services:** Dine-in, Takeaway, Delivery (GoFood, GrabFood, Direct)

## 🎯 Implementation Priority

### Phase 1 — Basic Website (Ready Now)
- Home page with business info
- Complete menu page
- Contact page with phone/Instagram
- Location page with address
- About page pending owner story

### Phase 2 — Enhanced Website (Needs Assets)
- Photo gallery, enhanced hero imagery
- Menu item photos
- Instagram feed integration

### Phase 3 — Full Features (Needs Additional Info)
- Online ordering, reservations, events/promotions, loyalty program

## 📝 Notes for Developers

### Menu Implementation
- Prices exclude 5% tax (add calculation)
- Menu is organised by 17 categories
- Support Indonesian & English translations
- Optimise for mobile-first usage

### Contact Integration
- Main phone: 0813-3840-9090 (click-to-call)
- Delivery phone: +62 819 9977 7138 (WhatsApp)
- Instagram: @draco.cofeeandeatery (embed feed)
- Provide GoFood & GrabFood deep links

### Localization
- Primary language: Bahasa Indonesia
- Secondary: English (tourist audience)
- Currency: Indonesian Rupiah (IDR)
- Time zone: WITA (UTC+8)

## 🚀 Onboarding Checklist

1. **Business information** — Populate files under `client-data/business-info/`
2. **Branding** — Fill out `client-data/branding/` (colors, fonts, logos)
3. **Menu** — Maintain structured menu data in `client-data/menu/`
4. **Images** — Store raw assets in `images/raw/`, processed exports in `images/processed/`
5. **Reviews** — Update structured reviews in `client-data/reviews/`
6. **SEO** — Capture keywords and metadata in `client-data/seo/`
7. **UI Specs** — Provide blueprints in `client-data/ui-specifications/`
8. **Feature toggles** — Track configuration in `client-data/features/`

Mark each checklist item complete in `setup-guide.md` as data arrives.

## 📞 Client Contact

- **Business:** Draco Coffee and Eatery
- **Phone:** 0813-3840-9090
- **Delivery:** +62 819 9977 7138
- **Instagram:** @draco.cofeeandeatery
- **Address:** Jl. Mahendradatta Selatan No.7b, Pemecutan Klod, Denpasar, Bali 80119

---

**Last Updated:** October 28, 2025  
**Maintained By:** Development Team
