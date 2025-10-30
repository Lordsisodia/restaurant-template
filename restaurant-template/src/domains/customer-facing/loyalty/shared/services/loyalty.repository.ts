import { cache } from 'react';

import { withTenantSupabase } from '@/lib/supabase/withTenantSupabase';

export interface LoyaltyMember {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  points: number;
  tier: string;
  lastVisit: string | null;
  createdAt: string;
}

export const listMembers = cache(async (): Promise<LoyaltyMember[]> => {
  return withTenantSupabase(async (client, context) => {
    const { data, error } = await client
      .from('loyalty_member')
      .select('id, full_name, email, phone, points, tier, last_visit, created_at')
      .eq('restaurant_id', context.restaurantId)
      .order('points', { ascending: false });

    if (error) throw error;

    return (data ?? []).map((row) => ({
      id: row.id as string,
      fullName: (row.full_name as string) ?? 'Guest',
      email: (row.email as string | null) ?? null,
      phone: (row.phone as string | null) ?? null,
      points: (row.points as number) ?? 0,
      tier: (row.tier as string) ?? 'bronze',
      lastVisit: (row.last_visit as string | null) ?? null,
      createdAt: (row.created_at as string) ?? '',
    }));
  });
});

export async function createMember(payload: {
  fullName: string;
  email?: string;
  phone?: string;
  tier?: string;
  points?: number;
}) {
  await withTenantSupabase(async (client, context) => {
    const { error } = await client.from('loyalty_member').insert({
      restaurant_id: context.restaurantId,
      full_name: payload.fullName,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      tier: payload.tier ?? 'bronze',
      points: payload.points ?? 0,
    });
    if (error) throw error;
  });
}

export async function updateMember(payload: {
  id: string;
  fullName?: string;
  email?: string | null;
  phone?: string | null;
  tier?: string;
  points?: number;
  lastVisit?: string | null;
}) {
  await withTenantSupabase(async (client, context) => {
    const updates: Record<string, unknown> = {};
    if (payload.fullName !== undefined) updates.full_name = payload.fullName;
    if (payload.email !== undefined) updates.email = payload.email ?? null;
    if (payload.phone !== undefined) updates.phone = payload.phone ?? null;
    if (payload.tier !== undefined) updates.tier = payload.tier;
    if (payload.points != null) updates.points = payload.points;
    if (payload.lastVisit !== undefined) updates.last_visit = payload.lastVisit ?? null;

    if (Object.keys(updates).length === 0) return;

    const { error } = await client
      .from('loyalty_member')
      .update(updates)
      .eq('id', payload.id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}

export async function deleteMember(id: string) {
  await withTenantSupabase(async (client, context) => {
    const { error } = await client
      .from('loyalty_member')
      .delete()
      .eq('id', id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}
