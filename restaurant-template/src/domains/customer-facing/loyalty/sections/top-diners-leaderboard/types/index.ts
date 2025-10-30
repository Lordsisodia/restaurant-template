import type { ComponentType } from 'react';
import type { LoyaltyTopDinersContent } from './schema';

export type LoyaltyTopDinersVariant = 'primary' | 'template-2' | 'template-3';

export interface LoyaltyTopDinersRendererProps {
  variant?: LoyaltyTopDinersVariant;
  content: LoyaltyTopDinersContent;
  fallbackVariant?: LoyaltyTopDinersVariant;
}

export type LoyaltyTopDinersComponent = ComponentType<LoyaltyTopDinersContent>;
