import type { LoyaltyTierHighlightsRendererProps } from './types';
import type { LoyaltyTierHighlightsVariant } from './types';
import type { LoyaltyTierHighlightsContent } from './types/schema';
import { loyaltyTierHighlightsRegistry, getLoyaltyTierHighlightsVariant, getLoyaltyTierHighlightsComponent, listLoyaltyTierHighlightsVariants } from './registry';

export * from './types';
export { loyaltyTierHighlightsRegistry, listLoyaltyTierHighlightsVariants };

export function LoyaltyTierHighlightsRenderer({ variant, fallbackVariant, content }: LoyaltyTierHighlightsRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyTierHighlightsVariant(requested);
  const Component = getLoyaltyTierHighlightsComponent(resolved);
  return Component(content);
}

export function renderLoyaltyTierHighlights({ variant, fallbackVariant, content }: LoyaltyTierHighlightsRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyTierHighlightsVariant(requested);
  const Component = getLoyaltyTierHighlightsComponent(resolved);
  return Component(content);
}

export function getLoyaltyTierHighlightsVariants(): Array<{ key: LoyaltyTierHighlightsVariant; label: string; description: string }> {
  return listLoyaltyTierHighlightsVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { LoyaltyTierHighlightsContent };
