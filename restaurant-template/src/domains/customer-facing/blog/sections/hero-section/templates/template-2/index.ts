import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Blog Hero · Template Two',
  description: 'Centered magazine intro layout for upcoming designs.',
  recommendedUse: ['Editorial hero'],
  tags: ['hero', 'blog'],
  status: 'draft',
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroTemplate2')).default,
});

export { default as HeroTemplate2 } from './HeroTemplate2';
