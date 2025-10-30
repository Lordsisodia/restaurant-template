"use client";

import { cn } from "@/lib/utils";

interface MenuCategoryTabsProps {
  categories: Array<{ id: string; name: string }>;
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function MenuCategoryTabs({ categories, activeCategory, onCategoryChange }: MenuCategoryTabsProps) {
  return (
    <div className="mb-8 flex items-center justify-center">
      <div className="inline-flex gap-2 rounded-full bg-muted p-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-background/60",
              activeCategory === category.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
