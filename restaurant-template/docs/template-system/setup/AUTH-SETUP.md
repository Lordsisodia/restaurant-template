# Authentication Setup (Supabase + Google OAuth)

**Goal:** Enable Google sign-in and Supabase-authenticated sessions for every tenant in the restaurant template.

## Overview
- **Providers:** Supabase Auth with Google OAuth, optional email/password.
- **UI:** Glassmorphic sign-in and sign-up pages (+ reusable components) already checked into the template.
- **Reuse:** One Google OAuth project can serve all your Supabase instances; keep the credentials safe.

## Prerequisites
- Google Cloud project access.
- Supabase project for the tenant (`ntrklmkzyfnrtfbpdypd` in Draco example).
- Local `.env.local` ready to accept new keys.

## Step-by-Step

### 1. Configure Google OAuth (one-time)
1. Visit the [Google Cloud Console](https://console.cloud.google.com) and create/select a project (e.g., `SISO-SaaS-Platform`).
2. Enable OAuth consent screen (External) and add your email under **Test users** while in testing mode.
3. Create OAuth credentials:
   - APIs & Services → Credentials → **Create credentials → OAuth client ID**
   - Application type: **Web application**
   - Redirect URIs:
     ```
     http://localhost:3000/auth/callback
     https://<your-supabase-ref>.supabase.co/auth/v1/callback
     ```
   - Copy the **Client ID** and **Client Secret** for later steps.

### 2. Enable Provider in Supabase (per project)
1. Open the [Supabase dashboard](https://supabase.com/dashboard) and select your project.
2. Go to **Authentication → Providers → Google**.
3. Toggle Google to **ON** and paste the Client ID & Secret from Google Cloud.
4. (Optional) Adjust Email provider settings (e.g., disable email confirmations in dev).

### 3. Verify Template Integration
The template already includes all required files:
```
src/lib/supabase/{client.ts, server.ts, middleware.ts}
src/features/auth/components/{SignInButton.tsx, UserMenu.tsx}
src/features/auth/hooks/useAuth.ts
src/app/auth/{signin/page.tsx, signup/page.tsx, callback/route.ts}
src/middleware.ts
```
No additional wiring is needed unless you customise the UI.

### 4. Populate Environment Variables
Add the following to `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_GOOGLE_CLIENT_ID=<client-id>.apps.googleusercontent.com
SUPABASE_GOOGLE_CLIENT_SECRET=<client-secret>
```
(Existing Supabase keys may already be present from earlier setup.)

### 5. Test the Flow
1. Run the app: `npm run dev`.
2. Visit `http://localhost:3000/auth/signin` and click **Continue with Google**.
3. Sign in with a test user listed on the OAuth consent screen.
4. Confirm you land on the dashboard and see your profile menu.

## UI Notes
- Sign-in/sign-up forms live in `src/components/ui/modern-stunning-sign-in.tsx` and `modern-stunning-sign-up.tsx`.
- Header actions (`SignInButton`, `UserMenu`) sit under `src/features/auth/components/` for easy reuse across domains.

## Troubleshooting
- **Redirect mismatch:** Ensure the Supabase callback URL exactly matches the Google redirect URI.
- **Test user blocked:** Add your email to the OAuth consent screen’s **Test users** list.
- **Session issues:** Confirm `src/middleware.ts` is deployed and that `SUPABASE_SERVICE_ROLE_KEY` is present locally.

## History
The detailed narrative setup guides now live in `docs/project-history/template-system/setup/2025-10-21-auth/` if you need the original step-by-step story.
