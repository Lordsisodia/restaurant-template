import type { LoyaltyTierHighlightsComponent, LoyaltyTierHighlightsVariant } from './types';
import type { LoyaltyTierHighlightsContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as LoyaltyTierHighlightsPrimaryMetadata, LoyaltyTierHighlightsPrimary } from './templates/primary';
import { metadata as LoyaltyTierHighlightsTemplate2Metadata, LoyaltyTierHighlightsTemplate2 } from './templates/template-2';
import { metadata as LoyaltyTierHighlightsTemplate3Metadata, LoyaltyTierHighlightsTemplate3 } from './templates/template-3';

export const loyaltyTierHighlightsRegistry = createSectionRegistry<LoyaltyTierHighlightsVariant, LoyaltyTierHighlightsContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: LoyaltyTierHighlightsPrimaryMetadata.name,
      description: LoyaltyTierHighlightsPrimaryMetadata.description,
      screenshot: LoyaltyTierHighlightsPrimaryMetadata.screenshot,
      tags: LoyaltyTierHighlightsPrimaryMetadata.tags,
      load: async () => ({ default: LoyaltyTierHighlightsPrimary }),
    },
    'template-2': {
      label: LoyaltyTierHighlightsTemplate2Metadata.name,
      description: LoyaltyTierHighlightsTemplate2Metadata.description,
      screenshot: LoyaltyTierHighlightsTemplate2Metadata.screenshot,
      tags: LoyaltyTierHighlightsTemplate2Metadata.tags,
      load: async () => ({ default: LoyaltyTierHighlightsTemplate2 }),
    },
    'template-3': {
      label: LoyaltyTierHighlightsTemplate3Metadata.name,
      description: LoyaltyTierHighlightsTemplate3Metadata.description,
      screenshot: LoyaltyTierHighlightsTemplate3Metadata.screenshot,
      tags: LoyaltyTierHighlightsTemplate3Metadata.tags,
      load: async () => ({ default: LoyaltyTierHighlightsTemplate3 }),
    },
  },
});

const components: Record<LoyaltyTierHighlightsVariant, LoyaltyTierHighlightsComponent> = {
  'primary': LoyaltyTierHighlightsPrimary,
  'template-2': LoyaltyTierHighlightsTemplate2,
  'template-3': LoyaltyTierHighlightsTemplate3,
};

export function getLoyaltyTierHighlightsVariant(variant: string | undefined): LoyaltyTierHighlightsVariant {
  return resolveVariant(variant, loyaltyTierHighlightsRegistry);
}

export function getLoyaltyTierHighlightsComponent(variant: LoyaltyTierHighlightsVariant) {
  return components[variant];
}

export function listLoyaltyTierHighlightsVariants() {
  return listVariants(loyaltyTierHighlightsRegistry);
}
