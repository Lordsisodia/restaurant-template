'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

/**
 * useAuth Hook
 *
 * Custom hook for accessing current user and auth state
 */
export function useAuth() {
  const hasEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const supabase = useMemo(() => (hasEnv ? createClient() : null), [hasEnv]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(supabase));

  useEffect(() => {
    if (!supabase) {
      return;
    }

    // Get initial user
    let isMounted = true;

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (isMounted) {
        setUser(user);
        setLoading(false);
      }
    });

    // Listen for auth changes
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    }).data.subscription;

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signOut,
  };
}
