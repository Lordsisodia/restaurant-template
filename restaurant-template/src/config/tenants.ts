import { PODS, type PodTenantConfig } from './pods';

export interface TenantRecord {
  restaurantId: string;
  restaurantSlug: string;
  displayName: string;
  pod: string;
  domains: string[];
  locales: {
    default: string;
    available: string[];
  };
  status?: PodTenantConfig['status'];
  notes?: string;
  siteConfig?: {
    enabled_pages?: string[];
    features?: Record<string, unknown>;
    page_story?: Array<{ title: string; content: string }>;
    [key: string]: unknown;
  };
}

const tenants: TenantRecord[] = PODS.flatMap((pod) =>
  pod.tenants.map((tenant) => ({
    restaurantId: tenant.restaurantId,
    restaurantSlug: tenant.slug,
    displayName: tenant.displayName,
    pod: pod.id,
    domains: tenant.domains,
    locales: tenant.locales,
    status: tenant.status,
    notes: tenant.notes,
    siteConfig: tenant.siteConfig,
  })),
);

const domainMap = new Map<string, TenantRecord>();
const slugMap = new Map<string, TenantRecord>();

tenants.forEach((tenant) => {
  slugMap.set(tenant.restaurantSlug, tenant);
  tenant.domains.forEach((domain) => {
    domainMap.set(domain.toLowerCase(), tenant);
  });
});

function normalizeHost(host: string | null | undefined): string {
  if (!host) return '';
  return host.split(':')[0]?.trim().toLowerCase() ?? '';
}

export function resolveTenantByHost(host: string | null | undefined): TenantRecord | null {
  const normalized = normalizeHost(host);
  if (!normalized) return null;

  const direct = domainMap.get(normalized);
  if (direct) return direct;

  if (normalized.endsWith('.localhost')) {
    const slug = normalized.replace('.localhost', '');
    return slugMap.get(slug) ?? null;
  }

  return slugMap.get(normalized) ?? null;
}

export function getTenantBySlug(slug: string | null | undefined): TenantRecord | null {
  if (!slug) return null;
  return slugMap.get(slug) ?? null;
}

export const TENANTS = tenants;
export const DEFAULT_TENANT = tenants[0];

export const RESTAURANT_ID_HEADER = 'x-restaurant-id';
export const RESTAURANT_SLUG_HEADER = 'x-restaurant-slug';
export const TENANT_GROUP_HEADER = 'x-tenant-group';
