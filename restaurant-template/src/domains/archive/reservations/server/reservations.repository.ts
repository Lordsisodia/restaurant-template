import { withTenantSupabase } from '@/lib/supabase/withTenantSupabase';

export interface ReservationRecord {
  id: string;
  customerName: string;
  customerEmail: string | null;
  partySize: number;
  reservationTime: string;
  status: string;
  notes: string | null;
}

export async function createReservation(payload: {
  customerName: string;
  customerEmail?: string;
  partySize: number;
  reservationTime: string;
  notes?: string;
}) {
  return withTenantSupabase(async (client, context) => {
    const { error } = await client.from('reservation').insert({
      restaurant_id: context.restaurantId,
      customer_name: payload.customerName,
      customer_email: payload.customerEmail ?? null,
      party_size: payload.partySize,
      reservation_time: payload.reservationTime,
      notes: payload.notes ?? null,
    });
    if (error) throw error;
  });
}

export async function listReservations(): Promise<ReservationRecord[]> {
  return withTenantSupabase(async (client, context) => {
    const { data, error } = await client
      .from('reservation')
      .select('*')
      .eq('restaurant_id', context.restaurantId)
      .order('reservation_time', { ascending: true });

    if (error) throw error;

    return (data ?? []).map((row) => ({
      id: row.id as string,
      customerName: row.customer_name as string,
      customerEmail: (row.customer_email as string | null) ?? null,
      partySize: row.party_size as number,
      reservationTime: row.reservation_time as string,
      status: row.status as string,
      notes: (row.notes as string | null) ?? null,
    }));
  });
}

export async function updateReservationStatus(params: {
  id: string;
  status: string;
}) {
  return withTenantSupabase(async (client, context) => {
    const { error } = await client
      .from('reservation')
      .update({ status: params.status })
      .eq('id', params.id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}
