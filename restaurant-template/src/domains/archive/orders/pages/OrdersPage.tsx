import { SolidButton } from '@siso/ui';

import { listOrders } from '@/domains/archive/orders/server';
import { formatIDR } from '@/lib/utils/currency';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';

function maskName(fullName: string) {
  const parts = fullName.split(' ');
  if (parts.length === 0) return 'Guest';
  if (parts.length === 1) {
    return `${parts[0].charAt(0).toUpperCase()}***`;
  }
  return `${parts[0]} ${parts[1].charAt(0).toUpperCase()}.`;
}

export default async function OrdersPage() {
  const tenant = await getTenantFromRequest();
  const orders = await listOrders();
  const liveOrders = orders.filter((order) =>
    ['pending', 'confirmed', 'in-progress', 'ready'].includes(order.status),
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
      <section className="space-y-4 text-center">
        <p className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Order tracking
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Your favourite dishes are being prepared with care.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Check the latest status of your order. We'll keep this page updated in real-time so you
          know exactly when to pick up or expect delivery.
        </p>
        <div className="flex justify-center">
          <SolidButton asChild>
            <a href="tel:+6281234567890">Need help? Call the kitchen</a>
          </SolidButton>
        </div>
      </section>

      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Live orders</h2>
          <p className="text-sm text-muted-foreground">
            Updated {new Date().toLocaleTimeString('id-ID')}
          </p>
        </header>

        {liveOrders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
            The kitchen is quiet right now. Place an order to see it appear here!
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border/70">
            <table className="min-w-full divide-y divide-border/60 bg-background text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {liveOrders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium text-foreground">{maskName(order.customerName)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">
                        {order.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-foreground">{formatIDR(order.totalAmount)}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {order.notes ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="grid gap-6 rounded-3xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-8 text-left text-primary-foreground sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">1. Place</p>
          <h3 className="mt-2 text-xl font-semibold">Choose your favourites</h3>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Explore the latest specials and build your perfect meal in just a few taps.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">2. Track</p>
          <h3 className="mt-2 text-xl font-semibold">Follow the kitchen</h3>
          <p className="mt-2 text-sm text-primary-foreground/80">
            We'll alert you as soon as the kitchen starts preparing and when it's ready.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">3. Enjoy</p>
          <h3 className="mt-2 text-xl font-semibold">Pick up or relax</h3>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Swing by for pickup or let our delivery partner bring it straight to your door.
          </p>
        </div>
      </section>
    </div>
  );
}
