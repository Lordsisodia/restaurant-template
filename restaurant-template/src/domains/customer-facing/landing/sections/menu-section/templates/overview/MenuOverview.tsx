"use client";

import { useMemo, useState } from "react";
import { DishCard, type DishItemLike } from "@/domains/customer-facing/landing/shared/components/dish-card";
import { SectionHeading } from "@/domains/shared/components";
import { MenuCategoryTabs } from "../../shared/components/MenuCategoryTabs";
import type { MenuContent } from "../../types/schema";

export default function MenuOverview({ items, viewAllHref = "/menu" }: MenuContent) {
  const categories = useMemo(() => {
    const map = new Map<string, { id: string; name: string }>();
    map.set("all", { id: "all", name: "All Day" });

    items.forEach((item) => {
      if (!item.categoryId) return;
      if (map.has(item.categoryId)) return;
      map.set(item.categoryId, {
        id: item.categoryId,
        name: item.categoryId.charAt(0).toUpperCase() + item.categoryId.slice(1),
      });
    });

    return Array.from(map.values());
  }, [items]);

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return items.slice(0, 6);
    }
    return items.filter((item) => item.categoryId === activeCategory).slice(0, 6);
  }, [items, activeCategory]);

  if (items.length === 0) {
    return (
      <section className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-10 text-center text-muted-foreground">
          Menu is coming soon. Check back shortly.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-8 text-center">
        <SectionHeading title="Our Menu" centered />
      </div>

      {categories.length > 1 ? (
        <MenuCategoryTabs categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      ) : null}

      {filteredItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-10 text-center text-muted-foreground">
          No items in this category yet.
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item: DishItemLike) => (
            <li key={item.id}>
              <DishCard item={item} />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 text-center">
        <a href={viewAllHref} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
          View full menu →
        </a>
      </div>
    </section>
  );
}
