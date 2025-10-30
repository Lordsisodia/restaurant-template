import Link from 'next/link';

import { SolidButton } from '@siso/ui';

import { createReservation } from '@/domains/archive/reservations/server';

export const dynamic = 'force-dynamic';

async function submitReservation(formData: FormData) {
  'use server';

  await createReservation({
    customerName: String(formData.get('name') ?? ''),
    customerEmail: String(formData.get('email') ?? ''),
    partySize: Number(formData.get('partySize') ?? 1),
    reservationTime: String(formData.get('reservationTime') ?? ''),
    notes: String(formData.get('notes') ?? ''),
  });
}

export default function ReservationsPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-border bg-primary/10 py-16 text-center text-primary">
        <h1 className="text-3xl font-bold sm:text-4xl">Reservations</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Request a table and we'll confirm availability shortly.
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <form action={submitReservation} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col text-sm">
              <span className="mb-1 font-medium text-foreground">Name</span>
              <input
                required
                name="name"
                className="rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm"
              />
            </label>
            <label className="flex flex-col text-sm">
              <span className="mb-1 font-medium text-foreground">Email</span>
              <input
                type="email"
                name="email"
                className="rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm"
              />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col text-sm">
              <span className="mb-1 font-medium text-foreground">Party size</span>
              <input
                required
                type="number"
                min={1}
                max={20}
                defaultValue={2}
                name="partySize"
                className="rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm"
              />
            </label>
            <label className="flex flex-col text-sm">
              <span className="mb-1 font-medium text-foreground">Reservation time</span>
              <input
                required
                type="datetime-local"
                name="reservationTime"
                className="rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm"
              />
            </label>
          </div>
          <label className="flex flex-col text-sm">
            <span className="mb-1 font-medium text-foreground">Notes</span>
            <textarea
              name="notes"
              rows={4}
              className="rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm"
            />
          </label>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>We'll email you once the request is confirmed.</span>
            <Link href="/contact" className="text-primary">
              Need help?
            </Link>
          </div>
          <SolidButton type="submit" size="md">
            Request reservation
          </SolidButton>
        </form>
      </section>
    </div>
  );
}
