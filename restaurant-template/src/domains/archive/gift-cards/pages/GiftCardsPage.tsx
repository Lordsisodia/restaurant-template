/**
 * Customer-Facing Gift Cards Page
 */

import { SolidButton } from '@siso/ui';
import { issueGiftCard } from '@/domains/archive/gift-cards/server';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';
import { loadTenantRuntime } from '@/lib/config/site';
import { GiftCardsHost, type GiftCardsVariant } from '../templates/GiftCardsHost';

export const dynamic = 'force-dynamic';

async function issueGiftCardAction(formData: FormData) {
  'use server';

  const amount = Number(formData.get('amount') ?? 0);
  const purchaserEmail = String(formData.get('purchaserEmail') ?? '') || undefined;
  const recipientEmail = String(formData.get('recipientEmail') ?? '') || undefined;
  const message = String(formData.get('message') ?? '') || undefined;

  if (Number.isNaN(amount) || amount <= 0) {
    throw new Error('Invalid amount');
  }

  await issueGiftCard({ amount, purchaserEmail, recipientEmail, message });
}

export default async function GiftCardsPage() {
  const tenant = await getTenantFromRequest();
  const runtime = await loadTenantRuntime(tenant);

  const giftCardsConfig = (runtime.siteConfig?.features?.giftCards as Record<string, any>) ?? {};
  const variant = (giftCardsConfig.variant as GiftCardsVariant) || 'template-1';
  const denominations = giftCardsConfig.denominations || [50000, 100000, 200000, 500000];

  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-border bg-primary/10 py-16 text-center text-primary">
        <h1 className="text-3xl font-bold sm:text-4xl">Give the gift of flavor</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Purchase a gift card for friends and family. Redeemable in-store or online.
        </p>
      </section>

      <section className="mx-auto grid max-w-4xl gap-12 px-6 py-16 sm:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">How it works</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Choose an amount and enter the recipient details.</li>
            <li>• We email the gift card instantly with your personal message.</li>
            <li>• Gift cards never expire and can be redeemed anytime.</li>
          </ul>
        </div>
        <form action={issueGiftCardAction} className="space-y-4 rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div>
            <label className="text-sm font-medium text-foreground">
              Amount (IDR)
              <input
                name="amount"
                type="number"
                min={50000}
                defaultValue={100000}
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Purchaser email
              <input
                name="purchaserEmail"
                type="email"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Recipient email
              <input
                name="recipientEmail"
                type="email"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Personal message
              <textarea
                name="message"
                rows={3}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
          <SolidButton type="submit" size="md">
            Purchase gift card
          </SolidButton>
        </form>
      </section>
    </div>
  );
}
