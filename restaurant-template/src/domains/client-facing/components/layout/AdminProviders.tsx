'use client';

import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import type { ReactNode } from 'react';

import AppProviders from '@/providers/AppProviders';

export function AdminProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <ClerkLoading>
        <div className="grid min-h-screen place-items-center bg-background text-muted-foreground">
          Checking authentication…
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <AppProviders>{children}</AppProviders>
      </ClerkLoaded>
    </>
  );
}
