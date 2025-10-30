import type { Metadata } from 'next';

import LoyaltyPage from '@/domains/customer-facing/loyalty';

export const metadata: Metadata = {
  title: 'Membership',
  description: 'Join Draco’s membership to access exclusive perks, seasonal tastings, and loyalty rewards.',
};

export default function MembershipPage() {
  return <LoyaltyPage />;
}
