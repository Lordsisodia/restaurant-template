'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@siso/ui/primitives/buttons/shadcn-ui-button';

/**
 * Sign In Button - Supabase Auth
 *
 * PLACEHOLDER - Replace with 21st.dev design
 */
export function SignInButton() {
  const supabase = createClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={handleSignIn} variant="default" size="sm">
      Sign in with Google
    </Button>
  );
}
