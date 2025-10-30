import type { LoyaltyMembershipShowcaseComponent, LoyaltyMembershipShowcaseVariant } from './types';
import type { LoyaltyMembershipShowcaseContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as LoyaltyMembershipShowcasePrimaryMetadata, LoyaltyMembershipShowcasePrimary } from './templates/primary';
import { metadata as LoyaltyMembershipShowcaseTemplate2Metadata, LoyaltyMembershipShowcaseTemplate2 } from './templates/template-2';
import { metadata as LoyaltyMembershipShowcaseTemplate3Metadata, LoyaltyMembershipShowcaseTemplate3 } from './templates/template-3';

export const loyaltyMembershipShowcaseRegistry = createSectionRegistry<LoyaltyMembershipShowcaseVariant, LoyaltyMembershipShowcaseContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: LoyaltyMembershipShowcasePrimaryMetadata.name,
      description: LoyaltyMembershipShowcasePrimaryMetadata.description,
      screenshot: LoyaltyMembershipShowcasePrimaryMetadata.screenshot,
      tags: LoyaltyMembershipShowcasePrimaryMetadata.tags,
      load: async () => ({ default: LoyaltyMembershipShowcasePrimary }),
    },
    'template-2': {
      label: LoyaltyMembershipShowcaseTemplate2Metadata.name,
      description: LoyaltyMembershipShowcaseTemplate2Metadata.description,
      screenshot: LoyaltyMembershipShowcaseTemplate2Metadata.screenshot,
      tags: LoyaltyMembershipShowcaseTemplate2Metadata.tags,
      load: async () => ({ default: LoyaltyMembershipShowcaseTemplate2 }),
    },
    'template-3': {
      label: LoyaltyMembershipShowcaseTemplate3Metadata.name,
      description: LoyaltyMembershipShowcaseTemplate3Metadata.description,
      screenshot: LoyaltyMembershipShowcaseTemplate3Metadata.screenshot,
      tags: LoyaltyMembershipShowcaseTemplate3Metadata.tags,
      load: async () => ({ default: LoyaltyMembershipShowcaseTemplate3 }),
    },
  },
});

const components: Record<LoyaltyMembershipShowcaseVariant, LoyaltyMembershipShowcaseComponent> = {
  'primary': LoyaltyMembershipShowcasePrimary,
  'template-2': LoyaltyMembershipShowcaseTemplate2,
  'template-3': LoyaltyMembershipShowcaseTemplate3,
};

export function getLoyaltyMembershipShowcaseVariant(variant: string | undefined): LoyaltyMembershipShowcaseVariant {
  return resolveVariant(variant, loyaltyMembershipShowcaseRegistry);
}

export function getLoyaltyMembershipShowcaseComponent(variant: LoyaltyMembershipShowcaseVariant) {
  return components[variant];
}

export function listLoyaltyMembershipShowcaseVariants() {
  return listVariants(loyaltyMembershipShowcaseRegistry);
}
