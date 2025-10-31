# AI Concierge Plan

**Status:** Draft — proposes the structured-output assistant that powers menu discovery on the customer chat page.

## Objective
- Help guests find dishes, drinks, and experiences faster than scanning the full menu.
- Capture intent signals we can reuse for marketing (e.g., specials, dietary needs).
- Keep the surface aligned with existing Draco branding and the `AiAssistantCard` experience.

## Current Surface (Oct 31, 2025)
- Entry point: `src/app/(public)/chat/page.tsx` renders `AiAssistantCard` with canned suggestions.
- Domain assets: `src/domains/customer-facing/chat/` (hero + quick replies sections, Supabase macro repository stubs).
- Menu data lives under `src/domains/customer-facing/menu/shared/` (static seed + repository utilities).
- No persistence yet for conversations or assistant feedback.

## Target Experience
1. User lands on the chat page and sees tailored suggestions (specials, dietary filters, visit planning).
2. User sends a message; the assistant replies conversationally and returns structured recommendations.
3. Buttons in the reply deep-link to the correct menu category or item detail (e.g., `/menu?item=espresso-tonic`).
4. Subsequent turns refine the recommendations; the assistant maintains context per session.

## Architecture Overview
### Frontend
- Promote `AiAssistantCard` to a fully controlled component:
  - Wire `suggestions` to quick actions that immediately call the assistant.
  - Render message history from a React query/`useChatTranscript` hook (new `shared/hooks` home).
  - Map structured recommendations to `QuickRepliesSection` cards and inline CTA buttons.
- Add optimistic UI: append the user message locally; stream assistant tokens or show a skeleton state.
- Build a lightweight client-side router helper that reads `actions` from structured output and triggers:
  - `router.push` to `/menu` routes.
  - `scrollTo` anchors for sections already on the page.

### Server / API
- Create `src/domains/customer-facing/chat/server/submit-message.ts` exposed via a Next.js Server Action + Route Handler (`POST /api/chat`).
- Responsibilities:
  1. Enrich the request with tenant + menu context (`withTenantSupabase`, `menu.repository` lookup).
  2. Fetch relevant macros (`listAssistantMacros`) and recent transcript rows (new persistence tables).
  3. Call the model provider with structured-output instructions.
  4. Validate the JSON envelope (Zod) and coerce to domain types.
  5. Persist the turn (user + assistant) to Supabase for analytics/re-engagement.

### Data / Persistence
- New tables (Supabase migrations):
  - `assistant_session` (`id`, `restaurant_id`, `tenant_visitor_id`, `status`, `created_at`, `updated_at`).
  - `assistant_message` (`id`, `session_id`, `role`, `content`, `structured_payload`, `created_at`).
- Amplify `assistant_macro` usage by seeding menu-specific macros (e.g., “Recommend vegetarian brunch”).
- Optional: cache menu embeddings or attributes in `assistant_menu_item` for faster semantic matching.

### Model Layer
- Provider: OpenAI Responses API (or Anthropic Messages) with JSON mode.
- System prompt recipe:
  - Persona: Draco concierge with deep menu knowledge.
  - Directives: always return JSON matching schema, include at least one actionable CTA when possible.
  - Provide menu catalogue + specials as contextual documents (chunked).
- Retry / guard rails:
  - If JSON parse fails, request a regeneration with higher temperature control.
  - Clamp `actions` to known safe routes.

## Structured Output Contract
```ts
type AssistantAction = {
  type: 'navigate' | 'open_url' | 'suggest_reservation';
  target: string; // e.g., "/menu?item=espresso-tonic"
  label: string;  // CTA copy shown on the button
  reason?: string;
};

type MenuRecommendation = {
  menuItemId: string;     // Aligns with MenuItem.id or slug
  name: string;
  shortDescription: string;
  why: string;            // Personalized justification
  url: string;            // Absolute or relative deep link
  tags?: string[];        // ["vegetarian", "light"]
  upsell?: string;        // Optional pairing or add-on
};

type AssistantResponse = {
  reply: string;                   // Human-readable answer
  recommendations?: MenuRecommendation[];
  actions?: AssistantAction[];
  followUpQuestions?: string[];
  metadata?: {
    confidence?: number;           // 0-1 score to flag weak answers
    dietaryFlags?: string[];       // ["vegan", "nut-free"]
    specialsMentioned?: string[];  // track promotions surfaced
  };
};
```

> Validation: use Zod on the server (`chat/shared/types/assistant.ts`) and fail closed (fallback copy + default CTA) when invalid.

## Conversation Flow
1. **Client** sends `{ sessionId, message, suggestionId? }` to `/api/chat`.
2. **Server** gathers context: tenant, macros, last N messages, menu catalogue slice (category hits, dietary filters).
3. **Model** returns JSON `AssistantResponse`.
4. **Server** hydrates DB rows and returns the structured payload to the client.
5. **Client** updates the transcript and renders CTA buttons; button clicks invoke `actions`.

## Phased Delivery
1. **Phase 0 – UX polish**
   - Hook quick-reply chips to prefilled form submissions.
   - Stubbed responses using hard-coded recommendations.
2. **Phase 1 – Structured assistant MVP**
   - Implement server action, structured schema, and Supabase persistence.
   - Surface recommendations + CTAs in the UI.
3. **Phase 2 – Personalization**
   - Use loyalty profile + visit history to bias recommendations.
   - Introduce seasonal menu highlights via macros.
4. **Phase 3 – Automation & analytics**
   - Trigger reservation/contact workflows on `suggest_reservation`.
   - Dashboard for assistant performance (conversion to menu clicks, dietary intent).

## Open Questions
- Do we require streaming responses, or is turn-based fine for launch?
- Source of truth for menu URLs (static routes vs. dynamic slug lookup)?
- How should we tie anonymous sessions to loyalty when a user signs in mid-chat?
- Confirm compliance/PII handling if we capture contact info inside chat.

## Next Steps
- Draft Supabase migration for `assistant_session` + `assistant_message`.
- Define `chat/shared/types/assistant.ts` Zod schema mirroring the contract above.
- Spike server action with mocked provider response to validate end-to-end wiring.
- Sync with UX on CTA placement inside `AiAssistantCard` and quick replies.

