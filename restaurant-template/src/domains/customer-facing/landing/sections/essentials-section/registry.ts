import type { EssentialsVariant } from './types';
import type { EssentialsContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as EssentialsPrimaryMetadata, EssentialsPrimary } from './templates/primary';

export const essentialsRegistry = createSectionRegistry<EssentialsVariant, EssentialsContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: EssentialsPrimaryMetadata.name,
      description: EssentialsPrimaryMetadata.description,
      screenshot: EssentialsPrimaryMetadata.screenshot,
      tags: EssentialsPrimaryMetadata.tags,
      load: async () => ({ default: EssentialsPrimary }),
    },
  },
});

const components: Record<EssentialsVariant, (props: EssentialsContent) => JSX.Element> = {
  'primary': EssentialsPrimary,
};

export function getEssentialsVariant(variant: string | undefined): EssentialsVariant {
  return resolveVariant(variant, essentialsRegistry);
}

export function getEssentialsComponent(variant: EssentialsVariant) {
  return components[variant];
}

export function listEssentialsVariants() {
  return listVariants(essentialsRegistry);
}
