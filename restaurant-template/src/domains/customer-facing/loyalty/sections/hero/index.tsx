import type { LoyaltyHeroRendererProps } from './types';
import type { LoyaltyHeroVariant } from './types';
import type { LoyaltyHeroContent } from './types/schema';
import { loyaltyHeroRegistry, getLoyaltyHeroVariant, getLoyaltyHeroComponent, listLoyaltyHeroVariants } from './registry';

export * from './types';
export { loyaltyHeroRegistry, listLoyaltyHeroVariants };

export function LoyaltyHeroRenderer({ variant, fallbackVariant, content }: LoyaltyHeroRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyHeroVariant(requested);
  const Component = getLoyaltyHeroComponent(resolved);
  return Component(content);
}

export function renderLoyaltyHero({ variant, fallbackVariant, content }: LoyaltyHeroRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyHeroVariant(requested);
  const Component = getLoyaltyHeroComponent(resolved);
  return Component(content);
}

export function getLoyaltyHeroVariants(): Array<{ key: LoyaltyHeroVariant; label: string; description: string }> {
  return listLoyaltyHeroVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { LoyaltyHeroContent };
