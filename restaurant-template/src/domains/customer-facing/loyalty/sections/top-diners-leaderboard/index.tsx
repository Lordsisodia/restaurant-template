import type { LoyaltyTopDinersRendererProps } from './types';
import type { LoyaltyTopDinersVariant } from './types';
import type { LoyaltyTopDinersContent } from './types/schema';
import { loyaltyTopDinersRegistry, getLoyaltyTopDinersVariant, getLoyaltyTopDinersComponent, listLoyaltyTopDinersVariants } from './registry';

export * from './types';
export { loyaltyTopDinersRegistry, listLoyaltyTopDinersVariants };

export function LoyaltyTopDinersRenderer({ variant, fallbackVariant, content }: LoyaltyTopDinersRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyTopDinersVariant(requested);
  const Component = getLoyaltyTopDinersComponent(resolved);
  return Component(content);
}

export function renderLoyaltyTopDiners({ variant, fallbackVariant, content }: LoyaltyTopDinersRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyTopDinersVariant(requested);
  const Component = getLoyaltyTopDinersComponent(resolved);
  return Component(content);
}

export function getLoyaltyTopDinersVariants(): Array<{ key: LoyaltyTopDinersVariant; label: string; description: string }> {
  return listLoyaltyTopDinersVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { LoyaltyTopDinersContent };
