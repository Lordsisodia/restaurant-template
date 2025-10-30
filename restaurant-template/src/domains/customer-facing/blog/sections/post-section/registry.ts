import type { PostVariant } from './types';
import type { PostContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as PostPrimaryMetadata, PostPrimary } from './templates/primary';
import { metadata as PostTemplate2Metadata, PostTemplate2 } from './templates/template-2';
import { metadata as PostTemplate3Metadata, PostTemplate3 } from './templates/template-3';

export const postRegistry = createSectionRegistry<PostVariant, PostContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: PostPrimaryMetadata.name,
      description: PostPrimaryMetadata.description,
      screenshot: PostPrimaryMetadata.screenshot,
      tags: PostPrimaryMetadata.tags,
      load: async () => ({ default: PostPrimary }),
    },
    'template-2': {
      label: PostTemplate2Metadata.name,
      description: PostTemplate2Metadata.description,
      screenshot: PostTemplate2Metadata.screenshot,
      tags: PostTemplate2Metadata.tags,
      load: async () => ({ default: PostTemplate2 }),
    },
    'template-3': {
      label: PostTemplate3Metadata.name,
      description: PostTemplate3Metadata.description,
      screenshot: PostTemplate3Metadata.screenshot,
      tags: PostTemplate3Metadata.tags,
      load: async () => ({ default: PostTemplate3 }),
    },
  },
});

const components: Record<PostVariant, (props: PostContent) => JSX.Element> = {
  'primary': PostPrimary,
  'template-2': PostTemplate2,
  'template-3': PostTemplate3,
};

export function getPostVariant(variant: string | undefined): PostVariant {
  return resolveVariant(variant, postRegistry);
}

export function getPostComponent(variant: PostVariant) {
  return components[variant];
}

export function listPostVariants() {
  return listVariants(postRegistry);
}
