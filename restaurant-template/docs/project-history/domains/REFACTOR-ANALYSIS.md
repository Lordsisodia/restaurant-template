# Landing Domain - Refactor Analysis

**Date:** 2025-10-26
**Status:** Analysis - Proposing Structure Improvement

---

## 🔍 Current Structure Issue

The landing domain currently has **types/hooks/utils INSIDE each template**:

```
hero-templates/
├── template-1/
│   ├── hooks/          ← Mostly empty (.gitkeep)
│   ├── types/          ← Mostly empty (.gitkeep)
│   ├── utils/          ← Mostly empty (.gitkeep)
│   └── index.tsx
├── template-2/
│   ├── hooks/          ← Duplicate folders
│   ├── types/          ← Duplicate folders
│   ├── utils/          ← Duplicate folders
│   └── index.tsx
└── template-3/
    ├── hooks/          ← More duplicates
    ├── types/          ← More duplicates
    ├── utils/          ← More duplicates
    └── index.tsx
```

**Problems:**
- ❌ Duplicate empty folders across every template
- ❌ Forces duplication of shared types/hooks/utils
- ❌ Harder to maintain shared logic
- ❌ Violates DRY principle
- ❌ Folder bloat (3 templates × 3 folders = 9 empty folders per component)

---

## ✅ Proposed Improvement (Reviews Pattern)

Move types/hooks/utils to component level (OUTSIDE templates):

```
hero-templates/
├── templates/
│   ├── primary/
│   │   └── index.tsx
│   ├── template-2/
│   │   └── index.tsx
│   └── template-3/
│       └── index.tsx
├── types/              ← Shared across all templates
├── hooks/              ← Shared across all templates
└── utils/              ← Shared across all templates
```

**Benefits:**
- ✅ Single location for shared types/hooks/utils
- ✅ Templates only differ in presentation (UI), not logic
- ✅ Easier to maintain and update
- ✅ Follows DRY principle
- ✅ Matches proven reviews domain pattern
- ✅ Cleaner folder structure

---

## 📊 Impact Analysis

### Landing Domain Components

| Component | Current | Proposed | Empty Folders Removed |
|-----------|---------|----------|---------------------|
| hero-templates | 9 folders in templates | 3 at component level | 6 empty folders |
| review-templates | 9 folders in templates | 3 at component level | 6 empty folders |
| menu-templates | 9 folders in templates | 3 at component level | 6 empty folders |
| gallery-templates | 9 folders in templates | 3 at component level | 6 empty folders |
| map-templates | 9 folders in templates | 3 at component level | 6 empty folders |
| story-templates | 9 folders in templates | 3 at component level | 6 empty folders |
| specials-templates | 9 folders in templates | 3 at component level | 6 empty folders |
| cta-templates | 9 folders in templates | 3 at component level | 6 empty folders |
| essentials-templates | 9 folders in templates | 3 at component level | 6 empty folders |

**Total:** ~54 mostly empty folders can be consolidated to ~27 shared folders

---

## 🎯 Recommended Structure

### Before (Current)
```
landing/
├── hero-templates/
│   ├── template-1/
│   │   ├── components/
│   │   ├── hooks/          ← Empty
│   │   ├── types/          ← Empty
│   │   ├── utils/          ← Empty
│   │   └── index.tsx
│   ├── template-2/
│   │   ├── hooks/          ← Empty
│   │   ├── types/          ← Empty
│   │   ├── utils/          ← Empty
│   │   └── index.tsx
│   ├── HeroHost.tsx
│   └── types.ts            ← Already exists at component level!
```

### After (Proposed)
```
landing/
├── hero-templates/
│   ├── templates/
│   │   ├── primary/
│   │   │   ├── components/   ← Template-specific components
│   │   │   └── index.tsx
│   │   ├── template-2/
│   │   │   └── index.tsx
│   │   └── template-3/
│   │       └── index.tsx
│   ├── types/                ← Shared types
│   ├── hooks/                ← Shared hooks
│   ├── utils/                ← Shared utils
│   ├── HeroHost.tsx
│   └── index.ts
```

---

## 🚀 Migration Plan

### Phase 1: Restructure Folders
For each component (hero-templates, review-templates, etc.):

1. **Create component-level folders:**
```bash
mkdir -p hero-templates/types
mkdir -p hero-templates/hooks
mkdir -p hero-templates/utils
```

2. **Create templates wrapper:**
```bash
mkdir -p hero-templates/templates
mv hero-templates/template-1 hero-templates/templates/primary
mv hero-templates/template-2 hero-templates/templates/template-2
mv hero-templates/template-3 hero-templates/templates/template-3
```

3. **Remove empty folders from templates:**
```bash
rm -rf hero-templates/templates/*/hooks
rm -rf hero-templates/templates/*/types
rm -rf hero-templates/templates/*/utils
```

4. **Move template-specific components inside template:**
```bash
# Components stay inside each template variant
# Only hooks/types/utils move to component level
```

### Phase 2: Update Imports
```typescript
// Before
import { HeroSection } from './hero-templates/template-1';

// After
import { HeroSection } from './hero-templates/templates/primary';
```

### Phase 3: Verify Build
- Test each template still renders
- Check no broken imports
- Verify all components work

---

## 🎨 Why This Makes Sense

### Template Variants Should Only Differ in UI

**Same Data, Different Presentation:**
```typescript
// Shared type (component level)
interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  cta: { text: string; href: string };
}

// Primary template - Full hero
export default function HeroPrimary({ title, subtitle, image, cta }: HeroProps) {
  return <div>{/* Full screen hero */}</div>;
}

// Template-2 - Minimal hero
export default function HeroMinimal({ title, subtitle, image, cta }: HeroProps) {
  return <div>{/* Minimal hero */}</div>;
}
```

Both templates use the SAME type, just different UI. Why duplicate?

---

## ✅ Approval Needed

**Question:** Should we refactor the landing domain to match the reviews pattern?

**Pros:**
- ✅ Cleaner structure
- ✅ Less duplication
- ✅ Easier maintenance
- ✅ Matches modern best practices
- ✅ Proven pattern (reviews domain)

**Cons:**
- ⚠️  Requires migration work
- ⚠️  Need to update imports
- ⚠️  Risk of breaking existing pages

**Recommendation:** YES - The benefits outweigh the risks, and it's better to fix now than accumulate more tech debt.

---

## 📋 Migration Checklist

If approved:

- [ ] Backup current landing domain
- [ ] Restructure hero-templates
- [ ] Restructure review-templates
- [ ] Restructure menu-templates
- [ ] Restructure gallery-templates
- [ ] Restructure map-templates
- [ ] Restructure story-templates
- [ ] Restructure specials-templates
- [ ] Restructure cta-templates
- [ ] Restructure essentials-templates
- [ ] Update all imports in index.tsx
- [ ] Test landing page renders
- [ ] Test all template variants
- [ ] Update documentation

---

**Status:** ⏸️ Awaiting Approval
**Next Step:** Get confirmation to proceed with refactor
