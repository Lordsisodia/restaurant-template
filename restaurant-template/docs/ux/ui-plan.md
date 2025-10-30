# Restaurant Template — UI Plan

Status: draft • Owner: Design/Eng • Last updated: 2025-10-21

## Objectives
- Elevate the mobile experience to production quality while remaining templateable.
- Define a reusable design system (tokens + components) that tenants can theme.
- Provide page blueprints so every route reads as a cohesive brand, not a skeleton.

## Core Principles
- Mobile-first defaults; desktop enhances the same structure.
- Make primary actions visible at all times (no discovery taps).
- Show the food early: hero media, popular dishes, specials.
- Keep friction low: one-tap Order/Reserve/Call/WA.
- Ship fast, accessible pages (LCP ≤ 2.5s, WCAG AA).

## Global Layout & Navigation
- Header: logo (left), persistent primary CTA (right). Hamburger is secondary.
- Bottom Quick Actions (mobile): Menu • Order • Call/WA • Reserve (always visible).
- Section Tabs: horizontally scrollable tabs under hero for key sections.
- Footer: essentials and secondary navigation.

## Design System
- Tokens: extend `restaurant-template/src/shared/config/theme-tokens.ts` with
  - colors (primary, secondary, surface, bg, fg, success, warning, danger),
  - typography scale (xs–3xl),
  - spacing (2–64), radii (sm–xl), shadows (sm–xl),
  - z-index, animation durations (fast/normal/slow).
- Theming: tokens read from `siteConfig` per tenant, with fallbacks.
- Components (shared): Buttons, IconButton, Chip, Card, Badge, SectionHeading,
  ListTile, Tabs, BottomSheet, Toast, RatingBadge, ImageWithFallback.
- Restaurant-specific: DishCard, SpecialsCard, ReviewCard, HeroMedia, QuickActionsBar, SectionTabs.

## Content Requirements (per tenant)
- Logo (SVG/PNG), brand color.
- Hero photos/videos (2K wide), 8–12 dish photos (1:1, 1200px min).
- Tagline (≤ 110 chars), WhatsApp/phone, hours, address.
- Delivery partners (Grab/Gojek), rating summary and 3 review excerpts.

## Accessibility & Performance
- Tap targets ≥ 44×44; visible focus states.
- Color contrast AA; semantic headings/landmarks.
- Image preloading for hero; `next/image` everywhere; CLS < 0.1.

## Page Blueprints
- See `docs/ux/page-blueprints.md` for detailed structure per route.

## Implementation Tracks
- Track A: Public surface (Home, Menu, Specials, Reviews, Reservations, Contact).
- Track B: Admin shell cohesion (consistent header/body, polished tables/forms).
- Track C: Theming (tokens + overrides per tenant).

## Risks & Mitigations
- Asset quality variability: enforce content pack checklist in onboarding.
- Over-customization: keep components prop-driven; avoid per-tenant forks.

