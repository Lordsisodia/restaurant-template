# Chatbot Implementation Notes

**Status:** Draft — checklist for wiring the AI concierge into the public chat page (Oct 31, 2025).

## Key Surfaces
- `src/app/(public)/chat/page.tsx`: entry point; currently renders `AiAssistantCard` with static props.
- `src/components/ui/ai-assistant-card.tsx`: reusable shell we will convert into a controlled chat surface.
- `src/domains/customer-facing/chat/server/assistant.repository.ts`: existing Supabase helper for macros.
- `src/domains/customer-facing/menu/shared/`: menu catalogue + helpers that feed recommendations.

## Build Checklist
1. **Types & Schema**
   - Add `chat/shared/types/assistant.ts` exporting Zod schemas for `AssistantResponse`, `AssistantAction`, and `MenuRecommendation` (see domain plan).
   - Expose a TypeScript `AssistantTurn` type that merges plain text + structured payload for the UI.
2. **Server Action**
   - Create `chat/server/submit-message.ts` with a `submitChatMessage` server action.
   - Accept `{ sessionId, message, suggestionId }`; derive tenant via `getTenantFromRequest`.
   - Load last 10 turns from Supabase (`assistant_session`, `assistant_message`) before calling the model.
   - Use the structured-output schema to validate responses; on failure return a safe fallback reply.
3. **Routing**
   - Add `src/app/api/chat/route.ts` calling `submitChatMessage`.
   - Return `{ turn, sessionId }` so the client can update local state.
4. **Client Hook**
   - Implement `chat/shared/hooks/useChatTranscript.ts` that wraps React Query/SWR:
     - `sendMessage` posts to `/api/chat`.
     - Manages optimistic updates, loading states, and error recovery.
     - Persists `sessionId` in `localStorage` to continue conversations.
5. **UI Wiring**
   - Update `chat/pages/ChatPage.tsx` to use the new hook:
     - Pass `messages`, `onSend`, `isLoading` into `AiAssistantCard`.
     - Convert quick-reply badges into buttons that call `sendMessage({ suggestionId })`.
   - Extend `AiAssistantCard` props:
     - Accept `messages: AssistantTurn[]`.
     - Render assistant recommendations as CTA pills (use `actions` array).
     - Display follow-up questions as inline buttons below each assistant reply.
6. **Menu Deep Linking**
   - Create helper `mapActionToHref(action, menuCatalog)` that translates `menuItemId` to `/menu` query params.
   - Reuse `menu/shared/utils/enrich-menu-items.ts` to fetch metadata (price, dietary flags).
   - Add unit tests covering vegetarian/gluten-free linking logic.
7. **Analytics & Feedback (Optional Phase 2)**
   - On button clicks, emit analytics events via existing tracking pipeline (see `chat/feedback/` backlog).
   - Store `structured_payload` JSON alongside the assistant message for later analysis.

## Structured Payload Rendering
- Each assistant turn renders:
  - **Reply body**: markdown-safe text, convert to paragraphs.
  - **Recommendations list**: display up to 3 cards with name, short description, and `View item` button.
  - **Actions**: map to ShadCN buttons — `navigate` → `router.push`, `open_url` → `window.open`.
- Guard rails: hide CTA buttons when `target` is unknown; log to console in development.

## Testing Strategy
- **Unit**: schema validation + `mapActionToHref`.
- **Integration**: mock fetch in `ChatPage` to ensure optimistic updates render.
- **Playwright** (optional): cover quick-reply chip → assistant response → CTA navigation.

## Outstanding Questions
- Confirm whether we stream responses (would require SSE or incremental renders in `AiAssistantCard`).
- Determine fallback behavior when Supabase is unavailable (cached static recommendations?).
- Align on SLA for response time — may dictate provider/model selection.

