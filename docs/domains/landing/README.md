# Landing Domain

**Status:** Production — live tenant (Draco Coffee) uses this stack.

## Purpose
Owns the marketing homepage, combining hero storytelling, essential info chips, menu highlights, social proof, Instagram snippets, and specials sourced from Supabase.

## Current Coverage
- Hero renderer with configurable variants, animated word headlines, and CTA wiring (`hero-section/`).
- Essentials chips for hours/contact/delivery partners fed by `site_config.features.contact` in Supabase.
- Signature dishes + menu overview pulling from the menu domain cache (`getMenu` → `category`/`item` tables).
- Reviews carousel with real data from `review` + fallback seeds.
- Specials slider powered by `special` table joins with menu items or categories.
- Instagram and story sections driven by site config (`features.instagram`, `features.story`).

## Data Dependencies
- Supabase tables: `site_config`, `page_block` (optional landing blocks), `category`, `item`, `special`, `review`.
- Runtime config: `restaurant-template/src/config/pods.json` (hero words/images, rating, contact info).

## Near-Term Tasks
- Wire `page_block` content for hero/story overrides instead of inline fallbacks.
- Add analytics events for CTA interactions and section impressions.
- Expose toggles in admin UI for enabling/disabling sections per tenant.

## References
- Code: `restaurant-template/src/domains/landing/`
- Data reference: `docs/data-schema/landing.md`
- UX guidelines: `docs/ux/restaurant-mobile-mvx.md`
