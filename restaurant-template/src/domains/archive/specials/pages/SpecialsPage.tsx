/**
 * Customer-Facing Specials Page
 */

import { getSpecials } from '@/domains/archive/specials/server';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';
import { loadTenantRuntime } from '@/lib/config/site';
import { SpecialsHost, type SpecialsVariant } from '../templates/SpecialsHost';

export const revalidate = 60;

export default async function SpecialsPage() {
  const tenant = await getTenantFromRequest();
  const runtime = await loadTenantRuntime(tenant);
  const specials = await getSpecials();

  const specialsConfig = (runtime.siteConfig?.features?.specials as Record<string, any>) ?? {};
  const variant = (specialsConfig.variant as SpecialsVariant) || 'template-1';

  return (
    <SpecialsHost
      variant={variant}
      specials={specials}
      tenant={{
        displayName: tenant.displayName,
        slug: tenant.slug,
      }}
    />
  );
}
