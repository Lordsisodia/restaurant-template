import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Chat Hero · Gradient',
  description: 'Alternate styling for the assistant hero with gradient emphasis.',
  recommendedUse: ['Marketing campaigns', 'Seasonal styling'],
  tags: ['chat', 'hero', 'gradient'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroTemplate1')).default,
});

export { default as HeroTemplate1 } from './HeroTemplate1';
