'use client';

import type { CategoriesContent } from '../../types/schema';

type Props = CategoriesContent & { onCategoryChange?: (categoryKey: string) => void };

export default function CategoriesTemplate2({ categories, onCategoryChange }: Props) {
  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-4xl px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Browse topics</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => onCategoryChange?.(category.key)}
              className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-100"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
