import type { SidebarRendererProps, SidebarVariant } from './types';
import type { SidebarContent } from './types/schema';
import { sidebarRegistry, getSidebarVariant, getSidebarComponent, listSidebarVariants } from './registry';

export * from './types';
export { sidebarRegistry, listSidebarVariants };

export function SidebarRenderer({ variant, fallbackVariant, content }: SidebarRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getSidebarVariant(requested);
  const Component = getSidebarComponent(resolved);
  return <Component {...content} />;
}

export function renderSidebar(props: SidebarRendererProps) {
  const requested = props.variant ?? props.fallbackVariant;
  const resolved = getSidebarVariant(requested);
  const Component = getSidebarComponent(resolved);
  return <Component {...props.content} />;
}

export function getSidebarVariants(): Array<{ key: SidebarVariant; label: string; description: string }> {
  return listSidebarVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { SidebarContent };
