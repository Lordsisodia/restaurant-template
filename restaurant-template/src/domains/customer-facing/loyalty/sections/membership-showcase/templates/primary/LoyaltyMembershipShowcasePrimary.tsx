"use client";

import type { ComponentProps } from 'react';

import { Component as MembershipCard } from '@/components/ui/membership-card';
import { cn } from '@/lib/utils';

import type { LoyaltyMembershipShowcaseContent } from '../../types/schema';

type MembershipCardProps = ComponentProps<typeof MembershipCard>;

export default function LoyaltyMembershipShowcasePrimary(props: LoyaltyMembershipShowcaseContent) {
  const { title, description, className, card } = props;

  const cardProps: MembershipCardProps = {
    ...(card ?? {}),
  };

  return (
    <section className={cn('flex w-full flex-col items-center gap-6 text-center', className)}>
      {(title ?? description) ? (
        <header className="space-y-2">
          {title ? <h2 className="text-2xl font-semibold text-foreground">{title}</h2> : null}
          {description ? (
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">{description}</p>
          ) : null}
        </header>
      ) : null}
      <div className="flex w-full justify-center">
        <MembershipCard {...cardProps} />
      </div>
    </section>
  );
}
