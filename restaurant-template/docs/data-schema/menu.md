# Supabase Schema – Menu Domain

Tables supporting the menu experience: categories, items, modifiers, availability windows, specials.

## Tables

### `category`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK → restaurants(id) |
| name | text |
| slug | text |
| position | integer | Display order |
| visible | boolean |
| unique(restaurant_id, slug) | constraint |

### `item`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK → restaurants(id) |
| category_id | uuid FK → category(id) (nullable, set null on delete) |
| name / slug | text |
| description | text |
| price | integer | stored in cents |
| active | boolean |
| image_url | text |
| created_at / updated_at | timestamptz + trigger |
| unique(restaurant_id, category_id, slug) | constraint |

### `variant`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK → restaurants(id) |
| item_id | uuid FK → item(id) (cascade delete) |
| name | text |
| price_delta | integer | cents delta |

### `modifier_group`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK → restaurants(id) |
| name | text |
| min / max | integer | selection rules |
| required | boolean |

### `item_modifier_group`
Junction table linking items to modifier groups.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK |
| item_id | uuid FK → item |
| group_id | uuid FK → modifier_group |
| unique (restaurant_id, item_id, group_id) |

### `modifier`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK |
| group_id | uuid FK → modifier_group |
| name | text |
| price_delta | integer |

### `allergen_tag` & `item_allergen`
- `allergen_tag`: defines allergen codes/labels per restaurant.
- `item_allergen`: junction table linking items ↔ allergen tags.

### `availability_window`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK |
| scope | text | `'item'` or `'category'` |
| target_id | uuid | references item/category logically |
| days_of_week | smallint[] |
| start_time / end_time | time |
| start_date / end_date | date (optional) |

### `special`
| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |
| restaurant_id | uuid FK |
| scope | text | `'item'` or `'category'` |
| target_id | uuid | links to item/category |
| type | text | `'percent'`, `'fixed'`, `'bogo'` |
| value | integer | discount value |
| days_of_week | smallint[] |
| start/end time/date | columns |

## Relationships
- Almost every table has `restaurant_id` referencing `restaurants(id)` (cascade delete ensures full menu removal per tenant).
- `item` → `category`; `variant` → `item`; `modifier` → `modifier_group`; `item_modifier_group` ties `item` & `modifier_group`.
- Availability and specials reference items/categories by id + scope.

## Used by
- `src/domains/customer-facing/menu/actions.ts` fetches categories/items/variants; `src/domains/customer-facing/menu/components/*` present them.
- Future ordering/cart flows will expand on `variant`, `modifier`, and `special` data.
