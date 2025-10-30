import type { ComponentType } from 'react';
import type { CtaContent } from './schema';

export type CtaVariant = 'primary';

export interface CtaRendererProps {
  variant?: CtaVariant;
  content: CtaContent;
  fallbackVariant?: CtaVariant;
}

export type CtaComponent = ComponentType<CtaContent>;
