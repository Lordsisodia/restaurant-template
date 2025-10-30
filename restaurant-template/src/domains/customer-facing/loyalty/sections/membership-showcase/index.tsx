import type { LoyaltyMembershipShowcaseRendererProps } from './types';
import type { LoyaltyMembershipShowcaseVariant } from './types';
import type { LoyaltyMembershipShowcaseContent } from './types/schema';
import { loyaltyMembershipShowcaseRegistry, getLoyaltyMembershipShowcaseVariant, getLoyaltyMembershipShowcaseComponent, listLoyaltyMembershipShowcaseVariants } from './registry';

export * from './types';
export { loyaltyMembershipShowcaseRegistry, listLoyaltyMembershipShowcaseVariants };

export function LoyaltyMembershipShowcaseRenderer({ variant, fallbackVariant, content }: LoyaltyMembershipShowcaseRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyMembershipShowcaseVariant(requested);
  const Component = getLoyaltyMembershipShowcaseComponent(resolved);
  return Component(content);
}

export function renderLoyaltyMembershipShowcase({ variant, fallbackVariant, content }: LoyaltyMembershipShowcaseRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyMembershipShowcaseVariant(requested);
  const Component = getLoyaltyMembershipShowcaseComponent(resolved);
  return Component(content);
}

export function getLoyaltyMembershipShowcaseVariants(): Array<{ key: LoyaltyMembershipShowcaseVariant; label: string; description: string }> {
  return listLoyaltyMembershipShowcaseVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { LoyaltyMembershipShowcaseContent };
