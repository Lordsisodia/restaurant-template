"use client";

import { SectionHeading } from '@/domains/shared/components';

import type { LoyaltyTierHighlightsContent } from '../../types/schema';

export default function LoyaltyTierHighlightsPrimary(props: LoyaltyTierHighlightsContent) {
  const { heading, description, tiers } = props;

  return (
    <section className="space-y-6">
      {(heading ?? description) ? (
        <SectionHeading
          centered={false}
          title={heading ?? 'Membership tiers at a glance'}
          subtitle={description}
          as="h2"
          className="text-left"
          titleClassName="text-2xl font-semibold"
          pillText="Tiers"
        />
      ) : null}

      <div className="grid gap-6 rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 p-8 text-left text-emerald-50 sm:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.title}>
            <h3 className="text-xl font-semibold">{tier.title}</h3>
            <p className="mt-2 text-sm text-emerald-100/90">{tier.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
