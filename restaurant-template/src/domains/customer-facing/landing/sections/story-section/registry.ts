import type { StoryVariant } from './types';
import type { StoryContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as StoryPrimaryMetadata, StoryPrimary } from './templates/primary';

export const storyRegistry = createSectionRegistry<StoryVariant, StoryContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: StoryPrimaryMetadata.name,
      description: StoryPrimaryMetadata.description,
      screenshot: StoryPrimaryMetadata.screenshot,
      tags: StoryPrimaryMetadata.tags,
      load: async () => ({ default: StoryPrimary }),
    },
  },
});

const components: Record<StoryVariant, (props: StoryContent) => JSX.Element> = {
  'primary': StoryPrimary,
};

export function getStoryVariant(variant: string | undefined): StoryVariant {
  return resolveVariant(variant, storyRegistry);
}

export function getStoryComponent(variant: StoryVariant) {
  return components[variant];
}

export function listStoryVariants() {
  return listVariants(storyRegistry);
}
