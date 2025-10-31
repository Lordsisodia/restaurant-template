import { listMembers } from '@/domains/customer-facing/loyalty/shared/services';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';
import { SectionHeading } from '@/domains/shared/components';
import { Component as MembershipCard } from '@/components/ui/membership-card';
import type { LoyaltyTierHighlightsContent } from '../sections/tier-highlights';
import { LoyaltyTierHighlightsRenderer } from '../sections/tier-highlights';
import type { LoyaltyTopDinersContent } from '../sections/top-diners-leaderboard';
import { LoyaltyTopDinersRenderer } from '../sections/top-diners-leaderboard';

export default async function LoyaltyPage() {
  const tenant = await getTenantFromRequest();
  const members = await listMembers();
  const leaderboard = [...members]
    .sort((a, b) => (b.points ?? 0) - (a.points ?? 0))
    .slice(0, 6)
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
      points: 3480,
      lastVisit: '2025-10-29',
      createdAt: '2024-12-02',
    },
    {
      id: 'sample-andre',
      fullName: 'Andre Wirawan',
      tier: 'Gold',
      points: 2750,
      lastVisit: '2025-10-27',
      createdAt: '2023-08-14',
    },
    {
      id: 'sample-lucia',
      fullName: 'Lucia Fernandez',
      tier: 'Silver',
      points: 1890,
      lastVisit: '2025-10-25',
      createdAt: '2024-04-09',
    },
  ];

  const displayedLeaderboard = leaderboard.length > 0 ? leaderboard : fallbackLeaderboard;
  const featuredMember = displayedLeaderboard[0];

  const tierOrder = ['bronze', 'silver', 'gold', 'diamond'] as const;
  const tierThresholds: Record<(typeof tierOrder)[number], number> = {
    bronze: 0,
    silver: 500,
    gold: 1500,
    diamond: 3000,
  };

  const memberTierRaw = (featuredMember?.tier ?? 'gold').toString().toLowerCase();
  const memberTier = (tierOrder.find((tier) => tier === memberTierRaw) ?? 'bronze') as (typeof tierOrder)[number];

  const memberPoints = featuredMember?.points ?? 0;
  const memberTierIndex = tierOrder.indexOf(memberTier);
  const nextTier = memberTierIndex >= 0 && memberTierIndex < tierOrder.length - 1
    ? tierOrder[memberTierIndex + 1]
    : 'diamond';
  const nextTierLabel = nextTier.charAt(0).toUpperCase() + nextTier.slice(1);
  const rawPointsToNextTier = tierThresholds[nextTier] - memberPoints;
  const pointsToNextTier = memberTierIndex === tierOrder.length - 1 ? 0 : Math.max(rawPointsToNextTier, 0);

  const memberSince = featuredMember?.createdAt
    ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(featuredMember.createdAt))
    : featuredMember?.lastVisit
    ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(featuredMember.lastVisit))
    : undefined;

  const tiers = [
    {
      title: 'Bronze',
      description: 'Earn 5% back in points and unlock a complimentary welcome pastry on visit number three.',
    },
    {
      title: 'Silver',
      description: 'Collect 7% back, receive early access to new seasonal drinks, and secure weekday reservations.',
    },
    {
      title: 'Gold',
      description: 'Enjoy 12% back, barista-led tasting nights, and double points during Draco anniversary weeks.',
    },
    {
      title: 'Diamond',
      description: 'Unlock concierge planning, monthly chef surprises, and complimentary coffee pairings for your table.',
    },
  ];

  const membershipHeading = {
    title: 'Membership Perks Snapshot',
    subtitle: 'Tap a tier to preview how Draco rewards grow for loyal guests.',
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
      'Cold brew flight after visit five',
      'Chef pairing dinner invites',
      'Priority latte art sessions',
      'Birthday dessert for two',
    ],
  } as const;

  const tierHighlightsContent: LoyaltyTierHighlightsContent = {
    heading: 'Membership tiers at a glance',
    description: 'Invite guests to climb the ladder and unlock richer hospitality moments.',
    tiers,
  };

  const topDinersContent: LoyaltyTopDinersContent = {
    heading: 'Top diners this month',
    subheading: 'Keep dining to climb the ranks.',
    members: displayedLeaderboard,
    emptyStateMessage: 'Keep visiting Draco to appear on this leaderboard and unlock more perks.',
    locale: 'id-ID',
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-6 pb-16 pt-24 sm:pt-28">
      <section className="flex flex-col items-center gap-8 text-center">
        <SectionHeading centered {...membershipHeading} />
        <MembershipCard {...membershipCardProps} />
      </section>

      <LoyaltyTierHighlightsRenderer content={tierHighlightsContent} />

      <LoyaltyTopDinersRenderer content={topDinersContent} />
    </div>
  );
}
