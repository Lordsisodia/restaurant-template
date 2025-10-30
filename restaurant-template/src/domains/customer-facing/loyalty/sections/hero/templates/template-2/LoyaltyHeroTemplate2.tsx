"use client";

import type { LoyaltyHeroContent } from '../../types/schema';
import LoyaltyHeroPrimary from '../primary/LoyaltyHeroPrimary';

export default function LoyaltyHeroTemplate2(props: LoyaltyHeroContent) {
  return <LoyaltyHeroPrimary {...props} />;
}
