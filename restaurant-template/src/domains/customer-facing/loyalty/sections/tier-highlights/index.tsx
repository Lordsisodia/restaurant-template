import type { LoyaltyTierHighlightsRendererProps } from './types';
import type { LoyaltyTierHighlightsVariant } from './types';
import type { LoyaltyTierHighlightsContent } from './types/schema';
import {
  loyaltyTierHighlightsRegistry,
  getLoyaltyTierHighlightsVariant,
  listLoyaltyTierHighlightsVariants,
} from './registry';
import { LoyaltyTierHighlightsPrimary } from './templates/primary';
import { LoyaltyTierHighlightsTemplate2 } from './templates/template-2';
import { LoyaltyTierHighlightsTemplate3 } from './templates/template-3';

export * from './types';
export { loyaltyTierHighlightsRegistry, listLoyaltyTierHighlightsVariants };

export function LoyaltyTierHighlightsRenderer({ variant, fallbackVariant, content }: LoyaltyTierHighlightsRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyTierHighlightsVariant(requested);
  return renderVariant(resolved, content);
}

export function renderLoyaltyTierHighlights({ variant, fallbackVariant, content }: LoyaltyTierHighlightsRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyTierHighlightsVariant(requested);
  return renderVariant(resolved, content);
}

export function getLoyaltyTierHighlightsVariants(): Array<{ key: LoyaltyTierHighlightsVariant; label: string; description: string }> {
  return listLoyaltyTierHighlightsVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { LoyaltyTierHighlightsContent };

function renderVariant(variant: LoyaltyTierHighlightsVariant, content: LoyaltyTierHighlightsContent) {
  switch (variant) {
    case 'primary':
      return <LoyaltyTierHighlightsPrimary {...content} />;
    case 'template-2':
      return <LoyaltyTierHighlightsTemplate2 {...content} />;
    case 'template-3':
      return <LoyaltyTierHighlightsTemplate3 {...content} />;
    default: {
      const exhaustiveCheck: never = variant;
      throw new Error(`Unsupported loyalty tier highlights variant: ${exhaustiveCheck}`);
    }
  }
}
