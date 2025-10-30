import 'server-only';

import { headers } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';

import {
  DEFAULT_TENANT,
  RESTAURANT_ID_HEADER,
  RESTAURANT_SLUG_HEADER,
  TENANT_GROUP_HEADER,
  getTenantBySlug,
} from '@/config/tenants';
import { createSupabaseServerClient } from '@/lib/supabase/service-role-client';

interface TenantContext {
  restaurantId: string;
  restaurantSlug: string;
  tenantGroup?: string;
}

interface WithTenantSupabaseOptions {
  restaurantId?: string;
  restaurantSlug?: string;
  tenantGroup?: string;
  useServiceRole?: boolean;
}

type SupabaseHandler<T> = (
  _client: SupabaseClient,
  _context: TenantContext,
) => Promise<T>;

async function resolveTenantContextFromHeaders(): Promise<TenantContext | null> {
  const hdrs = await headers();
  const restaurantId = hdrs.get(RESTAURANT_ID_HEADER) ?? undefined;
  const restaurantSlug = hdrs.get(RESTAURANT_SLUG_HEADER) ?? undefined;
  const tenantGroup = hdrs.get(TENANT_GROUP_HEADER) ?? undefined;

  if (!restaurantId && !restaurantSlug) {
    return null;
  }

  if (restaurantId && restaurantSlug) {
    return { restaurantId, restaurantSlug, tenantGroup: tenantGroup ?? undefined };
  }

  const fallbackTenant = getTenantBySlug(restaurantSlug ?? '') ?? DEFAULT_TENANT;
  return {
    restaurantId: restaurantId ?? fallbackTenant.restaurantId,
    restaurantSlug: restaurantSlug ?? fallbackTenant.restaurantSlug,
    tenantGroup: tenantGroup ?? fallbackTenant.pod,
  };
}

async function resolveTenantContext(options?: WithTenantSupabaseOptions): Promise<TenantContext> {
  if (options?.restaurantId && options.restaurantSlug) {
    return {
      restaurantId: options.restaurantId,
      restaurantSlug: options.restaurantSlug,
      tenantGroup: options.tenantGroup,
    };
  }

  const headerContext = await resolveTenantContextFromHeaders();
  if (headerContext) {
    return headerContext;
  }

  if (process.env.DEFAULT_RESTAURANT_ID && process.env.DEFAULT_RESTAURANT_SLUG) {
    return {
      restaurantId: process.env.DEFAULT_RESTAURANT_ID,
      restaurantSlug: process.env.DEFAULT_RESTAURANT_SLUG,
      tenantGroup: process.env.DEFAULT_TENANT_GROUP ?? undefined,
    };
  }

  return {
    restaurantId: DEFAULT_TENANT.restaurantId,
    restaurantSlug: DEFAULT_TENANT.restaurantSlug,
    tenantGroup: DEFAULT_TENANT.pod,
  };
}

async function primeTenantSession(client: SupabaseClient, restaurantId: string) {
  try {
    await client.rpc('set_config', {
      name: 'app.restaurant_id',
      value: restaurantId,
      is_local: true,
    });
  } catch (error) {
    console.warn(
      '[withTenantSupabase] Failed to set app.restaurant_id via RPC. Ensure the helper database function exists.',
      error,
    );
  }
}

export async function withTenantSupabase<T>(
  handler: SupabaseHandler<T>,
  options?: WithTenantSupabaseOptions,
): Promise<T> {
  const context = await resolveTenantContext(options);

  const headersForClient: Record<string, string> = {
    [RESTAURANT_ID_HEADER]: context.restaurantId,
    [RESTAURANT_SLUG_HEADER]: context.restaurantSlug,
  };
  if (context.tenantGroup) {
    headersForClient[TENANT_GROUP_HEADER] = context.tenantGroup;
  }

  const client = createSupabaseServerClient({
    useServiceRole: options?.useServiceRole ?? true,
    global: { headers: headersForClient },
    podId: context.tenantGroup,
  });

  await primeTenantSession(client, context.restaurantId);

  return handler(client, context);
}
