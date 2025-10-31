import type { LoyaltyMembershipShowcaseRendererProps } from './types';
import type { LoyaltyMembershipShowcaseVariant } from './types';
import type { LoyaltyMembershipShowcaseContent } from './types/schema';
import {
  loyaltyMembershipShowcaseRegistry,
  getLoyaltyMembershipShowcaseVariant,
  listLoyaltyMembershipShowcaseVariants,
} from './registry';
import { LoyaltyMembershipShowcasePrimary } from './templates/primary';
import { LoyaltyMembershipShowcaseTemplate2 } from './templates/template-2';
import { LoyaltyMembershipShowcaseTemplate3 } from './templates/template-3';

export * from './types';
export { loyaltyMembershipShowcaseRegistry, listLoyaltyMembershipShowcaseVariants };

export function LoyaltyMembershipShowcaseRenderer({ variant, fallbackVariant, content }: LoyaltyMembershipShowcaseRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyMembershipShowcaseVariant(requested);
  return renderVariant(resolved, content);
}

export function renderLoyaltyMembershipShowcase({ variant, fallbackVariant, content }: LoyaltyMembershipShowcaseRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyMembershipShowcaseVariant(requested);
  return renderVariant(resolved, content);
}

export function getLoyaltyMembershipShowcaseVariants(): Array<{ key: LoyaltyMembershipShowcaseVariant; label: string; description: string }> {
  return listLoyaltyMembershipShowcaseVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { LoyaltyMembershipShowcaseContent };

function renderVariant(variant: LoyaltyMembershipShowcaseVariant, content: LoyaltyMembershipShowcaseContent) {
  switch (variant) {
    case 'primary':
      return <LoyaltyMembershipShowcasePrimary {...content} />;
    case 'template-2':
      return <LoyaltyMembershipShowcaseTemplate2 {...content} />;
    case 'template-3':
      return <LoyaltyMembershipShowcaseTemplate3 {...content} />;
    default: {
      const exhaustiveCheck: never = variant;
      throw new Error(`Unsupported loyalty membership showcase variant: ${exhaustiveCheck}`);
    }
  }
}
