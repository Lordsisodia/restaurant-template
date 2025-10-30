import type { ComponentType } from 'react';
import type { EssentialsContent } from './schema';

export type EssentialsVariant = 'primary';

export interface EssentialsRendererProps {
  variant?: EssentialsVariant;
  content: EssentialsContent;
  fallbackVariant?: EssentialsVariant;
}

export type EssentialsComponent = ComponentType<EssentialsContent>;
