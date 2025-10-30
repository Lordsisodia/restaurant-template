import type { ComponentType } from 'react';
import type { HeroContent } from './schema';

export type HeroVariant = 'primary' | 'template-1' | 'template-2' | 'template-3';

export interface HeroRendererProps {
  variant?: HeroVariant;
  content: HeroContent;
  fallbackVariant?: HeroVariant;
}

export type HeroComponent = ComponentType<HeroContent>;
