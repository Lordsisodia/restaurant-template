import type { Metadata } from 'next';

import LandingPage from '@/domains/customer-facing/landing';

export const metadata: Metadata = {
  title: 'Draco Coffee & Eatery',
  description: 'Discover signature dishes, specialty coffee, and the story behind Draco Coffee & Eatery in Denpasar.',
};

export default async function HomePage() {
  return <LandingPage />;
}
