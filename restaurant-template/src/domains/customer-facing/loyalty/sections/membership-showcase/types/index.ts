import type { ComponentType } from 'react';
import type { LoyaltyMembershipShowcaseContent } from './schema';

export type LoyaltyMembershipShowcaseVariant = 'primary' | 'template-2' | 'template-3';

export interface LoyaltyMembershipShowcaseRendererProps {
  variant?: LoyaltyMembershipShowcaseVariant;
  content: LoyaltyMembershipShowcaseContent;
  fallbackVariant?: LoyaltyMembershipShowcaseVariant;
}

export type LoyaltyMembershipShowcaseComponent = ComponentType<LoyaltyMembershipShowcaseContent>;
