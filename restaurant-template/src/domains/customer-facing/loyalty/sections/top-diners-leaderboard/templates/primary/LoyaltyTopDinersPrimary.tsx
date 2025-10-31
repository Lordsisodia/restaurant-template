"use client";

import { SectionHeading } from '@/domains/shared/components';
import { cn } from '@/lib/utils';

import type { LoyaltyTopDinersContent } from '../../types/schema';

const medalGradients = [
  'from-yellow-400 via-amber-300 to-yellow-500',
  'from-slate-300 via-slate-200 to-slate-400',
  'from-amber-600 via-orange-500 to-amber-700',
];

export default function LoyaltyTopDinersPrimary(props: LoyaltyTopDinersContent) {
  const {
    heading = 'Top diners this month',
    subheading = 'Keep dining to climb the ranks.',
    members,
    emptyStateMessage = 'Be the first to join the loyalty programme and claim the top spot.',
    locale = 'en-US',
  } = props;

  if (members.length === 0) {
    return (
      <section className="space-y-4">
        <SectionHeading
          centered={false}
          title={heading}
          subtitle={subheading}
          as="h2"
          className="mb-2"
          titleClassName="text-xl font-semibold"
          pillText="Leaderboard"
        />
        <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-12 text-center text-muted-foreground">
          {emptyStateMessage}
        </div>
      </section>
    );
  }

  const formatDate = (value: string | null) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
  };

  return (
    <section className="space-y-6">
      <SectionHeading
        centered={false}
        title={heading}
        subtitle={subheading}
        as="h2"
        className="mb-2"
        titleClassName="text-xl font-semibold"
        pillText="Leaderboard"
      />

      <div className="rounded-3xl border border-white/10 bg-background/85 p-4 shadow-lg sm:p-6">
        <ol className="divide-y divide-white/10">
          {members.map((member, index) => {
            const rank = index + 1;
            const isTopThree = rank <= 3;
            const lastVisitFormatted = formatDate(member.lastVisit ?? null);
            return (
              <li
                key={member.id}
                className={cn(
                  'flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4',
                  isTopThree ? 'bg-primary/5 px-4 sm:px-5 rounded-2xl sm:py-5' : 'px-2 sm:px-3',
                )}
              >
                <div className="flex items-start gap-3 sm:items-center">
                  <span
                    className={cn(
                      'mt-1 flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold sm:mt-0',
                      isTopThree
                        ? 'bg-gradient-to-br text-white shadow-md'
                        : 'bg-muted text-muted-foreground',
                      isTopThree ? medalGradients[index] ?? medalGradients[2] : '',
                    )}
                  >
                    #{rank}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{member.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.tier ? `Tier ${member.tier}` : 'Member'}
                      {lastVisitFormatted ? ` • Last visit ${lastVisitFormatted}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    {member.points ?? 0} pts
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
