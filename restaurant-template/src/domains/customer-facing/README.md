# Customer-Facing Domains

This workspace groups every customer-facing experience that ships in the public app (marketing, storytelling, reviews, menu, blog, chat, etc.). Each domain follows the shared section architecture: composable section packages live under a `sections/` directory, page orchestrators live in `pages/`, and cross-cutting utilities sit in `shared/`.

## Directory Overview

- `about-us/` – full About page composition and section packages.
- `blog/` – tenant blog hero, listing, categories, post, and sidebar sections.
- `chat/` – customer chat hero and quick replies, plus assistant utilities.
- `landing/` – marketing landing page sections (hero, reviews, menu, map, specials, etc.).
- `loyalty/` – loyalty hero, membership showcase, tier highlights, and leaderboard sections.
- `menu/` – menu header, category browser, selector, item card, and detail sections.
- `reviews/` – customer reviews sections (feedback shell, ratings summary, grid, modal, etc.).
- `shared/` – utilities that are reused across multiple customer-facing domains (tokens, section tooling, tenant hooks).

## Conventions

- **Sections folder** – domain-specific sections live in `sections/<section-key>/` with schema, registry, templates, stories, and tests.
- **Page composition** – page components assemble typed section content and renderers; keep business logic in services/hooks.
- **Docs** – each domain maintains its own `README.md` plus supporting notes in `docs/domains/<domain>/`.
- **Imports** – prefer `@/domains/customer-facing/<domain>/sections/<section-key>` for renderers/types; shared helpers come from `@/domains/customer-facing/<domain>/shared`.

## Helpful References

- `docs/architecture/DOMAIN-DRIVEN-DESIGN.md` – overarching domain-driven structure.
- `docs/domains/*/README.md` – domain-specific background and requirements.
- `docs/template-system/*` – guidelines for building and integrating section templates.
