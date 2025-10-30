# Specials Domain - Template Architecture

## 🏗️ Structure

```
src/domains/specials/
├── templates/
│   ├── template-1/          # Card layout with badges
│   ├── template-2/          # Banner hero layout
│   ├── template-3/          # Carousel slider
│   ├── SpecialsHost.tsx     # Template selector
│   └── types.ts
│
├── pages/
│   ├── SpecialsPage.tsx      # Customer sees current deals
│   └── AdminSpecialsPage.tsx # Admin creates deals ✅
│
└── index.ts
```

## 💡 NOTE: Landing Domain Already Has Specials Templates!

The `landing/specials-templates/` folder has templates for special previews.

You can:
- **Reuse** those for the dedicated specials page
- **Create new** templates specific to full-page specials display

## 🎨 Template Props Interface

```typescript
interface SpecialsTemplateProps {
  specials: Special[];
  tenant: Tenant;
}

interface Special {
  id: string;
  title: string;
  description: string;
  type: 'percent' | 'fixed' | 'bogo';
  value: number;
  savings: string;
  startDate: string | null;
  endDate: string | null;
}
```

## 🎨 Adding Templates from v0.dev

1. Get specials/deals template from v0.dev
2. Drop into `templates/template-1/index.tsx`
3. Ensure it accepts `SpecialsTemplateProps`
4. Register in SpecialsHost.tsx

---

**Status:** Scaffolding Ready - Templates needed from v0.dev
