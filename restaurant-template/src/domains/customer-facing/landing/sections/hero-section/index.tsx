import type { HeroRendererProps } from './types';
import type { HeroVariant } from './types';
import type { HeroContent } from './types/schema';
import { heroRegistry, getHeroVariant, getHeroComponent, listHeroVariants } from './registry';

export * from './types';
export { heroRegistry, listHeroVariants };

export function HeroRenderer({ variant, fallbackVariant, content }: HeroRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getHeroVariant(requested);
  const Component = getHeroComponent(resolved);
  return <Component {...content} />;
}

export function renderHero({ variant, fallbackVariant, content }: HeroRendererProps) {
  const requested = variant ?? fallbackVariant;
  const resolved = getHeroVariant(requested);
  const Component = getHeroComponent(resolved);
  return <Component {...content} />;
}

export function getHeroVariants(): Array<{ key: HeroVariant; label: string; description: string }> {
  return listHeroVariants().map(({ key, label, description }) => ({ key, label, description }));
}

export type { HeroContent };
