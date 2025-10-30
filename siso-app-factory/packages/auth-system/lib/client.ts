import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase Client for Client Components
 *
 * Use this in 'use client' components for auth and data fetching
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
