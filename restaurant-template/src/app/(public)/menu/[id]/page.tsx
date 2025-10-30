import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { FALLBACK_MENU_ITEMS } from '@/domains/customer-facing/menu/shared/types';
import type { MenuItem } from '@/domains/customer-facing/menu/shared/types';
import { getMenuItemImage } from '@/domains/customer-facing/menu/shared/utils/menu-images';
import { Badge } from '@/domains/shared/components';

export const dynamic = 'force-dynamic';

async function getItem(id: string): Promise<MenuItem | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('item')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) {
      console.warn('[menu/[id]] Supabase error:', error.message);
    }
    if (data) {
      // Map to MenuItem type (mirror of menu.service.ts mapping)
      return {
        id: data.id,
        name: data.name || 'Untitled item',
        description: data.description || null,
        price: Number(data.price) || 0,
        category: data.category_id || '',
        image_url: data.image_url || null,
        is_vegetarian: !!data.is_vegetarian,
        is_vegan: !!data.is_vegan,
        is_gluten_free: !!data.is_gluten_free,
        is_spicy: !!data.is_spicy,
        ingredients: data.ingredients || null,
        calories: data.calories ?? null,
        protein_g: data.protein_g ?? null,
        carbs_g: data.carbs_g ?? null,
        sugar_g: data.sugar_g ?? null,
        fat_g: data.fat_g ?? null,
        prep_time_min: data.prep_time_min ?? data.prep_minutes ?? null,
        allergens: Array.isArray(data.allergens)
          ? (data.allergens as string[])
          : (typeof data.allergens === 'string'
              ? (data.allergens as string).split(',').map((s: string) => s.trim()).filter(Boolean)
              : null),
        is_halal: data.is_halal ?? null,
        is_kosher: data.is_kosher ?? null,
        popular_score: data.popular_score ?? 0,
      } satisfies MenuItem;
    }
  } catch (e) {
    console.warn('[menu/[id]] Failed to fetch item:', e);
  }
  // fallback by id
  const fb = FALLBACK_MENU_ITEMS.find((i) => i.id === id) || null;
  return fb ?? null;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function MenuItemPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);
  if (!item) return notFound();

  const hero = getMenuItemImage(item, 'hero');
  const isUuid = (val: string | null | undefined) => !!val && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(val);
  const categoryLabel = !item.category || isUuid(item.category) ? 'Dish' : item.category;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative h-[46vh] sm:h-[56vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <Badge className="bg-white/10 backdrop-blur-xl border-white/30 text-white text-xs sm:text-sm px-3 py-1.5">
            {categoryLabel}
          </Badge>
          {item.popular_score >= 85 && (
            <Badge className="bg-amber-500/90 text-black text-[10px] sm:text-xs font-semibold">Best Seller</Badge>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-2xl">
            {item.name}
          </h1>
          <p className="mt-2 text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            {formatPrice(item.price)}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto w-full max-w-5xl px-6 py-10 space-y-8">
        {/* Chips row */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm">⚡ {item.calories ?? '—'} cal</span>
          <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm">🥩 {item.protein_g ?? '—'}g protein</span>
          <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm">🍚 {item.carbs_g ?? '—'}g carbs</span>
          {item.fat_g != null && (
            <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm">🧈 {item.fat_g}g fat</span>
          )}
          {item.sugar_g != null && (
            <span className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm">🧁 {item.sugar_g}g sugar</span>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* About card */}
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
            <h2 className="text-sm uppercase tracking-[0.14em] text-orange-300 mb-3">About this dish</h2>
            <p className="text-gray-200 leading-relaxed text-base sm:text-lg">
              {item.description ?? 'Made fresh to order using quality ingredients.'}
            </p>
          </div>

          {/* Quick facts */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm space-y-3">
            <h3 className="text-sm uppercase tracking-[0.14em] text-orange-300">Quick facts</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              {item.prep_time_min != null && (
                <li>⏱ Prep time: {item.prep_time_min} min</li>
              )}
              {item.is_vegetarian && <li>🥬 Vegetarian</li>}
              {item.is_vegan && <li>🌱 Vegan</li>}
              {item.is_gluten_free && <li>🌾 Gluten‑free</li>}
              {item.is_spicy && <li>🌶️ Spicy</li>}
            </ul>
            {item.allergens && item.allergens.length > 0 && (
              <div className="pt-2">
                <p className="text-xs text-gray-400 mb-2">Allergens</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.allergens.slice(0, 6).map((a) => (
                    <span key={a} className="px-2 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-[12px] text-red-300">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ingredients + Nutrition cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/10 to-amber-500/10 p-6 backdrop-blur-sm">
            <h3 className="text-sm uppercase tracking-[0.14em] text-orange-300 mb-3">Ingredients</h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              {item.ingredients ?? 'Made with seasonal, locally sourced ingredients.'}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-sm">
            <h3 className="text-sm uppercase tracking-[0.14em] text-purple-300 mb-3">Nutrition (per serving)</h3>
            <ul className="text-sm text-gray-200 grid grid-cols-2 gap-2">
              <li>Calories: {item.calories ?? '—'} kcal</li>
              <li>Protein: {item.protein_g ?? '—'} g</li>
              <li>Carbs: {item.carbs_g ?? '—'} g</li>
              <li>Fat: {item.fat_g ?? '—'} g</li>
              {item.sugar_g != null && <li>Sugars: {item.sugar_g} g</li>}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
