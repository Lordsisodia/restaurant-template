import { cache } from 'react';

import { withTenantSupabase } from '@/lib/supabase/withTenantSupabase';

export interface LeadRecord {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  leadType: string;
  partySize: number | null;
  eventDate: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

export const listLeads = cache(async (): Promise<LeadRecord[]> => {
  return withTenantSupabase(async (client, context) => {
    const { data, error } = await client
      .from('lead')
      .select('*')
      .eq('restaurant_id', context.restaurantId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data ?? []).map((row) => ({
      id: row.id as string,
      name: row.name as string,
      email: (row.email as string | null) ?? null,
      phone: (row.phone as string | null) ?? null,
      leadType: row.lead_type as string,
      partySize: (row.party_size as number | null) ?? null,
      eventDate: (row.event_date as string | null) ?? null,
      message: (row.message as string | null) ?? null,
      status: row.status as string,
      createdAt: row.created_at as string,
    }));
  });
});

export async function createLead(payload: {
  name: string;
  email?: string;
  phone?: string;
  leadType: string;
  partySize?: number;
  eventDate?: string;
  message?: string;
}) {
  await withTenantSupabase(async (client, context) => {
    const { error } = await client.from('lead').insert({
      restaurant_id: context.restaurantId,
      name: payload.name,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      lead_type: payload.leadType,
      party_size: payload.partySize ?? null,
      event_date: payload.eventDate ?? null,
      message: payload.message ?? null,
    });
    if (error) throw error;
  });
}

export async function updateLeadStatus(payload: { id: string; status: string }) {
  await withTenantSupabase(async (client, context) => {
    const { error } = await client
      .from('lead')
      .update({ status: payload.status })
      .eq('id', payload.id)
      .eq('restaurant_id', context.restaurantId);

    if (error) throw error;
  });
}
