import type { ComponentType } from 'react';
import type { HeroContent } from './schema';

export type HeroVariant = 'primary' | 'template-2' | 'template-3';

export interface HeroRendererProps {
  variant?: HeroVariant;
  fallbackVariant?: HeroVariant;
  content: HeroContent;
}

export type HeroComponent = ComponentType<HeroContent>;
