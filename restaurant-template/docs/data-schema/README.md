# Data Schema Overview

Supabase tables, relationships, and how each domain uses them. Use this folder when you need to modify data, add columns, or understand where a domain pulls its information.

- `tenancy.md` – tenant groups, restaurants, site configuration.
- `menu.md` – categories, items, modifiers, availability, specials.
- `orders_loyalty_chat.md` – orders, loyalty members, assistant macros (chat).
- `reviews.md` – reviews plus photos/responses/translations (expanded schema).
- `blog.md` – blog posts, tags, post-tag mapping.
- `reservations.md` – reservations and waitlist tables.
- `gift-cards.md` – gift card issuance and transactions.
- `leads.md` – lead capture forms and activities.

Each file lists the tables, key columns, foreign keys, and which domain/actions consume them.
