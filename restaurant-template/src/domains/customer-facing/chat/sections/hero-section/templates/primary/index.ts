import type { SectionVariantLoader } from '@/domains/shared/section-tools';
import { defineTemplateMetadata } from '@/domains/shared/section-tools';
import type { HeroContent } from '../../types/schema';

export const metadata = defineTemplateMetadata({
  name: 'Chat Hero · Assistant CTA',
  description: 'Badge-led hero that highlights the chat assistant with dual CTAs.',
  recommendedUse: ['Chat landing pages', 'Assistant onboarding'],
  tags: ['chat', 'hero', 'assistant'],
});

export const load: SectionVariantLoader<HeroContent> = async () => ({
  default: (await import('./HeroPrimary')).default,
});

export { default as HeroPrimary } from './HeroPrimary';
