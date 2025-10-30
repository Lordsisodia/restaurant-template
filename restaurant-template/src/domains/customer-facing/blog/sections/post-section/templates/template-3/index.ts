import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { PostContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Post · Template Three',
  description: 'Dark experimental article layout placeholder.',
  recommendedUse: ['Concept testing'],
  tags: ['post', 'draft'],
  status: 'draft',
});

export const load: SectionVariantLoader<PostContent> = async () => ({
  default: (await import('./PostTemplate3')).default,
});

export { default as PostTemplate3 } from './PostTemplate3';
