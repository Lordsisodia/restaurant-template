"use client";

import { SolidButton } from '@siso/ui';

import type { HeroContent } from '../../types/schema';

export default function HeroPrimary({
  tenantName,
  badgeLabel = 'Chat assistant',
  headline,
  description,
  primaryCta,
  secondaryCta,
}: HeroContent) {
  const heroHeadline =
    headline ?? 'Need a hand? Our assistant replies instantly with accurate answers.';
  const descriptionCopy =
    description ??
    `Ask about menu items, delivery windows, or dietary preferences. These quick responses come straight from the team at ${
      tenantName ?? 'our team'
    }.`;

  return (
    <section className="space-y-4 text-center">
      <p className="inline-flex rounded-full bg-sky-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
        {badgeLabel}
      </p>
      <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {heroHeadline}
      </h1>
      <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{descriptionCopy}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <SolidButton asChild>
          <a href={primaryCta.href} target={primaryCta.target} rel={primaryCta.rel}>
            {primaryCta.label}
          </a>
        </SolidButton>
        {secondaryCta ? (
          <SolidButton asChild variant="secondary">
            <a href={secondaryCta.href} target={secondaryCta.target} rel={secondaryCta.rel}>
              {secondaryCta.label}
            </a>
          </SolidButton>
        ) : null}
      </div>
    </section>
  );
}
