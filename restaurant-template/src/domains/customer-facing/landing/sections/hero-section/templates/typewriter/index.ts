import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Hero · Typewriter',
  description: 'Animated typewriter headline cycling through key phrases.',
  recommendedUse: ['Product highlights', 'Service value props'],
  tags: ['hero', 'text-animation'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroTypewriter')).default,
});

export { default as HeroTypewriter } from './HeroTypewriter';
