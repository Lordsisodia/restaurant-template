'use client';

import Link from 'next/link';

import { SidebarTrigger } from '@siso/ui/primitives/sidebars/shadcn-ui-sidebar';

import { SignInButton } from '@/features/auth/components/SignInButton';
import { UserMenu } from '@/features/auth/components/UserMenu';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useTenant } from '@/providers/TenantProvider';

export function AdminTopbar() {
  const tenant = useTenant();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="leading-tight">
          <Link href="/admin" className="text-sm font-semibold text-foreground sm:text-base">
            {tenant.displayName} Admin
          </Link>
          <p className="text-xs text-muted-foreground/80">
            Manage menu, orders, loyalty, and customer experiences.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {isAuthenticated ? <UserMenu /> : <SignInButton />}
      </div>
    </header>
  );
}
