'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  TenantProvider,
  defaultTenantContext,
  type TenantContextValue,
} from '@/providers/TenantProvider';
import { getThemeCssVariables } from '@/providers/theme-css';

interface AppProvidersProps {
  children: ReactNode;
  tenant?: TenantContextValue;
}

export default function AppProviders({ children, tenant }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Don't refetch on window focus to reduce unnecessary requests
            refetchOnWindowFocus: false,

            // Smart retry logic: retry network/server errors, not client errors
            retry: (failureCount, error: any) => {
              // Don't retry on 4xx errors (client errors - bad request, not found, etc.)
              if (error?.status >= 400 && error?.status < 500) {
                return false;
              }
              // Retry up to 3 times for network/5xx errors
              return failureCount < 3;
            },

            // Cache data for 5 minutes before considering it stale
            staleTime: 5 * 60 * 1000, // 5 minutes

            // Only throw to error boundary on critical server errors (5xx)
            // Most errors should be handled inline at the component level
            useErrorBoundary: (error: any) => {
              // Only throw to error boundary for server errors (5xx)
              return error?.status >= 500;
            },

            // Default error handler for logging
            onError: (error: any) => {
              console.error('[React Query] Query error:', error);
              // TODO: Log to error monitoring service (Sentry, etc.)
            },
          },
          mutations: {
            // Retry mutations once (they might be idempotent)
            retry: 1,

            // Critical mutations should bubble up to error boundaries
            useErrorBoundary: true,

            // Log mutation errors
            onError: (error: any) => {
              console.error('[React Query] Mutation error:', error);
              // TODO: Log to error monitoring service (Sentry, etc.)
            },
          },
        },
      }),
  );

  const tenantValue = useMemo(() => tenant ?? defaultTenantContext, [tenant]);

  const themeVariables = useMemo(() => getThemeCssVariables(tenantValue.theme), [tenantValue]);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themeVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    return () => {
      Object.keys(themeVariables).forEach((key) => {
        root.style.removeProperty(key);
      });
    };
  }, [themeVariables]);

  return (
    <TenantProvider value={tenantValue}>
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === 'development' ? (
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        ) : null}
      </QueryClientProvider>
    </TenantProvider>
  );
}
