import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { ListingContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Listing · Template Three',
  description: 'Dark experimental feed reserved for future exploration.',
  recommendedUse: ['Concept testing'],
  tags: ['listing', 'draft'],
  status: 'draft',
});

export const load: SectionVariantLoader<ListingContent> = async () => ({
  default: (await import('./ListingTemplate3')).default,
});

export { default as ListingTemplate3 } from './ListingTemplate3';
