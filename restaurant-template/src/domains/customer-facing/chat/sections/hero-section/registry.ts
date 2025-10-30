import type { HeroVariant } from './types';
import type { HeroContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as HeroPrimaryMetadata, HeroPrimary } from './templates/primary';
import { metadata as HeroTemplate1Metadata, HeroTemplate1 } from './templates/template-1';
import { metadata as HeroTemplate2Metadata, HeroTemplate2 } from './templates/template-2';
import { metadata as HeroTemplate3Metadata, HeroTemplate3 } from './templates/template-3';

export const heroRegistry = createSectionRegistry<HeroVariant, HeroContent>({
  defaultVariant: 'primary',
  variants: {
    'primary': {
      label: HeroPrimaryMetadata.name,
      description: HeroPrimaryMetadata.description,
      screenshot: HeroPrimaryMetadata.screenshot,
      tags: HeroPrimaryMetadata.tags,
      load: async () => ({ default: HeroPrimary }),
    },
    'template-1': {
      label: HeroTemplate1Metadata.name,
      description: HeroTemplate1Metadata.description,
      screenshot: HeroTemplate1Metadata.screenshot,
      tags: HeroTemplate1Metadata.tags,
      load: async () => ({ default: HeroTemplate1 }),
    },
    'template-2': {
      label: HeroTemplate2Metadata.name,
      description: HeroTemplate2Metadata.description,
      screenshot: HeroTemplate2Metadata.screenshot,
      tags: HeroTemplate2Metadata.tags,
      load: async () => ({ default: HeroTemplate2 }),
    },
    'template-3': {
      label: HeroTemplate3Metadata.name,
      description: HeroTemplate3Metadata.description,
      screenshot: HeroTemplate3Metadata.screenshot,
      tags: HeroTemplate3Metadata.tags,
      load: async () => ({ default: HeroTemplate3 }),
    },
  },
});

const components: Record<HeroVariant, (props: HeroContent) => JSX.Element> = {
  'primary': HeroPrimary,
  'template-1': HeroTemplate1,
  'template-2': HeroTemplate2,
  'template-3': HeroTemplate3,
};

export function getHeroVariant(variant: string | undefined): HeroVariant {
  return resolveVariant(variant, heroRegistry);
}

export function getHeroComponent(variant: HeroVariant) {
  return components[variant];
}

export function listHeroVariants() {
  return listVariants(heroRegistry);
}
