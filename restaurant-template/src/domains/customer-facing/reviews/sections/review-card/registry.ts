import type { ReviewCardVariant, ReviewCardComponent, ReviewCardComponentProps } from './types';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as ReviewCardPrimaryMetadata, ReviewCardPrimary } from './templates/primary';

export const reviewCardRegistry = createSectionRegistry<ReviewCardVariant, ReviewCardComponentProps>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: ReviewCardPrimaryMetadata.name,
      description: ReviewCardPrimaryMetadata.description,
      screenshot: ReviewCardPrimaryMetadata.screenshot,
      tags: ReviewCardPrimaryMetadata.tags,
      load: async () => ({ default: ReviewCardPrimary }),
    },
  },
});

const components: Record<ReviewCardVariant, ReviewCardComponent> = {
  primary: ReviewCardPrimary,
};

export function getReviewCardVariant(variant: string | undefined): ReviewCardVariant {
  return resolveVariant(variant, reviewCardRegistry);
}

export function getReviewCardComponent(variant: ReviewCardVariant) {
  return components[variant];
}

export function listReviewCardVariants() {
  return listVariants(reviewCardRegistry);
}
