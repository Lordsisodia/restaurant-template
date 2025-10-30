import { revalidatePath } from 'next/cache';

import { SolidButton } from '@siso/ui';

import { listReservations, updateReservationStatus } from '@/domains/archive/reservations/server';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';
import { AdminPageHeader } from '@/domains/shared/components/admin/AdminPageHeader';
import { AdminCard } from '@/domains/shared/components/admin/AdminCard';
import { AdminEmptyState } from '@/domains/shared/components/admin/AdminEmptyState';
import { AdminTable, AdminThead, AdminTbody } from '@/domains/shared/components/admin/AdminTable';

async function updateStatusAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!id || !status) {
    throw new Error('Missing reservation id or status');
  }

  await updateReservationStatus({ id, status });
  revalidatePath('/admin/reservations');
}

export default async function AdminReservationsPage() {
  const tenant = await getTenantFromRequest();
  const reservations = await listReservations();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Reservations"
        subtitle={`Track upcoming reservations for ${tenant.displayName}.`}
      />
      {reservations.length === 0 ? (
        <AdminEmptyState title="No reservations yet" description="New bookings will appear here automatically." />
      ) : (
        <AdminCard>
          <AdminTable>
            <AdminThead>
              <tr>
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Party</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </AdminThead>
            <AdminTbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{reservation.customerName}</div>
                    {reservation.customerEmail ? (
                      <div className="text-xs text-muted-foreground">{reservation.customerEmail}</div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">{reservation.partySize}</td>
                  <td className="px-4 py-3">
                    {new Date(reservation.reservationTime).toLocaleString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <form action={updateStatusAction} className="inline-flex items-center gap-2 text-sm">
                      <input type="hidden" name="id" value={reservation.id} />
                      <select
                        name="status"
                        defaultValue={reservation.status}
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs capitalize"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="seated">Seated</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="no_show">No show</option>
                      </select>
                      <SolidButton type="submit" size="sm" variant="secondary">
                        Update
                      </SolidButton>
                    </form>
                  </td>
                </tr>
              ))}
            </AdminTbody>
          </AdminTable>
        </AdminCard>
      )}
    </div>
  );
}
