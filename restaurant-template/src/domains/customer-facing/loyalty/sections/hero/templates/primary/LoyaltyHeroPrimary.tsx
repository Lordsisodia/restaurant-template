"use client";

import { SolidButton } from '@siso/ui';

import type { LoyaltyHeroContent } from '../../types/schema';

export default function LoyaltyHeroPrimary(props: LoyaltyHeroContent) {
  const {
    eyebrow = 'Membership',
    headline,
    description,
    primaryCta,
    secondaryCta,
  } = props;

  return (
    <section className="space-y-4 text-center">
      {eyebrow ? (
        <p className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {headline}
      </h1>
      {description ? (
        <p className="mx-auto max-w-xl text-base text-muted-foreground">{description}</p>
      ) : null}
      {(primaryCta ?? secondaryCta) ? (
        <div className="flex justify-center gap-3">
          {primaryCta ? (
            <SolidButton asChild>
              <a href={primaryCta.href}>{primaryCta.label}</a>
            </SolidButton>
          ) : null}
          {secondaryCta ? (
            <SolidButton asChild variant="secondary">
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </SolidButton>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
