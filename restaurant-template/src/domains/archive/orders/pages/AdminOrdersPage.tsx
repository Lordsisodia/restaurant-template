import { revalidatePath } from 'next/cache';

import { SolidButton } from '@siso/ui';

import {
  createOrder,
  deleteOrder,
  listOrders,
  OrderStatus,
  updateOrder,
} from '@/domains/archive/orders/server';
import { formatIDR } from '@/lib/utils/currency';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';

const ORDER_STATUSES: OrderStatus[] = ['pending', 'confirmed', 'in-progress', 'ready', 'completed', 'cancelled'];

async function createOrderAction(formData: FormData) {
  'use server';

  const customerName = String(formData.get('customerName') ?? '').trim();
  if (!customerName) {
    throw new Error('Customer name is required');
  }
  const customerContact = String(formData.get('customerContact') ?? '').trim() || undefined;
  const totalAmount = Number(formData.get('totalAmount') ?? 0);
  const notes = String(formData.get('notes') ?? '').trim() || undefined;

  await createOrder({
    customerName,
    customerContact,
    totalAmount,
    notes,
  });
  revalidatePath('/admin/orders');
}

async function updateOrderAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const status = String(formData.get('status') ?? 'pending') as OrderStatus;
  const totalAmount = Number(formData.get('totalAmount') ?? 0);
  const notes = String(formData.get('notes') ?? '').trim();

  await updateOrder({
    id,
    status,
    totalAmount,
    notes: notes || null,
  });
  revalidatePath('/admin/orders');
}

async function deleteOrderAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  if (!id) return;
  await deleteOrder(id);
  revalidatePath('/admin/orders');
}

export default async function AdminOrdersPage() {
  const tenant = await getTenantFromRequest();
  const orders = await listOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Orders</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track live orders and fulfilment for {tenant.displayName}.
        </p>
      </div>

      <form
        action={createOrderAction}
        className="grid gap-3 rounded-xl border border-border bg-background p-6 shadow-sm sm:grid-cols-5"
      >
        <label className="flex flex-col text-xs sm:col-span-2">
          <span className="mb-1 font-semibold text-muted-foreground">Customer name</span>
          <input
            name="customerName"
            required
            placeholder="e.g., Siti Ayu"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="flex flex-col text-xs sm:col-span-2">
          <span className="mb-1 font-semibold text-muted-foreground">Contact info</span>
          <input
            name="customerContact"
            placeholder="+62 812-xxx"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="flex flex-col text-xs sm:col-span-1">
          <span className="mb-1 font-semibold text-muted-foreground">Total (IDR)</span>
          <input
            name="totalAmount"
            type="number"
            min={0}
            step="1000"
            defaultValue={0}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="sm:col-span-5 flex flex-col text-xs">
          <span className="mb-1 font-semibold text-muted-foreground">Notes</span>
          <textarea
            name="notes"
            rows={2}
            placeholder="Add allergies, delivery instructions, etc."
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <div className="sm:col-span-5 flex justify-end">
          <SolidButton type="submit" size="sm" variant="secondary">
            Create order
          </SolidButton>
        </div>
      </form>

      <section className="space-y-4">
        {orders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-12 text-center text-muted-foreground">
            No orders yet. Orders will appear here once guests place them.
          </div>
        ) : (
          orders.map((order) => (
            <article
              key={order.id}
              className="space-y-4 rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{order.customerName}</h2>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Order #{order.id.slice(0, 8)} · {new Date(order.createdAt).toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">{formatIDR(order.totalAmount)}</p>
                  {order.customerContact ? (
                    <p className="text-xs text-muted-foreground">Contact: {order.customerContact}</p>
                  ) : null}
                </div>
              </div>
              <form action={updateOrderAction} className="grid gap-3 sm:grid-cols-4">
                <input type="hidden" name="id" value={order.id} />
                <label className="flex flex-col text-xs sm:col-span-1">
                  <span className="mb-1 font-semibold text-muted-foreground">Status</span>
                  <select
                    name="status"
                    defaultValue={order.status}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col text-xs sm:col-span-1">
                  <span className="mb-1 font-semibold text-muted-foreground">Total (IDR)</span>
                  <input
                    name="totalAmount"
                    type="number"
                    min={0}
                    step="1000"
                    defaultValue={order.totalAmount}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </label>
                <label className="flex flex-col text-xs sm:col-span-2">
                  <span className="mb-1 font-semibold text-muted-foreground">Notes</span>
                  <textarea
                    name="notes"
                    rows={2}
                    defaultValue={order.notes ?? ''}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </label>
                <div className="sm:col-span-4 flex justify-end gap-2">
                  <SolidButton type="submit" size="sm" variant="secondary">
                    Save changes
                  </SolidButton>
                  <form action={deleteOrderAction}>
                    <input type="hidden" name="id" value={order.id} />
                    <SolidButton type="submit" size="sm" variant="danger">
                      Delete
                    </SolidButton>
                  </form>
                </div>
              </form>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
