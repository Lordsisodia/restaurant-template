import { cache } from 'react';

import { withTenantSupabase } from '@/lib/supabase/withTenantSupabase';

export type OrderStatus = 'pending' | 'confirmed' | 'in-progress' | 'ready' | 'completed' | 'cancelled';

export interface OrderRecord {
  id: string;
  customerName: string;
  customerContact: string | null;
  status: OrderStatus;
  totalAmount: number;
  notes: string | null;
  orderItems: unknown[];
  createdAt: string;
  updatedAt: string;
}

export const listOrders = cache(async (status?: OrderStatus): Promise<OrderRecord[]> => {
  return withTenantSupabase(async (client, context) => {
    let query = client
      .from('restaurant_order')
      .select('id, customer_name, customer_contact, status, total_amount, notes, order_items, created_at, updated_at')
      .eq('restaurant_id', context.restaurantId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;

    return (data ?? []).map((row) => ({
      id: row.id as string,
      customerName: (row.customer_name as string) ?? 'Guest',
      customerContact: (row.customer_contact as string | null) ?? null,
      status: (row.status as OrderStatus) ?? 'pending',
      totalAmount: (row.total_amount as number) ?? 0,
      notes: (row.notes as string | null) ?? null,
      orderItems: (row.order_items as unknown[]) ?? [],
      createdAt: (row.created_at as string) ?? '',
      updatedAt: (row.updated_at as string) ?? '',
    }));
  });
});

export async function createOrder(payload: {
  customerName: string;
  customerContact?: string;
  status?: OrderStatus;
  totalAmount: number;
  notes?: string;
  orderItems?: unknown[];
}) {
  await withTenantSupabase(async (client, context) => {
    const { error } = await client.from('restaurant_order').insert({
      restaurant_id: context.restaurantId,
      customer_name: payload.customerName,
      customer_contact: payload.customerContact ?? null,
      status: payload.status ?? 'pending',
      total_amount: payload.totalAmount,
      notes: payload.notes ?? null,
      order_items: payload.orderItems ?? [],
    });
    if (error) throw error;
  });
}

export async function updateOrder(payload: {
  id: string;
  status?: OrderStatus;
  notes?: string | null;
  totalAmount?: number;
  orderItems?: unknown[];
}) {
  await withTenantSupabase(async (client, context) => {
    const updates: Record<string, unknown> = {};
    if (payload.status) updates.status = payload.status;
    if (payload.notes !== undefined) updates.notes = payload.notes ?? null;
    if (payload.totalAmount != null) updates.total_amount = payload.totalAmount;
    if (payload.orderItems !== undefined) updates.order_items = payload.orderItems ?? [];

    if (Object.keys(updates).length === 0) return;

    const { error } = await client
      .from('restaurant_order')
      .update(updates)
      .eq('id', payload.id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}

export async function deleteOrder(id: string) {
  await withTenantSupabase(async (client, context) => {
    const { error } = await client
      .from('restaurant_order')
      .delete()
      .eq('id', id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}
