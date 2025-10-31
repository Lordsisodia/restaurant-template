'use client';

import { Suspense, lazy } from 'react';

import { ErrorBoundary } from '@/domains/customer-facing/menu/shared/components/error-boundary';
import { MenuSkeleton, MenuError } from '@/domains/customer-facing/menu/shared/components/fallbacks';

const MenuCategoriesPage = lazy(() =>
  import('@/domains/customer-facing/menu/pages/MenuCategoriesPage').catch((error) => {
    globalThis.console?.error?.('[Menu Categories] Failed to load menu categories page:', error);

    const handleRetry = () => {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    };

    return {
      default: () => (
        <MenuError
          error={error}
          message="Failed to load menu categories. Please try refreshing."
          onRetry={handleRetry}
        />
      ),
    };
  }),
);

export function MenuCategoriesPageShell() {
  return (
    <ErrorBoundary fallback={(error, reset) => <MenuError error={error} onRetry={reset} />}>
      <Suspense fallback={<MenuSkeleton />}>
        <MenuCategoriesPage />
      </Suspense>
    </ErrorBoundary>
  );
}
