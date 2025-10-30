import podsFile from './pods.json';

export type PodTenantStatus = 'active' | 'reserved' | 'pending';

export interface PodTenantConfig {
  restaurantId: string;
  slug: string;
  displayName: string;
  domains: string[];
  locales: {
    default: string;
    available: string[];
  };
  status: PodTenantStatus;
  notes?: string;
}

export interface PodSupabaseConfig {
  projectRef: string;
  region: string;
  urlEnv: string;
  anonKeyEnv: string;
  serviceRoleKeyEnv: string;
  databasePasswordEnv?: string;
}

export interface PodClerkConfig {
  publishableKeyEnv: string;
  secretKeyEnv: string;
}

export interface PodVercelConfig {
  projectNamePrefix: string;
  envGroup?: string;
}

export interface PodConfig {
  id: string;
  label: string;
  description?: string;
  maxTenants: number;
  supabase: PodSupabaseConfig;
  clerk: PodClerkConfig;
  vercel?: PodVercelConfig;
  tenants: PodTenantConfig[];
}

interface PodsJsonSchema {
  pods: PodConfig[];
}

const podsData = podsFile as PodsJsonSchema;

export const PODS: PodConfig[] = podsData.pods;

export function getPodById(podId: string): PodConfig | undefined {
  return PODS.find((pod) => pod.id === podId);
}

export function getTenantFromPod(
  podId: string,
  slug: string,
): PodTenantConfig | undefined {
  const pod = getPodById(podId);
  return pod?.tenants.find((tenant) => tenant.slug === slug);
}

export function listAllTenants(): PodTenantConfig[] {
  return PODS.flatMap((pod) => pod.tenants);
}
