import { defaultThemeTokens } from '@/config/theme-tokens';
import type { TenantRecord } from '@/config/tenants';
import { withTenantSupabase } from '@/lib/supabase/withTenantSupabase';

export interface LoadedSiteConfig {
  themeTokens: typeof defaultThemeTokens;
  siteConfig: Record<string, unknown> | null;
}

export async function loadTenantRuntime(tenant: TenantRecord): Promise<LoadedSiteConfig> {
  try {
    const remote = await withTenantSupabase(
      async (client) => {
        const { data, error } = await client
          .from('site_config')
          .select('theme_tokens, enabled_pages, features, layout_variant, default_locale, available_locales')
          .eq('restaurant_id', tenant.restaurantId)
          .maybeSingle();

        if (error) {
          throw error;
        }

        return data ?? null;
      },
      {
        restaurantId: tenant.restaurantId,
        restaurantSlug: tenant.restaurantSlug,
      },
    );

    // Local fallback from pods.json (if present)
    const localSiteConfig = (tenant.siteConfig as Record<string, unknown> | undefined) ?? null;

    // Choose site config: prefer remote, else local
    const siteConfig = (remote as any) ?? localSiteConfig;

    // Theme tokens: prefer remote.theme_tokens, else local.siteConfig.theme_tokens, else defaults
    const themeTokens = (remote?.theme_tokens as typeof defaultThemeTokens | undefined)
      ?? (localSiteConfig?.['theme_tokens'] as typeof defaultThemeTokens | undefined)
      ?? defaultThemeTokens;

    return {
      themeTokens,
      siteConfig,
    };
  } catch (error) {
    console.warn('[tenant] Falling back to default site config', error);
    return {
      themeTokens: defaultThemeTokens,
      siteConfig: null,
    };
  }
}
