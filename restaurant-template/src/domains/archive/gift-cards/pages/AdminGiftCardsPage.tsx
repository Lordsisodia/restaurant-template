import { SolidButton } from '@siso/ui';

import { listGiftCards, redeemGiftCard } from '@/domains/archive/gift-cards/server';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';

async function redeemAction(formData: FormData) {
  'use server';

  const code = String(formData.get('code') ?? '');
  const amount = Number(formData.get('amount') ?? 0);
  if (!code || Number.isNaN(amount) || amount <= 0) {
    throw new Error('Invalid redemption');
  }
  await redeemGiftCard({ code, amount });
}

export default async function AdminGiftCardsPage() {
  const tenant = await getTenantFromRequest();
  const giftCards = await listGiftCards();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Gift cards</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Issue and track gift cards for {tenant.displayName}.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-3 rounded-xl border border-border bg-background p-5 shadow-sm">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Issued cards</h2>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Total: {giftCards.length}
            </span>
          </header>
          {giftCards.length === 0 ? (
            <p className="rounded-md border border-dashed border-border px-4 py-4 text-sm text-muted-foreground">
              No gift cards issued yet.
            </p>
          ) : (
            <ul className="divide-y divide-border text-sm">
              {giftCards.map((card) => (
                <li key={card.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium text-foreground">Code: {card.code}</p>
                    <p className="text-xs text-muted-foreground">
                      Issued {new Date(card.createdAt).toLocaleDateString('id-ID')} · Status {card.status}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>Initial {card.initialValueFormatted}</p>
                    <p>Balance {card.balanceFormatted}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="space-y-4 rounded-xl border border-border bg-background p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Redeem card</h2>
          <form action={redeemAction} className="space-y-3 text-sm">
            <label className="flex flex-col">
              <span className="mb-1 font-medium text-muted-foreground">Gift card code</span>
              <input
                name="code"
                required
                className="rounded-md border border-input bg-background px-3 py-2"
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-1 font-medium text-muted-foreground">Amount (IDR)</span>
              <input
                name="amount"
                type="number"
                min={1}
                required
                className="rounded-md border border-input bg-background px-3 py-2"
              />
            </label>
            <SolidButton type="submit" size="sm">
              Redeem
            </SolidButton>
          </form>
        </section>
      </div>
    </div>
  );
}
