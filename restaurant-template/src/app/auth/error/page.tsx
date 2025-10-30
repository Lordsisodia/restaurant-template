import Link from 'next/link';
import { Button } from '@siso/ui/primitives/buttons/shadcn-ui-button';

/**
 * Auth Error Page
 * Shown when authentication fails
 */
export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border p-8 text-center shadow-sm">
        <div className="text-6xl">⚠️</div>
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p className="text-muted-foreground">
          Something went wrong during sign in. Please try again.
        </p>
        <Button asChild className="w-full">
          <Link href="/auth/signin">Try Again</Link>
        </Button>
      </div>
    </div>
  );
}
