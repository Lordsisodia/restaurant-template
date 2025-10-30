import { cache } from 'react';

import { formatIDR } from '@/lib/utils/currency';
import { withTenantSupabase } from '@/lib/supabase/withTenantSupabase';

export interface GiftCardRecord {
  id: string;
  code: string;
  initialValue: number;
  balance: number;
  status: string;
  purchaserEmail: string | null;
  recipientEmail: string | null;
  message: string | null;
  createdAt: string;
  initialValueFormatted: string;
  balanceFormatted: string;
}

export const listGiftCards = cache(async (): Promise<GiftCardRecord[]> => {
  return withTenantSupabase(async (client, context) => {
    const { data, error } = await client
      .from('gift_card')
      .select('*')
      .eq('restaurant_id', context.restaurantId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data ?? []).map((row) => ({
      id: row.id as string,
      code: row.code as string,
      initialValue: row.initial_value as number,
      balance: row.balance as number,
      status: row.status as string,
      purchaserEmail: (row.purchaser_email as string | null) ?? null,
      recipientEmail: (row.recipient_email as string | null) ?? null,
      message: (row.message as string | null) ?? null,
      createdAt: row.created_at as string,
      initialValueFormatted: formatIDR(row.initial_value as number),
      balanceFormatted: formatIDR(row.balance as number),
    }));
  });
});

export async function issueGiftCard(payload: {
  amount: number;
  purchaserEmail?: string;
  recipientEmail?: string;
  message?: string;
}) {
  await withTenantSupabase(async (client, context) => {
    const code = `GC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const { error } = await client.from('gift_card').insert({
      restaurant_id: context.restaurantId,
      code,
      initial_value: payload.amount,
      balance: payload.amount,
      purchaser_email: payload.purchaserEmail ?? null,
      recipient_email: payload.recipientEmail ?? null,
      message: payload.message ?? null,
    });
    if (error) throw error;
  });
}

export async function redeemGiftCard(payload: { code: string; amount: number }) {
  await withTenantSupabase(async (client, context) => {
    const { data, error } = await client
      .from('gift_card')
      .select('id, balance')
      .eq('restaurant_id', context.restaurantId)
      .eq('code', payload.code)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error('Gift card not found');
    const balance = data.balance as number;
    if (balance < payload.amount) throw new Error('Insufficient balance');

    const { error: updateError } = await client
      .from('gift_card')
      .update({ balance: balance - payload.amount })
      .eq('id', data.id as string)
      .eq('restaurant_id', context.restaurantId);

    if (updateError) throw updateError;

    await client.from('gift_card_redemption').insert({
      gift_card_id: data.id,
      restaurant_id: context.restaurantId,
      amount: payload.amount,
    });
  });
}
