import type { QuickRepliesVariant } from './types';
import type { QuickRepliesContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as QuickRepliesPrimaryMetadata, QuickRepliesPrimary } from './templates/primary';

export const quickRepliesRegistry = createSectionRegistry<QuickRepliesVariant, QuickRepliesContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: QuickRepliesPrimaryMetadata.name,
      description: QuickRepliesPrimaryMetadata.description,
      screenshot: QuickRepliesPrimaryMetadata.screenshot,
      tags: QuickRepliesPrimaryMetadata.tags,
      load: async () => ({ default: QuickRepliesPrimary }),
    },
  },
});

const components: Record<QuickRepliesVariant, (props: QuickRepliesContent) => JSX.Element> = {
  'primary': QuickRepliesPrimary,
};

export function getQuickRepliesVariant(variant: string | undefined): QuickRepliesVariant {
  return resolveVariant(variant, quickRepliesRegistry);
}

export function getQuickRepliesComponent(variant: QuickRepliesVariant) {
  return components[variant];
}

export function listQuickRepliesVariants() {
  return listVariants(quickRepliesRegistry);
}
