"use client";

import type { LoyaltyTierHighlightsContent } from '../../types/schema';
import LoyaltyTierHighlightsPrimary from '../primary/LoyaltyTierHighlightsPrimary';

export default function LoyaltyTierHighlightsTemplate2(props: LoyaltyTierHighlightsContent) {
  return <LoyaltyTierHighlightsPrimary {...props} />;
}
