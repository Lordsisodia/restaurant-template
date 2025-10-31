import type { LoyaltyTopDinersRendererProps } from './types';
import type { LoyaltyTopDinersVariant } from './types';
import type { LoyaltyTopDinersContent } from './types/schema';
import {
  loyaltyTopDinersRegistry,
  getLoyaltyTopDinersVariant,
  listLoyaltyTopDinersVariants,
} from './registry';
import { LoyaltyTopDinersPrimary } from './templates/primary';
import { LoyaltyTopDinersTemplate2 } from './templates/template-2';
import { LoyaltyTopDinersTemplate3 } from './templates/template-3';

export * from './types';
export { loyaltyTopDinersRegistry, listLoyaltyTopDinersVariants };

export function LoyaltyTopDinersRenderer({ variant, fallbackVariant, content }: LoyaltyTopDinersRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyTopDinersVariant(requested);
  return renderVariant(resolved, content);
}

export function renderLoyaltyTopDiners({ variant, fallbackVariant, content }: LoyaltyTopDinersRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyTopDinersVariant(requested);
  return renderVariant(resolved, content);
}

export function getLoyaltyTopDinersVariants(): Array<{ key: LoyaltyTopDinersVariant; label: string; description: string }> {
  return listLoyaltyTopDinersVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { LoyaltyTopDinersContent };

function renderVariant(variant: LoyaltyTopDinersVariant, content: LoyaltyTopDinersContent) {
  switch (variant) {
    case 'primary':
      return <LoyaltyTopDinersPrimary {...content} />;
    case 'template-2':
      return <LoyaltyTopDinersTemplate2 {...content} />;
    case 'template-3':
      return <LoyaltyTopDinersTemplate3 {...content} />;
    default: {
      const exhaustiveCheck: never = variant;
      throw new Error(`Unsupported loyalty top diners variant: ${exhaustiveCheck}`);
    }
  }
}
