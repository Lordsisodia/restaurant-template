import type { LoyaltyHeroRendererProps } from './types';
import type { LoyaltyHeroVariant } from './types';
import type { LoyaltyHeroContent } from './types/schema';
import { loyaltyHeroRegistry, getLoyaltyHeroVariant, listLoyaltyHeroVariants } from './registry';
import { LoyaltyHeroPrimary } from './templates/primary';
import { LoyaltyHeroTemplate2 } from './templates/template-2';
import { LoyaltyHeroTemplate3 } from './templates/template-3';

export * from './types';
export { loyaltyHeroRegistry, listLoyaltyHeroVariants };

export function LoyaltyHeroRenderer({ variant, fallbackVariant, content }: LoyaltyHeroRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyHeroVariant(requested);
  return renderVariant(resolved, content);
}

export function renderLoyaltyHero({ variant, fallbackVariant, content }: LoyaltyHeroRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getLoyaltyHeroVariant(requested);
  return renderVariant(resolved, content);
}

export function getLoyaltyHeroVariants(): Array<{ key: LoyaltyHeroVariant; label: string; description: string }> {
  return listLoyaltyHeroVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { LoyaltyHeroContent };

function renderVariant(variant: LoyaltyHeroVariant, content: LoyaltyHeroContent) {
  switch (variant) {
    case 'primary':
      return <LoyaltyHeroPrimary {...content} />;
    case 'template-2':
      return <LoyaltyHeroTemplate2 {...content} />;
    case 'template-3':
      return <LoyaltyHeroTemplate3 {...content} />;
    default: {
      const exhaustiveCheck: never = variant;
      throw new Error(`Unsupported loyalty hero variant: ${exhaustiveCheck}`);
    }
  }
}
