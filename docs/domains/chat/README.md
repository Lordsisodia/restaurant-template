# Chat Domain

**Status:** MVP — WhatsApp-first concierge with reusable assistant macros.

## Purpose
Offer a conversational entry point for guests while giving staff reusable AI/live chat macros. Provides a public chat landing page and admin assistant console backed by Supabase.

## Current Structure
```
restaurant-template/src/domains/customer-facing/chat/
├── sections/hero-section/          # Assistant hero renderer (variants + schema)
├── sections/quick-replies-section/ # Assistant macros grid
├── pages/                          # Customer ChatPage + AdminChatAssistantPage
├── server/assistant.repository.ts  # Supabase access to assistant_macro
├── shared/                         # (Placeholder) shared hooks/types/utils
└── index.ts                        # Public exports (ChatPage, HeroRenderer, QuickRepliesRenderer)
```

## Data & Integrations
- Supabase table `assistant_macro` stores quick replies/prompts (see `docs/data-schema/orders_loyalty_chat.md`).
- Public `/chat` route consumes macros and exposes WhatsApp + contact CTAs via the hero + quick replies sections.
- Admin `/admin/chat-assistant` page lists macros with create/update/delete hooks (requires Supabase-authenticated session).

## Backlog / Decisions Needed
- Persist real-time conversations once `chat_thread` schema lands.
- Add channel routing (WhatsApp, web widget, email) and per-tenant contact numbers.
- Evaluate AI completion provider for macros (Anthropic/OpenAI) and logging policies.

## References
- Code: `restaurant-template/src/domains/customer-facing/chat/`
- Data schema: `docs/data-schema/orders_loyalty_chat.md`
- Research: `docs/research/user-needs-by-page.md`
