import { NextResponse } from 'next/server';
import { getMenu } from '@/domains/customer-facing/menu/shared/services';
import { getSpecials } from '@/domains/archive/specials/server';
import { listReviews } from '@/domains/customer-facing/reviews/shared/services';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';
import { loadTenantRuntime } from '@/lib/config/site';

export async function GET() {
  const out: Record<string, unknown> = { ok: true, steps: [] };
  const steps: Array<{ name: string; ok: boolean; note?: string; error?: string }> = [];

  try {
    const tenant = await getTenantFromRequest();
    const runtime = await loadTenantRuntime(tenant);
    steps.push({ name: 'tenant', ok: true, note: tenant.displayName });
    steps.push({ name: 'runtime', ok: true, note: runtime.siteConfig ? 'siteConfig:remote/ok' : 'siteConfig:none' });
  } catch (e: any) {
    steps.push({ name: 'tenant+runtime', ok: false, error: e?.stack || e?.message });
  }

  try {
    const menu = await getMenu();
    steps.push({ name: 'menu', ok: true, note: `categories=${menu.categories.length}` });
  } catch (e: any) {
    steps.push({ name: 'menu', ok: false, error: e?.stack || e?.message });
  }

  try {
    const specials = await getSpecials();
    steps.push({ name: 'specials', ok: true, note: `count=${specials.length}` });
  } catch (e: any) {
    steps.push({ name: 'specials', ok: false, error: e?.stack || e?.message });
  }

  try {
    const reviews = await listReviews('published');
    steps.push({ name: 'reviews', ok: true, note: `count=${reviews.length}` });
  } catch (e: any) {
    steps.push({ name: 'reviews', ok: false, error: e?.stack || e?.message });
  }

  out.steps = steps;
  out.timestamp = new Date().toISOString();
  out.nodeEnv = process.env.NODE_ENV;

  // If any step failed, surface as ok=false to make it obvious in API testers
  out.ok = steps.every((s) => s.ok);
  return NextResponse.json(out, { status: out.ok ? 200 : 500 });
}
