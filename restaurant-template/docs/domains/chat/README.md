# Chat Domain

**Status:** Scaffolding — customer-facing hero + quick replies sections ready; server utilities wired for Supabase macros.

## Purpose
Enable tenants to offer a conversational touch point: lightweight chat landing with canned replies today, with a path to AI/live support later.

## Current Structure
```
src/domains/customer-facing/chat/
├── sections/hero-section/   # Section scaffold (schema, registry, mocks, stories)
├── sections/quick-replies-section/  # Section scaffold for assistant macros grid
├── pages/                    # ChatPage (customer) & AdminChatPage (client-facing import)
├── server/                   # Supabase repositories (list/create/update macros)
├── shared/                   # Shared hooks/types/utils (currently placeholders)
├── feedback/                 # Notes & instrumentation backlog
└── index.ts                  # Public exports (ChatPage, HeroRenderer, QuickRepliesRenderer)
```

## Data & Integrations
- `listAssistantMacros` pulls from the `assistant_macro` table filtered by tenant.
- Sections accept typed content payloads (`hero-section/types/schema.ts`, `quick-replies-section/types/schema.ts`).
- Future integrations could hook into Supabase (for history), OpenAI/Anthropic (AI concierge), or WebSockets for live support.

## Backlog / Decisions Needed
- Decide near-term experience: embedded contact form vs. AI concierge vs. live chat.
- Populate `chat` entries inside `site_config.features` to drive hero copy/CTAs dynamically.
- Flesh out shared hooks/utils (currently `.gitkeep`) once analytics + tracking requirements land.

## References
- Code: `src/domains/customer-facing/chat/`
- UX inspiration: search v0.dev for “chat interface”, “customer support chat”, etc.
- Data schema: `docs/data-schema/orders_loyalty_chat.md`
