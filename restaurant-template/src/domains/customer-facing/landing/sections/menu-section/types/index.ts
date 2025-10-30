import type { ComponentType } from 'react';
import type { MenuContent } from './schema';

export type MenuVariant = 'signature-dishes' | 'overview';

export interface MenuRendererProps {
  variant?: MenuVariant;
  content: MenuContent;
  fallbackVariant?: MenuVariant;
}

export type MenuComponent = ComponentType<MenuContent>;
