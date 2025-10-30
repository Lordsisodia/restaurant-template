import type { ComponentType } from 'react';
import type { SpecialsContent } from './schema';

export type SpecialsVariant = 'grid' | 'slider';

export interface SpecialsRendererProps {
  variant?: SpecialsVariant;
  content: SpecialsContent;
  fallbackVariant?: SpecialsVariant;
}

export type SpecialsComponent = ComponentType<SpecialsContent>;
