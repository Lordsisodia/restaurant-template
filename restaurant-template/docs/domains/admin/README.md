# Admin Domain

**Status:** In progress – content management utilities live for menu/media upkeep; broader dashboard polish pending.

## Purpose
Give operators an authenticated workspace to upload media, seed data, and maintain restaurant content without touching code.

## Current Capabilities
- `gallery-uploader.tsx`, `menu-item-uploader.tsx`, `client-image-uploader.tsx` handle drag-and-drop media ingestion directly into Cloudinary/Supabase.
- `SeedDataButton.tsx` triggers Supabase seeding flows for demo content.
- Feedback log (`src/domains/admin/feedback/feedback.md`) tracks outstanding admin UX issues.

## Page & Component Structure
```
src/domains/admin/
├── components/                 # Uploaders, seed buttons, shared admin widgets
├── feedback/feedback.md        # Running feedback tracker
└── index.ts                    # Public exports used by admin routes
```
Admin routes live in `src/app/admin/*`, importing from this domain for consistent structure.

## Backlog / Next Steps
- Build a consolidated admin shell (navigation, layout) shared across CRUD sections.
- Add progress + error states to upload components (currently optimistic only).
- Document permissions and guardrails once multi-tenant auth is finalised.

## References
- UI guidelines: `docs/ux/mobile-qa-checklist.md` (admin sections still observe the same QA gate).
- Data sources: Supabase tables defined under `supabase/migrations/*` (see `docs/data-schema/`).
- Historical context: `docs/project-history/domains/` if we archive future iterations.
