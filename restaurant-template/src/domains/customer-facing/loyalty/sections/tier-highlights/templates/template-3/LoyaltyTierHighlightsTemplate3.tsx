"use client";

import type { LoyaltyTierHighlightsContent } from '../../types/schema';
import LoyaltyTierHighlightsPrimary from '../primary/LoyaltyTierHighlightsPrimary';

export default function LoyaltyTierHighlightsTemplate3(props: LoyaltyTierHighlightsContent) {
  return <LoyaltyTierHighlightsPrimary {...props} />;
}
