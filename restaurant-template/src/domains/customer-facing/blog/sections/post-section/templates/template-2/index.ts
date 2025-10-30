import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { PostContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Post · Template Two',
  description: 'Placeholder for alternate editorial layout.',
  recommendedUse: ['Editorial experiments'],
  tags: ['post', 'draft'],
  status: 'draft',
});

export const load: SectionVariantLoader<PostContent> = async () => ({
  default: (await import('./PostTemplate2')).default,
});

export { default as PostTemplate2 } from './PostTemplate2';
