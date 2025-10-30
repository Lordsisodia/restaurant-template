import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { PostContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Post · Primary',
  description: 'Image-led article layout with meta header and flexible footer.',
  recommendedUse: ['Blog detail page'],
  tags: ['post', 'article'],
});

export const load: SectionVariantLoader<PostContent> = async () => ({
  default: (await import('./PostPrimary')).default,
});

export { default as PostPrimary } from './PostPrimary';
