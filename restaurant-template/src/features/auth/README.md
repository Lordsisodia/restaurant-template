# Auth Feature Overview

This directory wraps the shared **Supabase Auth** surface area so pages and domains don’t have to handle client creation or session bookkeeping on their own.

## What lives here today
- `hooks/useAuth.ts` – client hook that exposes the current Supabase user, loading state, and a `signOut` helper. It is used by shared layout components like the tenant header (`src/domains/shared/components/TenantHeader.tsx:83`).
- `components/SignInButton.tsx` – temporary Google OAuth trigger that calls `supabase.auth.signInWithOAuth`. Replace it with the final 21st.dev design when ready.
- `components/UserMenu.tsx` – simple signed-in state with a “Sign Out” button wired to `supabase.auth.signOut()`.

## Responsibilities
1. Provide reusable UI/logic for logging in with Supabase (Google OAuth, email/password, etc.).
2. Keep Supabase session state in one place so domain components can stay dumb.
3. Document the available auth utilities so future contributors know where to plug in.

## Folder quick reference
| Subdirectory | Contents |
| ------------ | -------- |
| `components/` | Placeholder auth controls (`SignInButton`, `UserMenu`). Swap them out once the production designs are ready. |
| `hooks/` | `useAuth` hook that powers shared navigation. |

If additional helpers are needed (e.g., profile fetchers, admin role checks), add new files alongside these and update this README.

## Next Improvements
- Replace the placeholder components with the final UI.
- Add tests (or Storybook stories) to validate Google OAuth and sign-out flows.
- If the app introduces server-only auth actions, consider adding a `server/` or `actions/` folder with thin wrappers that call Supabase using the service-role key.

---

**Questions?** Keep this README current so the folder remains the obvious home for auth-related code.
