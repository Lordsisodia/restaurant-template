# Gift Cards Domain - Template Architecture

## 🏗️ Structure

```
src/domains/gift-cards/
├── templates/
│   ├── template-1/          # Form layout with preview card
│   ├── template-2/          # Fancy animated card design
│   ├── template-3/          # Minimal purchase flow
│   ├── GiftCardsHost.tsx    # Template selector
│   └── types.ts
│
├── pages/
│   ├── GiftCardsPage.tsx       # Customer purchases gift cards
│   └── AdminGiftCardsPage.tsx  # Admin manages codes ✅
│
├── components/
│   ├── GiftCardPreview.tsx     # Animated card preview
│   └── PurchaseForm.tsx        # Reusable form component
│
└── index.ts
```

## 🎨 Template Props Interface

```typescript
interface GiftCardsTemplateProps {
  tenant: Tenant;
  denominations?: number[]; // e.g., [50000, 100000, 200000]
}
```

## 🎨 Adding Templates from v0.dev

1. Search v0.dev for "gift card purchase form"
2. Drop template into `templates/template-1/index.tsx`
3. Ensure server action `issueGiftCard` is called on submit
4. Add fancy card preview animations

## 💳 Features to Include in Template

- [ ] Amount selection (preset buttons + custom input)
- [ ] Purchaser email
- [ ] Recipient email
- [ ] Personal message textarea
- [ ] Animated gift card preview
- [ ] Payment integration (Stripe/PayPal) - future
- [ ] Email delivery confirmation

---

**Status:** Scaffolding Ready - Import fancy v0.dev template
