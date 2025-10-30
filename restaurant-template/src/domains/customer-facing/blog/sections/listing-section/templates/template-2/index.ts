import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { ListingContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Listing · Template Two',
  description: 'Editorial grid placeholder awaiting design sign-off.',
  recommendedUse: ['Editorial blog pages'],
  tags: ['listing', 'draft'],
  status: 'draft',
});

export const load: SectionVariantLoader<ListingContent> = async () => ({
  default: (await import('./ListingTemplate2')).default,
});

export { default as ListingTemplate2 } from './ListingTemplate2';
