# Menu

This folder contains all menu-related content and structure.

## Files in This Folder:

### `menu.md` ✓ (Already exists - rename to menu-items.md)
Full menu with all items, descriptions, and prices.

---

## Files to Create:

### 1. `menu-items.md` (or rename existing menu.md)
```markdown
# Menu Items

## [Category Name - e.g., "Coffee & Beverages"]

### [Item Name]
**Description:** [Brief description of the item]
**Price:** [Price or price range]
**Allergens:** [List any allergens]
**Dietary:** [Vegan, Vegetarian, Gluten-Free, etc.]
**Popular:** [Yes/No - is this a bestseller?]
**Image:** [Path to image or note if needed]

**Variations:**
- [Size/variation 1]: [Price]
- [Size/variation 2]: [Price]

---

## Example Structure:

## Coffee & Beverages

### Espresso
**Description:** Rich, bold shot of espresso made from premium Arabica beans
**Price:** $3.50
**Dietary:** Vegan (if black), Vegetarian
**Popular:** Yes

**Variations:**
- Single Shot: $3.50
- Double Shot: $4.50

### Cappuccino
**Description:** Creamy espresso with steamed milk and foam
**Price:** $4.50
**Allergens:** Dairy
**Dietary:** Vegetarian
**Popular:** Yes

**Variations:**
- Regular: $4.50
- Large: $5.50
- Oat Milk: +$0.50
```

### 2. `categories.md`
```markdown
# Menu Categories

## Category Structure

### 1. [Category Name]
**Description:** [What's in this category]
**Display Order:** [1, 2, 3...]
**Icon:** [Icon name or emoji]
**Featured:** [Yes/No]

**Items in Category:**
- [Item 1]
- [Item 2]
- [Item 3]

---

## Example:

### 1. Coffee & Espresso
**Description:** Premium coffee drinks made with locally sourced beans
**Display Order:** 1
**Icon:** ☕
**Featured:** Yes

**Items in Category:**
- Espresso
- Cappuccino
- Latte
- Americano

### 2. Food
**Description:** Freshly prepared meals and snacks
**Display Order:** 2
**Icon:** 🍽️
**Featured:** No

**Items in Category:**
- Avocado Toast
- Breakfast Burrito
- Caesar Salad
```

### 3. `pricing.md`
```markdown
# Pricing Strategy

## Pricing Tiers
- **Budget:** [$X - $Y]
- **Mid-range:** [$Y - $Z]
- **Premium:** [$Z+]

## Pricing by Category
| Category | Price Range | Average |
|----------|-------------|---------|
| Coffee | $3 - $6 | $4.50 |
| Food | $8 - $15 | $11 |
| Desserts | $4 - $8 | $6 |

## Pricing Strategy Notes
- [How prices are determined]
- [Competitive positioning]
- [Seasonal pricing]
- [Happy hour / specials]

## Discounts & Promotions
- **Student Discount:** [X%]
- **Loyalty Member:** [Benefits]
- **Happy Hour:** [Time and discount]
- **Combo Deals:** [Details]

## Currency & Display
- **Currency:** [USD, EUR, IDR, etc.]
- **Format:** [$X.XX, Rp XX.XXX]
- **Tax Included:** [Yes/No]
- **Service Charge:** [X% or None]
```

---

## How to Use

1. Keep menu items up-to-date as offerings change
2. Mark seasonal items clearly
3. Update prices immediately when they change
4. Note which items are bestsellers (for featuring on homepage)
5. Use this data to populate the database via scripts
