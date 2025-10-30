import type { LoyaltyTopDinersComponent, LoyaltyTopDinersVariant } from './types';
import type { LoyaltyTopDinersContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as LoyaltyTopDinersPrimaryMetadata, LoyaltyTopDinersPrimary } from './templates/primary';
import { metadata as LoyaltyTopDinersTemplate2Metadata, LoyaltyTopDinersTemplate2 } from './templates/template-2';
import { metadata as LoyaltyTopDinersTemplate3Metadata, LoyaltyTopDinersTemplate3 } from './templates/template-3';

export const loyaltyTopDinersRegistry = createSectionRegistry<LoyaltyTopDinersVariant, LoyaltyTopDinersContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: LoyaltyTopDinersPrimaryMetadata.name,
      description: LoyaltyTopDinersPrimaryMetadata.description,
      screenshot: LoyaltyTopDinersPrimaryMetadata.screenshot,
      tags: LoyaltyTopDinersPrimaryMetadata.tags,
      load: async () => ({ default: LoyaltyTopDinersPrimary }),
    },
    'template-2': {
      label: LoyaltyTopDinersTemplate2Metadata.name,
      description: LoyaltyTopDinersTemplate2Metadata.description,
      screenshot: LoyaltyTopDinersTemplate2Metadata.screenshot,
      tags: LoyaltyTopDinersTemplate2Metadata.tags,
      load: async () => ({ default: LoyaltyTopDinersTemplate2 }),
    },
    'template-3': {
      label: LoyaltyTopDinersTemplate3Metadata.name,
      description: LoyaltyTopDinersTemplate3Metadata.description,
      screenshot: LoyaltyTopDinersTemplate3Metadata.screenshot,
      tags: LoyaltyTopDinersTemplate3Metadata.tags,
      load: async () => ({ default: LoyaltyTopDinersTemplate3 }),
    },
  },
});

const components: Record<LoyaltyTopDinersVariant, LoyaltyTopDinersComponent> = {
  'primary': LoyaltyTopDinersPrimary,
  'template-2': LoyaltyTopDinersTemplate2,
  'template-3': LoyaltyTopDinersTemplate3,
};

export function getLoyaltyTopDinersVariant(variant: string | undefined): LoyaltyTopDinersVariant {
  return resolveVariant(variant, loyaltyTopDinersRegistry);
}

export function getLoyaltyTopDinersComponent(variant: LoyaltyTopDinersVariant) {
  return components[variant];
}

export function listLoyaltyTopDinersVariants() {
  return listVariants(loyaltyTopDinersRegistry);
}
