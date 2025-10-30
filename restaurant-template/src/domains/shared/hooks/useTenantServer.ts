import { headers } from 'next/headers';

import { DEFAULT_TENANT, resolveTenantByHost } from '@/config/tenants';

export async function getTenantFromRequest() {
  const headerList = await headers();
  const host = headerList.get('host');
  return resolveTenantByHost(host) ?? DEFAULT_TENANT;
}
