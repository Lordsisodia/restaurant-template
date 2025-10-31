"use client";

import { SectionHeading } from '@/domains/shared/components';

import type { LoyaltyTopDinersContent } from '../../types/schema';

export default function LoyaltyTopDinersPrimary(props: LoyaltyTopDinersContent) {
  const {
    heading = 'Top diners this month',
    subheading = 'Keep dining to climb the ranks.',
    members,
    emptyStateMessage = 'Be the first to join the loyalty programme and claim the top spot.',
    locale = 'en-US',
  } = props;

  return (
    <section className="space-y-4">
      <SectionHeading
        centered={false}
        title={heading}
        subtitle={subheading}
        as="h2"
        className="mb-2"
        titleClassName="text-xl font-semibold"
      />

      {members.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-12 text-center text-muted-foreground">
          {emptyStateMessage}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="rounded-2xl border border-white/15 bg-background/80 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                    Rank #{index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{member.fullName}</h3>
                  <p className="text-sm text-muted-foreground">
                    Tier:{' '}
                    <span className="font-medium capitalize text-primary">
                      {member.tier ?? 'member'}
                    </span>
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {member.points ?? 0} pts
                </span>
              </div>
              {member.lastVisit ? (
                <p className="mt-4 text-xs text-muted-foreground/80">
                  Last visited {new Date(member.lastVisit).toLocaleDateString(locale)}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
