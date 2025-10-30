import type { LoyaltyHeroComponent, LoyaltyHeroVariant } from './types';
import type { LoyaltyHeroContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as LoyaltyHeroPrimaryMetadata, LoyaltyHeroPrimary } from './templates/primary';
import { metadata as LoyaltyHeroTemplate2Metadata, LoyaltyHeroTemplate2 } from './templates/template-2';
import { metadata as LoyaltyHeroTemplate3Metadata, LoyaltyHeroTemplate3 } from './templates/template-3';

export const loyaltyHeroRegistry = createSectionRegistry<LoyaltyHeroVariant, LoyaltyHeroContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: LoyaltyHeroPrimaryMetadata.name,
      description: LoyaltyHeroPrimaryMetadata.description,
      screenshot: LoyaltyHeroPrimaryMetadata.screenshot,
      tags: LoyaltyHeroPrimaryMetadata.tags,
      load: async () => ({ default: LoyaltyHeroPrimary }),
    },
    'template-2': {
      label: LoyaltyHeroTemplate2Metadata.name,
      description: LoyaltyHeroTemplate2Metadata.description,
      screenshot: LoyaltyHeroTemplate2Metadata.screenshot,
      tags: LoyaltyHeroTemplate2Metadata.tags,
      load: async () => ({ default: LoyaltyHeroTemplate2 }),
    },
    'template-3': {
      label: LoyaltyHeroTemplate3Metadata.name,
      description: LoyaltyHeroTemplate3Metadata.description,
      screenshot: LoyaltyHeroTemplate3Metadata.screenshot,
      tags: LoyaltyHeroTemplate3Metadata.tags,
      load: async () => ({ default: LoyaltyHeroTemplate3 }),
    },
  },
});

const components: Record<LoyaltyHeroVariant, LoyaltyHeroComponent> = {
  'primary': LoyaltyHeroPrimary,
  'template-2': LoyaltyHeroTemplate2,
  'template-3': LoyaltyHeroTemplate3,
};

export function getLoyaltyHeroVariant(variant: string | undefined): LoyaltyHeroVariant {
  return resolveVariant(variant, loyaltyHeroRegistry);
}

export function getLoyaltyHeroComponent(variant: LoyaltyHeroVariant) {
  return components[variant];
}

export function listLoyaltyHeroVariants() {
  return listVariants(loyaltyHeroRegistry);
}
