import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Chat Hero · Split Layout',
  description: 'Two-column hero with assistant copy alongside imagery (coming soon).',
  recommendedUse: ['Tablet/desktop hero', 'Image-led assistant promos'],
  tags: ['chat', 'hero', 'split'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroTemplate2')).default,
});

export { default as HeroTemplate2 } from './HeroTemplate2';
