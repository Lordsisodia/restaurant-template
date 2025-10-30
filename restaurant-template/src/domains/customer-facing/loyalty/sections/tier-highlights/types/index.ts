import type { ComponentType } from 'react';
import type { LoyaltyTierHighlightsContent } from './schema';

export type LoyaltyTierHighlightsVariant = 'primary' | 'template-2' | 'template-3';

export interface LoyaltyTierHighlightsRendererProps {
  variant?: LoyaltyTierHighlightsVariant;
  content: LoyaltyTierHighlightsContent;
  fallbackVariant?: LoyaltyTierHighlightsVariant;
}

export type LoyaltyTierHighlightsComponent = ComponentType<LoyaltyTierHighlightsContent>;
