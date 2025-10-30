# Page Blueprints (Public)

Status: draft • Owner: Design/Eng • Last updated: 2025-10-21

Note: All pages include the mobile Bottom Quick Actions and visible top CTA.

## Home `/`
- HeroMedia (image/video, logo lockup, value prop, Order/Menu CTAs)
- SectionTabs (Menu • Specials • Reviews • Contact)
- Popular Dishes (DishCard grid 2-up)
- Today’s Specials (SpecialsCard row)
- Social Proof (RatingBadge + ReviewCard list)
- Essentials strip (chips: Hours, Location, Delivery partners, WhatsApp/Call)

## Menu `/menu`
- SectionHeading (Menu)
- Category Tabs (horizontal)
- DishCard list with Add/Customize → BottomSheet (options/notes)
- Sticky order CTA shows subtotal + Checkout

## Specials `/specials`
- SectionHeading (Today’s Specials)
- SpecialsCard grid; tags (spicy/vegan), valid‑through
- CTA to Menu/Order

## Orders `/orders`
- SectionHeading (Live Orders / Recent Orders)
- Status chips, timeline; empty state with guidance

## Loyalty `/loyalty`
- SectionHeading
- Points summary, tier badge; recent activity list; join/claim CTA

## Reviews `/reviews`
- RatingBadge + filter controls (recent, highest, with photos)
- ReviewCard list + Write Review CTA

## Reservations `/reservations`
- Date/time party selector; preset chips
- Contact info; confirm bottom sheet

## Contact `/contact`
- WhatsApp/Call buttons, hours, address/map, email form
- Delivery partner links

## About `/about`
- Brand story, chef note, team photo strip

## Blog `/blog`
- PostCard list; categories; search

## Gift Cards `/gift-cards`
- Denomination selector; send/claim flow CTA

## Error/Not found
- Friendly copy, CTA back to Menu or Home

---
# Admin Blueprints (High level)

## Admin `/admin`
- Consistent shell: left rail (icons + labels on md+), top bar actions
- List/detail patterns unified across modules (Menu, Specials, Orders, Loyalty, Reviews, Blog, Leads, Pages, Chat Assistant)
- Empty states, pagination, inline validation

