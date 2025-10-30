import type { MenuRendererProps } from './types';
import type { MenuVariant } from './types';
import type { MenuContent } from './types/schema';
import { menuRegistry, getMenuVariant, getMenuComponent, listMenuVariants } from './registry';

export * from './types';
export { menuRegistry, listMenuVariants };

export function MenuRenderer({ variant, fallbackVariant, content }: MenuRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getMenuVariant(requested);
  const Component = getMenuComponent(resolved);
  return <Component {...content} />;
}

export function renderMenu({ variant, fallbackVariant, content }: MenuRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getMenuVariant(requested);
  const Component = getMenuComponent(resolved);
  return <Component {...content} />;
}

export function getMenuVariants(): Array<{ key: MenuVariant; label: string; description: string }> {
  return listMenuVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { MenuContent };
