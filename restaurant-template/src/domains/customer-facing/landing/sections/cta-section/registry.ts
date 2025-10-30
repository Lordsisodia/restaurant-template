import type { CtaVariant } from './types';
import type { CtaContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as CtaPrimaryMetadata, CtaPrimary } from './templates/primary';

export const ctaRegistry = createSectionRegistry<CtaVariant, CtaContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: CtaPrimaryMetadata.name,
      description: CtaPrimaryMetadata.description,
      screenshot: CtaPrimaryMetadata.screenshot,
      tags: CtaPrimaryMetadata.tags,
      load: async () => ({ default: CtaPrimary }),
    },
  },
});

const components: Record<CtaVariant, (props: CtaContent) => JSX.Element> = {
  'primary': CtaPrimary,
};

export function getCtaVariant(variant: string | undefined): CtaVariant {
  return resolveVariant(variant, ctaRegistry);
}

export function getCtaComponent(variant: CtaVariant) {
  return components[variant];
}

export function listCtaVariants() {
  return listVariants(ctaRegistry);
}
