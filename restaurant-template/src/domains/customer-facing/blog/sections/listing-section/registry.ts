import type { ListingVariant } from './types';
import type { ListingContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as ListingPrimaryMetadata, ListingPrimary } from './templates/primary';
import { metadata as ListingTemplate2Metadata, ListingTemplate2 } from './templates/template-2';
import { metadata as ListingTemplate3Metadata, ListingTemplate3 } from './templates/template-3';

export const listingRegistry = createSectionRegistry<ListingVariant, ListingContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: ListingPrimaryMetadata.name,
      description: ListingPrimaryMetadata.description,
      screenshot: ListingPrimaryMetadata.screenshot,
      tags: ListingPrimaryMetadata.tags,
      load: async () => ({ default: ListingPrimary }),
    },
    'template-2': {
      label: ListingTemplate2Metadata.name,
      description: ListingTemplate2Metadata.description,
      screenshot: ListingTemplate2Metadata.screenshot,
      tags: ListingTemplate2Metadata.tags,
      load: async () => ({ default: ListingTemplate2 }),
    },
    'template-3': {
      label: ListingTemplate3Metadata.name,
      description: ListingTemplate3Metadata.description,
      screenshot: ListingTemplate3Metadata.screenshot,
      tags: ListingTemplate3Metadata.tags,
      load: async () => ({ default: ListingTemplate3 }),
    },
  },
});

const components: Record<ListingVariant, (props: ListingContent) => JSX.Element> = {
  'primary': ListingPrimary,
  'template-2': ListingTemplate2,
  'template-3': ListingTemplate3,
};

export function getListingVariant(variant: string | undefined): ListingVariant {
  return resolveVariant(variant, listingRegistry);
}

export function getListingComponent(variant: ListingVariant) {
  return components[variant];
}

export function listListingVariants() {
  return listVariants(listingRegistry);
}
