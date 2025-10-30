'use client';

import type { CategoriesContent } from '../../types/schema';

type Props = CategoriesContent & { onCategoryChange?: (categoryKey: string) => void };

export default function CategoriesTemplate3({ categories, onCategoryChange }: Props) {
  return (
    <section className="bg-neutral-950 py-8 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <h3 className="text-lg font-semibold text-white/80">Topics</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => onCategoryChange?.(category.key)}
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
