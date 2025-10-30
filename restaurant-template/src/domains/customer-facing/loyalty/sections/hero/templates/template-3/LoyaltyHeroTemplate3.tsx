"use client";

import type { LoyaltyHeroContent } from '../../types/schema';
import LoyaltyHeroPrimary from '../primary/LoyaltyHeroPrimary';

export default function LoyaltyHeroTemplate3(props: LoyaltyHeroContent) {
  return <LoyaltyHeroPrimary {...props} />;
}
