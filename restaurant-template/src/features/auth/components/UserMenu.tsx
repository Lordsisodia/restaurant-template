'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@siso/ui/primitives/buttons/shadcn-ui-button';
import type { User } from '@supabase/supabase-js';

/**
 * User Menu - Supabase Auth
 *
 * PLACEHOLDER - Replace with 21st.dev design
 */
export function UserMenu() {
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

    let isMounted = true;

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (isMounted) {
        setUser(user);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">
        {user.user_metadata?.full_name || user.email}
      </span>
      <Button onClick={handleSignOut} variant="ghost" size="sm">
        Sign Out
      </Button>
    </div>
  );
}
