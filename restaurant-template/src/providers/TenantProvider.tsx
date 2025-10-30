'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';

import { defaultThemeTokens } from '@/config/theme-tokens';

export type ThemeTokens = typeof defaultThemeTokens;

export interface TenantContextValue {
  restaurantId: string;
  restaurantSlug: string;
  tenantGroup?: string;
  displayName: string;
  theme: ThemeTokens;
  siteConfig?: Record<string, unknown> | null;
}

const defaultTenantContext: TenantContextValue = {
  restaurantId: '00000000-0000-0000-0000-000000000000',
  restaurantSlug: 'default-tenant',
  tenantGroup: undefined,
  displayName: 'Demo Restaurant',
  theme: defaultThemeTokens,
  siteConfig: null,
};

const TenantContext = createContext<TenantContextValue>(defaultTenantContext);

interface TenantProviderProps {
  value?: TenantContextValue;
  children: ReactNode;
}

export function TenantProvider({ value, children }: TenantProviderProps) {
  const contextValue = useMemo(() => value ?? defaultTenantContext, [value]);
  return <TenantContext.Provider value={contextValue}>{children}</TenantContext.Provider>;
}

export function useTenant() {
  return useContext(TenantContext);
}

export { defaultTenantContext };
