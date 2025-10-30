import { createBrowserClient, type SupabaseClient } from '@supabase/ssr';

type Database = Record<string, unknown>;

declare global {
  var __supabaseBrowserClient: SupabaseClient<Database> | undefined;
  var __supabaseBrowserClientInitError: Error | undefined;
}

void globalThis.__supabaseBrowserClient;
void globalThis.__supabaseBrowserClientInitError;

function initialiseBrowserClient(): SupabaseClient<Database> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    const missing = [];
    if (!url) missing.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!anonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');

    globalThis.__supabaseBrowserClientInitError = new Error(
      `Supabase not configured. Missing ${missing.join(', ')} environment variable${missing.length > 1 ? 's' : ''}.`,
    );
    return null;
  }

  try {
    const client = createBrowserClient<Database>(url, anonKey);
    globalThis.__supabaseBrowserClientInitError = undefined;
    return client;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    globalThis.__supabaseBrowserClientInitError = err;
    return null;
  }
}

function createMockSupabaseClient(initError: Error): SupabaseClient<Database> {
  const errorMessage = `Supabase client not initialised: ${initError.message}`;

  const throwError = (): never => {
    throw new Error(errorMessage);
  };

  const handler: ProxyHandler<object> = {
    get: (_target, prop) => {
      if (prop === 'toString' || prop === Symbol.toStringTag) {
        return () => '[MockSupabaseClient]';
      }

      if (prop === 'from') {
        return () => {
          throw new Error(errorMessage);
        };
      }

      throwError();
    },
  };

  return new Proxy({}, handler) as SupabaseClient<Database>;
}

export function createClient(): SupabaseClient<Database> {
  if (globalThis.__supabaseBrowserClient) {
    return globalThis.__supabaseBrowserClient;
  }

  const client = initialiseBrowserClient();
  if (client) {
    globalThis.__supabaseBrowserClient = client;
    return client;
  }

  const error =
    globalThis.__supabaseBrowserClientInitError ??
    new Error('Supabase client not initialised: unknown error.');
  const mock = createMockSupabaseClient(error);
  globalThis.__supabaseBrowserClient = mock;
  return mock;
}

export function isSupabaseClientAvailable(): boolean {
  return !globalThis.__supabaseBrowserClientInitError;
}

export function getSupabaseClientInitError(): Error | null {
  return globalThis.__supabaseBrowserClientInitError ?? null;
}
