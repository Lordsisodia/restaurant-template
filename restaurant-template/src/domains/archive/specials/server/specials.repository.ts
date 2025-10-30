import { cache } from 'react';

import { formatIDR } from '@/lib/utils/currency';
import { withTenantSupabase } from '@/lib/supabase/withTenantSupabase';

export interface SpecialRecord {
  id: string;
  scope: 'item' | 'category';
  targetId: string;
  type: 'percent' | 'fixed' | 'bogo';
  value: number;
  title: string;
  description: string;
  savings: string;
  startDate: string | null;
  endDate: string | null;
  daysOfWeek: number[];
}

export const getSpecials = cache(async (): Promise<SpecialRecord[]> => {
  return withTenantSupabase(async (client, context) => {
    const { data, error } = await client
      .from('special')
      .select('*')
      .eq('restaurant_id', context.restaurantId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const specials = data ?? [];

    const itemIds = specials.filter((s) => s.scope === 'item').map((s) => s.target_id);
    const categoryIds = specials.filter((s) => s.scope === 'category').map((s) => s.target_id);

    const [items, categories] = await Promise.all([
      itemIds.length
        ? client
            .from('item')
            .select('id, name, price')
            .in('id', itemIds)
            .eq('restaurant_id', context.restaurantId)
        : Promise.resolve({ data: [], error: null }),
      categoryIds.length
        ? client
            .from('category')
            .select('id, name')
            .in('id', categoryIds)
            .eq('restaurant_id', context.restaurantId)
        : Promise.resolve({ data: [], error: null }),
    ]);

    if (items.error) throw items.error;
    if (categories.error) throw categories.error;

    const itemMap = new Map((items.data ?? []).map((item) => [item.id, item]));
    const categoryMap = new Map((categories.data ?? []).map((category) => [category.id, category]));

    return specials.map((special) => {
      let title = 'Special';
      let description = '';
      let savings = '';

      if (special.scope === 'item') {
        const item = itemMap.get(special.target_id);
        if (item) {
          title = item.name ?? title;
          if (item.price != null) {
            if (special.type === 'percent') {
              savings = `${special.value}% off ${formatIDR(item.price)}`;
            } else if (special.type === 'fixed') {
              savings = `${formatIDR(special.value)} off ${formatIDR(item.price)}`;
            } else if (special.type === 'bogo') {
              savings = 'Buy one get one';
            }
          }
        }
      } else {
        const category = categoryMap.get(special.target_id);
        if (category) {
          title = `${category.name} Specials`;
          savings = special.type === 'percent' ? `${special.value}% off category` : 'Limited offer';
        }
      }

      description = savings;

      return {
        id: special.id as string,
        scope: special.scope as 'item' | 'category',
        targetId: special.target_id as string,
        type: special.type as 'percent' | 'fixed' | 'bogo',
        value: special.value ?? 0,
        title,
        description,
        savings,
        startDate: (special.start_date as string | null) ?? null,
        endDate: (special.end_date as string | null) ?? null,
        daysOfWeek: (special.days_of_week as number[] | null) ?? [],
      } satisfies SpecialRecord;
    });
  });
});

export async function createSpecial(payload: {
  scope: 'item' | 'category';
  targetId: string;
  type: 'percent' | 'fixed' | 'bogo';
  value: number;
  daysOfWeek?: number[];
  startDate?: string;
  endDate?: string;
}) {
  return withTenantSupabase(async (client, context) => {
    const { error } = await client.from('special').insert({
      restaurant_id: context.restaurantId,
      scope: payload.scope,
      target_id: payload.targetId,
      type: payload.type,
      value: payload.value,
      days_of_week: payload.daysOfWeek ?? [],
      start_date: payload.startDate ?? null,
      end_date: payload.endDate ?? null,
    });
    if (error) throw error;
  });
}

export async function updateSpecial(payload: {
  id: string;
  type?: 'percent' | 'fixed' | 'bogo';
  value?: number;
  daysOfWeek?: number[] | null;
  startDate?: string | null;
  endDate?: string | null;
}) {
  await withTenantSupabase(async (client, context) => {
    const updates: Record<string, unknown> = {};
    if (payload.type) updates.type = payload.type;
    if (payload.value != null) updates.value = payload.value;
    if (payload.daysOfWeek !== undefined) updates.days_of_week = payload.daysOfWeek ?? [];
    if (payload.startDate !== undefined) updates.start_date = payload.startDate ?? null;
    if (payload.endDate !== undefined) updates.end_date = payload.endDate ?? null;

    if (Object.keys(updates).length === 0) return;

    const { error } = await client
      .from('special')
      .update(updates)
      .eq('id', payload.id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}

export async function deleteSpecial(id: string) {
  return withTenantSupabase(async (client, context) => {
    const { error } = await client
      .from('special')
      .delete()
      .eq('id', id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}
