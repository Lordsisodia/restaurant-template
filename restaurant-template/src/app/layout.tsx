import type { CSSProperties, ReactNode } from 'react';
import { headers } from 'next/headers';

import './globals.css';

import AppProviders from '@/providers/AppProviders';
import {
  DEFAULT_TENANT,
  resolveTenantByHost,
} from '@/config/tenants';
import { loadTenantRuntime } from '@/lib/config/site';
import { getThemeCssVariables } from '@/providers/theme-css';

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const headerList = await headers();
  const host = headerList.get('host');
  const tenantRecord = resolveTenantByHost(host) ?? DEFAULT_TENANT;
  const runtime = await loadTenantRuntime(tenantRecord);

  const tenantContext = {
    restaurantId: tenantRecord.restaurantId,
    restaurantSlug: tenantRecord.restaurantSlug,
    tenantGroup: tenantRecord.pod,
    displayName: tenantRecord.displayName,
    theme: runtime.themeTokens,
    siteConfig: runtime.siteConfig,
  } as const;

  const themeStyle = getThemeCssVariables(tenantContext.theme) as CSSProperties;

  return (
    <html lang="en" style={themeStyle}>
      <body className="min-h-screen bg-background antialiased overflow-x-hidden">
        <AppProviders tenant={tenantContext}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
