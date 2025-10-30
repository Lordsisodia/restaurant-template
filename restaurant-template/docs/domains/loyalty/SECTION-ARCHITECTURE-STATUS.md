# Loyalty Domain - Section Architecture Status

> **Update (Oct 30, 2025):** Loyalty now ships with `sections/` (hero, membership-showcase, tier-highlights, top-diners-leaderboard) following the registry scaffold. The notes below capture the pre-migration architecture and are retained for historical reference.

## Historical State: NOT Using New Registry Pattern

The loyalty domain currently uses an **older section pattern** (PascalCase folder names) and has **NOT** been migrated to the new registry-based architecture.

### Why No Migration Yet?

The loyalty sections already have a working structure with multiple template variants:
- `HeroSection/` - with templates primary, template-1, template-2, template-3
- `MembershipShowcase/` - with templates primary, template-1, template-2, template-3
- `TierHighlights/` - with templates primary, template-1, template-2, template-3
- `TopDinersLeaderboard/` - with templates primary, template-1, template-2, template-3

**Decision**: Keep the existing pattern for loyalty since:
1. It's already working and functional
2. It has 4 template variants per section (more than the default 3)
3. The page is actively being used
4. Migration would require significant testing
5. No immediate business need for the registry pattern benefits

## Current Architecture

### Folder Structure
```
loyalty/
├── HeroSection/
│   ├── types.ts
│   ├── index.ts
│   └── templates/
│       ├── primary/
│       ├── template-1/
│       ├── template-2/
│       └── template-3/
├── MembershipShowcase/
│   └── (same structure)
├── TierHighlights/
│   └── (same structure)
├── TopDinersLeaderboard/
│   └── (same structure)
└── pages/
    └── LoyaltyPage.tsx
```

### Usage Pattern

```tsx
import { HeroSectionPrimary } from '../HeroSection';
import { MembershipShowcasePrimary } from '../MembershipShowcase';

<HeroSectionPrimary
  tenantName={tenant.displayName}
  primaryCtaHref="/contact"
  // ... props
/>
```

**Key Difference from New Pattern**:
- Direct component imports vs. Renderer pattern
- Props-based vs. Content object + variant selection
- No registry system
- No Zod validation schemas
- No auto-generated Storybook stories/tests

## When to Migrate?

Consider migrating to the new registry pattern when:

1. **Need Runtime Variant Switching**: Want to A/B test different layouts without code deploy
2. **Need Type Safety at Runtime**: Want Zod validation of incoming data
3. **Need Discoverability**: Want programmatic access to available variants
4. **Adding New Domains**: Starting fresh? Use new pattern from the start
5. **Major Refactor**: Already doing significant work on loyalty? Good time to migrate

## Migration Guide (When Ready)

If you decide to migrate loyalty to the new pattern:

1. **Scaffold New Sections**
   ```bash
   node scripts/tools/scaffold-section.mjs loyalty hero-section --component=Hero
   node scripts/tools/scaffold-section.mjs loyalty membership-section --component=Membership
   # etc...
   ```

2. **Define Schemas** (`types/schema.ts`)
   - Extract prop types from existing `types.ts`
   - Create Zod schemas for validation

3. **Migrate Components**
   - Copy component code from old `templates/primary/index.tsx`
   - Update to use schema types
   - Add to new `templates/primary/XxxPrimary.tsx`

4. **Update Page**
   ```tsx
   // Old
   <HeroSectionPrimary tenantName={x} primaryCtaHref={y} />

   // New
   <HeroRenderer variant="primary" content={{ tenantName: x, primaryCtaHref: y }} />
   ```

5. **Remove Old Sections**
   - Delete `HeroSection/`, `MembershipShowcase/`, etc.
   - Update exports in `index.ts`

6. **Test Thoroughly**
   - Visual regression testing
   - Verify all variants work
   - Check Storybook stories
   - Run Vitest specs

## Comparison: Old vs New Pattern

| Feature | Old Pattern (Loyalty) | New Pattern (About Us) |
|---------|----------------------|------------------------|
| Folder naming | `HeroSection/` | `hero-section/` |
| Component usage | `<HeroSectionPrimary props />` | `<HeroRenderer variant content />` |
| Type safety | TypeScript only | TypeScript + Zod |
| Variant switching | Code change required | Runtime prop change |
| Registry | No | Yes (`heroRegistry`) |
| Storybook | Manual | Auto-generated |
| Tests | Manual | Auto-generated |
| Mock data | Manual | `defineSectionMocks()` |
| Documentation | Manual | Auto-generated READMEs |
| Discoverability | Manual code search | `getHeroVariants()` |

## Recommendations

1. **For New Domains**: Use the new registry pattern (see `about-us/` example)
2. **For Loyalty**: Keep current pattern unless business need arises
3. **For Major Updates**: If loyalty needs significant work, consider migrating then
4. **For A/B Testing**: If you need runtime variant switching, migrate specific sections

## Reference

- **New Pattern Example**: `src/domains/customer-facing/about-us/` (fully migrated)
- **Old Pattern Example**: `src/domains/customer-facing/loyalty/` (current state)
- **Scaffolding Tool**: `scripts/tools/scaffold-section.mjs`
- **Architecture Guide**: `docs/domains/section-architecture.md`

---

**Decision Date**: 2025-10-29
**Status**: Keeping old pattern for loyalty
**Reason**: Working system, no immediate business need for migration
**Next Review**: When adding new features or A/B testing requirements arise
