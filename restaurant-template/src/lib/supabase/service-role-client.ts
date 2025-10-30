import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { getPodById } from '@/config/pods';

type Database = Record<string, unknown>;

interface ServerClientOptions {
  useServiceRole?: boolean;
  accessToken?: string;
  global?: {
    headers?: Record<string, string>;
  };
  podId?: string;
}

export function createSupabaseServerClient(
  options: ServerClientOptions = {},
): SupabaseClient<Database> {
  const { url, anonKey, serviceRoleKey } = resolveSupabaseEnvForPod(options.podId);

  let key: string | undefined;
  if (options.useServiceRole ?? true) {
    key = serviceRoleKey || anonKey;
  } else if (options.accessToken) {
    key = options.accessToken;
  } else {
    key = anonKey;
  }

  if (!url || !key) {
    throw new Error('Supabase environment not configured. Check your .env files and tenant pod settings.');
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: options.global?.headers,
    },
  });
}

function resolveSupabaseEnvForPod(podId?: string): {
  url?: string;
  anonKey?: string;
  serviceRoleKey?: string;
} {
  if (podId) {
    const pod = getPodById(podId);
    if (pod?.supabase) {
      const url = process.env[pod.supabase.urlEnv];
      const anonKey = process.env[pod.supabase.anonKeyEnv];
      const serviceRoleKey = process.env[pod.supabase.serviceRoleKeyEnv];
      if (url && (anonKey || serviceRoleKey)) {
        return { url, anonKey, serviceRoleKey };
      }
    }

    const suffix = toEnvSuffix(podId);
    const url = process.env[`SUPABASE_URL_${suffix}`];
    const anonKey =
      process.env[`SUPABASE_ANON_KEY_${suffix}`] ||
      process.env[`NEXT_PUBLIC_SUPABASE_ANON_KEY_${suffix}`];
    const serviceRoleKey = process.env[`SUPABASE_SERVICE_ROLE_KEY_${suffix}`];
    if (url && (anonKey || serviceRoleKey)) {
      return { url, anonKey, serviceRoleKey };
    }
  }

  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

function toEnvSuffix(id: string): string {
  return id
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/(^_+|_+$)/g, '')
    .toUpperCase();
}

export type { ServerClientOptions };
