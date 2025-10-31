'use client';

import { useId } from 'react';
import type { CategoriesContent } from '../../types/schema';

type CategoriesPrimaryProps = CategoriesContent & {
  onCategoryChange?: (categoryKey: string) => void;
};

export default function CategoriesPrimary({ categories, activeCategoryKey = 'all', label = 'Filter by', onCategoryChange }: CategoriesPrimaryProps) {
  const selectId = useId();

  const handleClick = (key: string) => {
    onCategoryChange?.(key);
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-white/10 bg-black py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor={selectId} className="text-sm font-medium uppercase tracking-[0.3em] text-white/70">
            {label}
          </label>
          <div className="relative w-full sm:w-auto">
            <select
              id={selectId}
              value={activeCategoryKey}
              onChange={(event) => handleClick(event.target.value)}
              className="w-full appearance-none rounded-full border border-white/20 bg-[#0b0b10] px-5 py-3 pr-10 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05)] transition focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {categories.map((category) => {
                const countSuffix = typeof category.count === 'number' ? ` (${category.count})` : '';
                return (
                  <option key={category.key} value={category.key}>
                    {category.label}
                    {countSuffix}
                  </option>
                );
              })}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/50">
              ▾
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
