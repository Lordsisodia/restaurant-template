import type { ComponentType } from 'react';
import type { LoyaltyHeroContent } from './schema';

export type LoyaltyHeroVariant = 'primary' | 'template-2' | 'template-3';

export interface LoyaltyHeroRendererProps {
  variant?: LoyaltyHeroVariant;
  content: LoyaltyHeroContent;
  fallbackVariant?: LoyaltyHeroVariant;
}

export type LoyaltyHeroComponent = ComponentType<LoyaltyHeroContent>;
