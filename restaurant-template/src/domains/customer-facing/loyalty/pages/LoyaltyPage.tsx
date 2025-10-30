import { listMembers } from '@/domains/customer-facing/loyalty/shared/services';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';

import type { LoyaltyHeroContent } from '../sections/hero';
import { LoyaltyHeroRenderer } from '../sections/hero';
import type { LoyaltyMembershipShowcaseContent } from '../sections/membership-showcase';
import { LoyaltyMembershipShowcaseRenderer } from '../sections/membership-showcase';
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
    }));

  const tiers = [
    {
      title: 'Bronze',
      description:
        'Earn 5% back in points on every order plus a complimentary drink on your second visit.',
    },
    {
      title: 'Gold',
      description:
        'Unlock 10% back, priority reservations on weekends, and double points during festive seasons.',
    },
    {
      title: 'Platinum',
      description:
        'Enjoy chef tasting previews, exclusive invites, and monthly surprise dishes on the house.',
    },
  ];

  const heroContent: LoyaltyHeroContent = {
    eyebrow: 'Membership',
    headline: `Join the ${tenant.displayName} Inner Circle`,
    description: 'Earn points every visit and redeem them for perks, rewards, and birthday treats.',
    primaryCta: {
      href: '/contact',
      label: 'Join the loyalty programme',
    },
    secondaryCta: {
      href: '/menu',
      label: 'Browse the menu',
    },
  };

  const membershipShowcaseContent: LoyaltyMembershipShowcaseContent = {
    title: 'Preview your membership perks',
    description: 'Switch between tiers to see point balances and benefits update in real time.',
    card: {
      name: `${tenant.displayName} Insider`,
    },
  };

  const tierHighlightsContent: LoyaltyTierHighlightsContent = {
    heading: 'Membership tiers at a glance',
    description: 'Invite guests to climb the ladder and unlock richer hospitality moments.',
    tiers,
  };

  const topDinersContent: LoyaltyTopDinersContent = {
    heading: 'Top diners this month',
    subheading: 'Keep dining to climb the ranks.',
    members: leaderboard,
    emptyStateMessage: 'Be the first to join the loyalty programme and claim the top spot.',
    locale: 'id-ID',
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
      <LoyaltyHeroRenderer content={heroContent} />

      <LoyaltyMembershipShowcaseRenderer content={membershipShowcaseContent} />

      <LoyaltyTierHighlightsRenderer content={tierHighlightsContent} />

      <LoyaltyTopDinersRenderer content={topDinersContent} />
    </div>
  );
}
