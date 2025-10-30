# Component Backlog (UI MVX)

Status: draft • Owner: Eng • Last updated: 2025-10-21

## P0 (ship first)
- QuickActionsBar (mobile sticky)
- SectionTabs (scrollable)
- HeroMedia (image/video + CTAs)
- DishCard (image, name, price, tags)
- SpecialsCard (compact, validity, tags)
- RatingBadge + ReviewCard
- BottomSheet (Add/Customize dish)
- StickyOrderCTA (subtotal + checkout)

## P1
- ImageWithFallback (blur, error)
- Chip, Badge, Toast
- ListTile (for essentials strip)
- MapLink (open maps with address)
- WhatsAppButton / CallButton

## P2
- Carousel (for promos/hero variants)
- Skeleton loaders (cards, lists)
- Table primitives for admin polish

## Notes
- All components consume theme tokens and accept className overrides.
- Analytics hooks: `nav.quick_action_click`, `nav.section_tab_click`, `dish.add_to_cart`, `order.checkout_click`.

