import type { ComponentType } from 'react';
import type { SidebarContent } from './schema';

export type SidebarVariant = 'primary' | 'template-2' | 'template-3';

export interface SidebarRendererProps {
  variant?: SidebarVariant;
  fallbackVariant?: SidebarVariant;
  content: SidebarContent;
}

export type SidebarComponent = ComponentType<SidebarContent>;
