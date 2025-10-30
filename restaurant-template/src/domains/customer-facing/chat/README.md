# Chat Domain - Template Architecture

## 🏗️ Structure

```
src/domains/customer-facing/chat/
├── sections/
│   ├── hero-section/        # Chat hero renderers + schema
│   └── quick-replies-section/ # Quick reply gallery (registry + templates)
├── pages/
│   ├── ChatPage.tsx         # Customer chat interface
│   └── AdminChatPage.tsx    # Admin chat assistant ✅
├── server/                  # Supabase/assistant macros utilities
├── shared/                  # Shared components, types, helpers
├── feedback/                # Tracking + qualitative notes
└── index.ts                 # Public export surface
```

> Legacy template notes retained below for reference while the new section scaffold rolls out fully.

## 🎨 Template Props Interface

```typescript
interface ChatTemplateProps {
  tenant: Tenant;
  initialMessages?: Message[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
```

## 🤖 Chat Integration Options

### Option 1: Simple Contact Form
- Convert chat page to "quick contact" form
- No real-time chat needed

### Option 2: AI Chatbot (Future)
- Integrate OpenAI/Anthropic
- Order assistance
- Menu recommendations
- Reservation booking

### Option 3: Live Support (Future)
- WebSocket integration
- Admin dashboard for live chat
- Typing indicators

## 🎨 v0.dev Template Ideas

Search for:
- "Chat interface"
- "Customer support chat"
- "Messaging UI"
- "Chatbot interface"

---

**Status:** Scaffolding Ready - May convert to contact form or import chat UI
