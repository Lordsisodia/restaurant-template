'use client';

import { lazy, Suspense } from 'react';

import { ErrorBoundary } from '@/domains/customer-facing/menu/shared/components/error-boundary';
import { MenuSkeleton, MenuError } from '@/domains/customer-facing/menu/shared/components/fallbacks';

// Lazy load the category sections menu page
const MenuPageCategorySections = lazy(() =>
  import('@/domains/customer-facing/menu/pages/MenuPageCategorySections').catch((error) => {
    globalThis.console?.error?.('[Menu Page] Failed to load menu component:', error);

    const handleRetry = () => {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    };

    return {
      default: () => (
        <MenuError
          error={error}
          message="Failed to load menu page. Please try refreshing."
          onRetry={handleRetry}
        />
      ),
    };
  }),
);

export function MenuPageShell() {
  return (
    <ErrorBoundary fallback={(error, reset) => <MenuError error={error} onRetry={reset} />}>
      <Suspense fallback={<MenuSkeleton />}>
        <MenuPageCategorySections />
      </Suspense>
    </ErrorBoundary>
  );
}
