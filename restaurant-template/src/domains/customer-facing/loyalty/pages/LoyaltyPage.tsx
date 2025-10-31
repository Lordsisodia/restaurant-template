import { listMembers } from '@/domains/customer-facing/loyalty/shared/services';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';
import { Badge, SectionHeading } from '@/domains/shared/components';
import { Component as MembershipCard } from '@/components/ui/membership-card';
import type { LoyaltyTopDinersContent } from '../sections/top-diners-leaderboard';
import { LoyaltyTopDinersRenderer } from '../sections/top-diners-leaderboard';

export default async function LoyaltyPage() {
  const tenant = await getTenantFromRequest();
  const members = await listMembers();
  const leaderboard = [...members]
    .sort((a, b) => (b.points ?? 0) - (a.points ?? 0))
    .slice(0, 10)
    .map((member) => ({
      id: member.id,
      fullName: member.fullName,
      tier: member.tier,
      points: member.points,
      lastVisit: member.lastVisit,
      createdAt: member.createdAt,
    }));

  const fallbackLeaderboard = [
    {
      id: 'sample-nadia',
      fullName: 'Nadia Prasetyo',
      tier: 'Diamond',
      points: 68400,
      lastVisit: '2025-10-29',
      createdAt: '2024-12-02',
    },
    {
      id: 'sample-maria',
      fullName: 'Maria Lontoh',
      tier: 'Diamond',
      points: 58200,
      lastVisit: '2025-10-28',
      createdAt: '2022-05-08',
    },
    {
      id: 'sample-andre',
      fullName: 'Andre Wirawan',
      tier: 'Gold',
      points: 27600,
      lastVisit: '2025-10-27',
      createdAt: '2023-08-14',
    },
    {
      id: 'sample-kevin',
      fullName: 'Kevin Lee',
      tier: 'Gold',
      points: 22800,
      lastVisit: '2025-10-18',
      createdAt: '2024-07-22',
    },
    {
      id: 'sample-fajar',
      fullName: 'Fajar Nugroho',
      tier: 'Gold',
      points: 21300,
      lastVisit: '2025-10-24',
      createdAt: '2023-02-16',
    },
    {
      id: 'sample-lucia',
      fullName: 'Lucia Fernandez',
      tier: 'Silver',
      points: 7800,
      lastVisit: '2025-10-25',
      createdAt: '2024-04-09',
    },
    {
      id: 'sample-siti',
      fullName: 'Siti Rahma',
      tier: 'Silver',
      points: 6400,
      lastVisit: '2025-10-20',
      createdAt: '2024-03-05',
    },
    {
      id: 'sample-putri',
      fullName: 'Putri Anggraini',
      tier: 'Silver',
      points: 5400,
      lastVisit: '2025-10-15',
      createdAt: '2024-06-30',
    },
    {
      id: 'sample-hendra',
      fullName: 'Hendra Saputra',
      tier: 'Bronze',
      points: 2400,
      lastVisit: '2025-10-22',
      createdAt: '2023-11-18',
    },
    {
      id: 'sample-rizky',
      fullName: 'Rizky Prabowo',
      tier: 'Bronze',
      points: 2050,
      lastVisit: '2025-10-12',
      createdAt: '2024-01-11',
    },
  ];

  const hasLiveMembers = leaderboard.length > 0;
  const displayedLeaderboard = hasLiveMembers ? leaderboard : fallbackLeaderboard;
  const fallbackFeaturedMember = {
    id: 'guest-member',
    fullName: `${tenant.displayName} Member`,
    tier: 'bronze',
    points: 0,
    lastVisit: null,
    createdAt: '',
  };
  const featuredMember = hasLiveMembers ? leaderboard[0] : fallbackFeaturedMember;

  const tierOrder = ['bronze', 'silver', 'gold', 'diamond'] as const;
  const IDR_PER_POINT = 1_000;
  const tierThresholds: Record<(typeof tierOrder)[number], number> = {
    bronze: Math.floor(2_000_000 / IDR_PER_POINT),
    silver: Math.floor(5_000_000 / IDR_PER_POINT),
    gold: Math.floor(20_000_000 / IDR_PER_POINT),
    diamond: Math.floor(50_000_000 / IDR_PER_POINT),
  };

  const memberTierRaw = (featuredMember?.tier ?? 'gold').toString().toLowerCase();
  const memberTier = (tierOrder.find((tier) => tier === memberTierRaw) ?? 'bronze') as (typeof tierOrder)[number];

  const memberPoints = featuredMember?.points ?? 0;
  const determineNextTier = (points: number) => {
    if (points < tierThresholds.bronze) return 'bronze';
    if (points < tierThresholds.silver) return 'silver';
    if (points < tierThresholds.gold) return 'gold';
    if (points < tierThresholds.diamond) return 'diamond';
    return null;
  };
  const nextTierKey = determineNextTier(memberPoints);
  const nextTierLabel = nextTierKey ? nextTierKey.charAt(0).toUpperCase() + nextTierKey.slice(1) : 'Diamond';
  const pointsToNextTier = nextTierKey ? Math.max(tierThresholds[nextTierKey] - memberPoints, 0) : 0;

  const memberSince = featuredMember?.createdAt
    ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(featuredMember.createdAt))
    : featuredMember?.lastVisit
    ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(featuredMember.lastVisit))
    : undefined;

  const membershipHeading = {
    title: 'Membership Perks Snapshot',
    subtitle: 'Earn 1 point for every IDR 1,000 spent. Tap a tier to preview how Draco rewards grow for loyal guests.',
    pillText: 'Membership',
    pillTone: 'light' as const,
    titleClassName: 'text-3xl font-semibold sm:text-4xl',
  };

  const membershipCardProps = {
    name: featuredMember?.fullName ?? `${tenant.displayName} Member`,
    tier: memberTier,
    points: memberPoints,
    nextTier: nextTierLabel,
    pointsToNextTier,
    memberSince,
    benefits: [
      'Earn 1 point for every IDR 1,000 spent',
      'Track your progress toward Bronze status',
      'Unlock tiered savings once you reach Silver',
      'Birthday dessert when you hit Bronze',
  ],
  } as const;

  const topDinersContent: LoyaltyTopDinersContent = {
    heading: 'Top diners this month',
    subheading: 'Keep dining to climb the ranks and unlock richer perks.',
    members: displayedLeaderboard,
    emptyStateMessage: 'Keep visiting Draco to appear on this leaderboard and unlock more perks.',
    locale: 'id-ID',
  };

  const idrFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const membershipTiers = [
    {
      name: 'Bronze',
      spendRequirement: 2_000_000,
      discountLabel: 'Welcome tier perks',
      perks: ['Complimentary latte on your 3rd visit', 'Birthday dessert for two'],
    },
    {
      name: 'Silver',
      spendRequirement: 5_000_000,
      discountLabel: '10% off every visit',
      perks: ['Priority reservations', 'Double points every Wednesday'],
    },
    {
      name: 'Gold',
      spendRequirement: 20_000_000,
      discountLabel: '15% off + tasting nights',
      perks: ['Chef’s table RSVP line', 'Monthly complimentary pairings'],
    },
    {
      name: 'Diamond',
      spendRequirement: 50_000_000,
      discountLabel: '20% off + concierge access',
      perks: ['Hosted lounge seating', 'Private barista workshops', 'Complimentary event access'],
    },
  ];

  const membershipCardTierDetails = {
    bronze: {
      points: tierThresholds.bronze,
      nextTier: 'silver',
      nextTierLabel: 'Silver',
      pointsToNextTier: tierThresholds.silver - tierThresholds.bronze,
      benefits: [
        'Welcome latte on your 3rd visit',
        'Birthday dessert for two',
        'Access to member-only tastings waitlist',
      ],
      cardBackground: 'bg-gradient-to-br from-amber-900/40 via-amber-700/25 to-amber-500/20',
    },
    silver: {
      points: tierThresholds.silver,
      nextTier: 'gold',
      nextTierLabel: 'Gold',
      pointsToNextTier: tierThresholds.gold - tierThresholds.silver,
      benefits: [
        '10% off every visit',
        'Priority reservations any night',
        'Double points every Wednesday',
      ],
      cardBackground: 'bg-gradient-to-br from-slate-900/35 via-slate-700/25 to-slate-500/20',
    },
    gold: {
      points: tierThresholds.gold,
      nextTier: 'diamond',
      nextTierLabel: 'Diamond',
      pointsToNextTier: tierThresholds.diamond - tierThresholds.gold,
      benefits: [
        '15% off food & drink',
        'Chef-led tasting night invitations',
        'Complimentary monthly pairings',
      ],
      cardBackground: 'bg-gradient-to-br from-yellow-900/30 via-amber-700/25 to-yellow-500/20',
    },
    diamond: {
      points: tierThresholds.diamond,
      nextTier: null,
      nextTierLabel: 'Max Tier',
      pointsToNextTier: 0,
      benefits: [
        '20% off plus concierge event planning',
        'Private barista workshops',
        'Hosted lounge seating & VIP access',
      ],
      cardBackground: 'bg-gradient-to-br from-sky-900/30 via-sky-700/25 to-emerald-500/20',
    },
  } as const;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 pb-16 pt-24 sm:pt-28">
      <section className="flex flex-col items-center gap-8 text-center">
        <SectionHeading centered {...membershipHeading} />
        <MembershipCard {...membershipCardProps} tierDetails={membershipCardTierDetails} />
      </section>

      <section className="space-y-6 rounded-3xl border border-white/10 bg-background/90 p-8 shadow-xl backdrop-blur-sm sm:p-10">
        <SectionHeading
          centered={false}
          title="Tier progression & rewards"
          subtitle="Hit these spend milestones to auto-unlock deeper savings and hospitality perks."
          as="h2"
          titleClassName="text-2xl font-semibold"
          pillText="Tier Progress"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {membershipTiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-2xl border border-white/10 bg-background/95 p-6 shadow-md"
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">{tier.name}</p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{tier.discountLabel}</h3>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">
                    {idrFormatter.format(tier.spendRequirement)}
                  </p>
                  <p className="text-xs">Spend-to-date</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {tier.perks.map((perk) => (
                  <Badge key={perk} variant="outline" className="border-white/20 bg-white/5 text-xs font-medium text-foreground">
                    {perk}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <LoyaltyTopDinersRenderer content={topDinersContent} />
    </div>
  );
}
