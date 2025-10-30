import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * OAuth Callback Handler
 *
 * This handles the redirect from Google after user signs in
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();

    // Exchange code for session
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to dashboard after successful sign-in
  return NextResponse.redirect(`${origin}/dashboard`);
}
