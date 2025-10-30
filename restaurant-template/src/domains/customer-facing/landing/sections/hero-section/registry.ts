import type { HeroVariant } from './types';
import type { HeroContent } from './types/schema';
import { createSectionRegistry, listVariants, resolveVariant } from '@/domains/shared/section-tools';
import { metadata as HeroPrimaryMetadata, HeroPrimary } from './templates/primary';
import { metadata as HeroClassicCenterMetadata, HeroClassicCenter } from './templates/classic-center';
import { metadata as HeroGradientWordsMetadata, HeroGradientWords } from './templates/gradient-words';
import { metadata as HeroLogoCenterMetadata, HeroLogoCenter } from './templates/logo-center';
import { metadata as HeroMinimalCenterMetadata, HeroMinimalCenter } from './templates/minimal-center';
import { metadata as HeroSplitLeftMetadata, HeroSplitLeft } from './templates/split-left';
import { metadata as HeroVideoOverlayMetadata, HeroVideoOverlay } from './templates/video-overlay';
import { metadata as HeroAnimatedTextMetadata, HeroAnimatedText } from './templates/animated-text';
import { metadata as HeroTypewriterMetadata, HeroTypewriter } from './templates/typewriter';
import { metadata as HeroBlurFadeMetadata, HeroBlurFade } from './templates/blur-fade';
import { metadata as HeroFlipWordsMetadata, HeroFlipWords } from './templates/flip-words';
import { metadata as HeroTypingAnimationMetadata, HeroTypingAnimation } from './templates/typing-animation';
import { metadata as HeroMagicRevealMetadata, HeroMagicReveal } from './templates/magic-reveal';
import { metadata as HeroRevealTextMetadata, HeroRevealText } from './templates/reveal-text';
import { metadata as HeroSamsungEffectMetadata, HeroSamsungEffect } from './templates/samsung-effect';

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
    'classic-center': {
      label: HeroClassicCenterMetadata.name,
      description: HeroClassicCenterMetadata.description,
      screenshot: HeroClassicCenterMetadata.screenshot,
      tags: HeroClassicCenterMetadata.tags,
      load: async () => ({ default: HeroClassicCenter }),
    },
    'gradient-words': {
      label: HeroGradientWordsMetadata.name,
      description: HeroGradientWordsMetadata.description,
      screenshot: HeroGradientWordsMetadata.screenshot,
      tags: HeroGradientWordsMetadata.tags,
      load: async () => ({ default: HeroGradientWords }),
    },
    'logo-center': {
      label: HeroLogoCenterMetadata.name,
      description: HeroLogoCenterMetadata.description,
      screenshot: HeroLogoCenterMetadata.screenshot,
      tags: HeroLogoCenterMetadata.tags,
      load: async () => ({ default: HeroLogoCenter }),
    },
    'minimal-center': {
      label: HeroMinimalCenterMetadata.name,
      description: HeroMinimalCenterMetadata.description,
      screenshot: HeroMinimalCenterMetadata.screenshot,
      tags: HeroMinimalCenterMetadata.tags,
      load: async () => ({ default: HeroMinimalCenter }),
    },
    'split-left': {
      label: HeroSplitLeftMetadata.name,
      description: HeroSplitLeftMetadata.description,
      screenshot: HeroSplitLeftMetadata.screenshot,
      tags: HeroSplitLeftMetadata.tags,
      load: async () => ({ default: HeroSplitLeft }),
    },
    'video-overlay': {
      label: HeroVideoOverlayMetadata.name,
      description: HeroVideoOverlayMetadata.description,
      screenshot: HeroVideoOverlayMetadata.screenshot,
      tags: HeroVideoOverlayMetadata.tags,
      load: async () => ({ default: HeroVideoOverlay }),
    },
    'animated-text': {
      label: HeroAnimatedTextMetadata.name,
      description: HeroAnimatedTextMetadata.description,
      screenshot: HeroAnimatedTextMetadata.screenshot,
      tags: HeroAnimatedTextMetadata.tags,
      load: async () => ({ default: HeroAnimatedText }),
    },
    'typewriter': {
      label: HeroTypewriterMetadata.name,
      description: HeroTypewriterMetadata.description,
      screenshot: HeroTypewriterMetadata.screenshot,
      tags: HeroTypewriterMetadata.tags,
      load: async () => ({ default: HeroTypewriter }),
    },
    'blur-fade': {
      label: HeroBlurFadeMetadata.name,
      description: HeroBlurFadeMetadata.description,
      screenshot: HeroBlurFadeMetadata.screenshot,
      tags: HeroBlurFadeMetadata.tags,
      load: async () => ({ default: HeroBlurFade }),
    },
    'flip-words': {
      label: HeroFlipWordsMetadata.name,
      description: HeroFlipWordsMetadata.description,
      screenshot: HeroFlipWordsMetadata.screenshot,
      tags: HeroFlipWordsMetadata.tags,
      load: async () => ({ default: HeroFlipWords }),
    },
    'typing-animation': {
      label: HeroTypingAnimationMetadata.name,
      description: HeroTypingAnimationMetadata.description,
      screenshot: HeroTypingAnimationMetadata.screenshot,
      tags: HeroTypingAnimationMetadata.tags,
      load: async () => ({ default: HeroTypingAnimation }),
    },
    'magic-reveal': {
      label: HeroMagicRevealMetadata.name,
      description: HeroMagicRevealMetadata.description,
      screenshot: HeroMagicRevealMetadata.screenshot,
      tags: HeroMagicRevealMetadata.tags,
      load: async () => ({ default: HeroMagicReveal }),
    },
    'reveal-text': {
      label: HeroRevealTextMetadata.name,
      description: HeroRevealTextMetadata.description,
      screenshot: HeroRevealTextMetadata.screenshot,
      tags: HeroRevealTextMetadata.tags,
      load: async () => ({ default: HeroRevealText }),
    },
    'samsung-effect': {
      label: HeroSamsungEffectMetadata.name,
      description: HeroSamsungEffectMetadata.description,
      screenshot: HeroSamsungEffectMetadata.screenshot,
      tags: HeroSamsungEffectMetadata.tags,
      load: async () => ({ default: HeroSamsungEffect }),
    },
  },
});

const components: Record<HeroVariant, (props: HeroContent) => JSX.Element> = {
  'primary': HeroPrimary,
  'classic-center': HeroClassicCenter,
  'gradient-words': HeroGradientWords,
  'logo-center': HeroLogoCenter,
  'minimal-center': HeroMinimalCenter,
  'split-left': HeroSplitLeft,
  'video-overlay': HeroVideoOverlay,
  'animated-text': HeroAnimatedText,
  'typewriter': HeroTypewriter,
  'blur-fade': HeroBlurFade,
  'flip-words': HeroFlipWords,
  'typing-animation': HeroTypingAnimation,
  'magic-reveal': HeroMagicReveal,
  'reveal-text': HeroRevealText,
  'samsung-effect': HeroSamsungEffect,
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
