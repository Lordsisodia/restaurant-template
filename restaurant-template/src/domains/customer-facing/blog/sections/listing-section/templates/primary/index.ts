import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { ListingContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Listing · Primary',
  description: 'Featured carousel, category strips, and grid feed.',
  recommendedUse: ['Blog landing page'],
  tags: ['listing', 'blog'],
});

export const load: SectionVariantLoader<ListingContent> = async () => ({
  default: (await import('./ListingPrimary')).default,
});

export { default as ListingPrimary } from './ListingPrimary';
