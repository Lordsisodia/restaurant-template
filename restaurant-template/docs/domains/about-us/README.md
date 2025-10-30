# About Us Domain

**Status:** Live (last major update 2025-10-25)

The About Us experience tells Draco Coffee & Eatery’s story, blends trust signals, and showcases the venue. This single doc replaces the old PLAN / IMPLEMENTATION-COMPLETE / FINAL-UPDATES files (archived under `docs/project-history/domains/about-us/`).

## 1. Business Goals
- Deliver an emotional narrative (origin story, milestones, community impact)
- Showcase the physical space with a rich gallery and atmosphere cues
- Reinforce social proof (4.6★ rating, testimonials, awards)
- Make it easy to contact, visit, or order (click-to-call, WhatsApp, delivery links)

## 2. Page Structure (Current)
```
1. Hero (landing-style pill badge, gradient headline, scroll indicator)
2. Intro paragraph
3. Venue gallery (masonry grid, category filters, lightbox)
4. Story timeline (2020–2024 milestones)
5. Cuisine philosophy (4 value cards, sourcing notes)
6. Team spotlight (founder + key roles)
7. Awards & reviews (Google rating, testimonial carousel)
8. FAQ (accordion with contact CTA)
9. Location & contact (map, hours, quick actions)
```

## 3. Implementation Highlights
- `VenueGallery` component (filterable masonry grid, responsive columns)
- `AwardsShowcase` with structured testimonial + badge layout
- `LocationContact` section (maps embed, smart quick actions)
- Enhanced `AboutHero` using landing design language (gradient text, pill badge)
- FAQ section with “Still have questions?” CTA and contact buttons

> Full component-level details live in `src/domains/customer-facing/about-us/*` and the archived implementation log at `docs/project-history/domains/about-us/2025-10-24-IMPLEMENTATION-COMPLETE.md`.

## 4. Recent Fixes (Oct 25, 2025)
- Restored missing lucide Coffee icon in `ValuesGrid`
- Added Next.js 16 image quality config (`qualities: [75,80,90,100]`)
- Removed double `<main>` nesting to fix hydration mismatch
- Standardised SectionHeading pill usage across sections
- Removed redundant CTA section (hero, FAQ, footer already provide actions)

## 5. Backlog & Enhancements
- Collect high-resolution gallery imagery (interior, exterior, signature dishes)
- Capture founder story paragraph & extended timeline copy
- Add sourcing transparency to Cuisine Philosophy (partner farms, roasting details)
- Localise key copy for Bahasa Indonesia once translations are ready
- Hook up delivery partner deep links once confirmed by client

## 6. Related Assets
- Client content source: `docs/client-data/` (story copy, photos, reviews)
- Data schema: `docs/data-schema/tenancy.md`, `docs/data-schema/reviews.md`
- Component references: `docs/ux/restaurant-mobile-mvx.md`
- UX intent: `docs/ux/page-blueprints.md` & `docs/ux/restaurant-mobile-mvx.md`

Update this README whenever new sections ship or backlog items close. Move detailed change logs to `project-history/domains/about-us/` to keep this file concise for builders.
