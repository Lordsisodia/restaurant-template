import type { ComponentType } from 'react';
import type { HeroContent } from './schema';

export type HeroVariant = 'primary' | 'classic-center' | 'gradient-words' | 'logo-center' | 'minimal-center' | 'split-left' | 'video-overlay' | 'animated-text' | 'typewriter' | 'blur-fade' | 'flip-words' | 'typing-animation' | 'magic-reveal' | 'reveal-text' | 'samsung-effect';

export interface HeroRendererProps {
  variant?: HeroVariant;
  content: HeroContent;
  fallbackVariant?: HeroVariant;
}

export type HeroComponent = ComponentType<HeroContent>;
