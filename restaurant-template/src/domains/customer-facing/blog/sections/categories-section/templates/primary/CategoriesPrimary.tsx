'use client';

import { Badge } from '@/domains/shared/components';
import { cn } from '@/lib/utils';
import type { CategoriesContent } from '../../types/schema';

type CategoriesPrimaryProps = CategoriesContent & {
  onCategoryChange?: (categoryKey: string) => void;
};

export default function CategoriesPrimary({ categories, activeCategoryKey = 'all', label = 'Filter by', onCategoryChange }: CategoriesPrimaryProps) {
  const handleClick = (key: string) => {
    onCategoryChange?.(key);
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-white/10 bg-black py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-white/90">{label}</span>
          {categories.map((category) => {
            const isActive = activeCategoryKey === category.key;
            const variant = isActive ? 'default' : 'outline';
            return (
              <button key={category.key} onClick={() => handleClick(category.key)} className="group" type="button">
                <Badge
                  variant={variant}
                  className={cn(
                    'cursor-pointer transition-all hover:scale-105',
                    isActive ? 'bg-white text-black hover:bg-white/90 border-transparent' : 'border-white/40 text-white/90',
                  )}
                >
                  {category.label}
                  {typeof category.count === 'number' ? <span className="ml-2 text-[11px] text-white/60">{category.count}</span> : null}
                  {category.pillText ? <span className="ml-2 text-[10px] uppercase tracking-[0.3em] text-white/50">{category.pillText}</span> : null}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
