'use client';

import { useState } from 'react';
import { SolidButton } from '@siso/ui';

import { BottomSheet } from '@/domains/shared/components/bottom-sheet';
import { ImageWithFallback } from '../image-with-fallback';

export interface DishItemLike {
  id: string;
  name: string;
  description?: string | null;
  priceFormatted?: string;
  imageUrl?: string | null;
  categoryId?: string | null;
  spicy?: boolean;
  vegan?: boolean;
}

export function DishCard({ item }: { item: DishItemLike }) {
  const [open, setOpen] = useState(false);
  const img = item.imageUrl || "/images/shared/defaults/dish-placeholder.jpg";
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-40 w-full bg-muted">
        <ImageWithFallback src={img} alt={item.name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-foreground">{item.name}</h3>
          {item.priceFormatted ? (
            <span className="text-sm font-semibold text-primary">{item.priceFormatted}</span>
          ) : null}
        </div>
        {item.description ? (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        ) : null}
        <div className="mt-3">
          <SolidButton size="sm" onClick={() => setOpen(true)}>Add</SolidButton>
        </div>
      </div>
      <BottomSheet open={open} onClose={() => setOpen(false)} title="Customize">
        <p className="text-sm text-muted-foreground">
          Customization UI coming soon. This is a visual placeholder for the MVX pass.
        </p>
        <div className="mt-4">
          <SolidButton onClick={() => setOpen(false)}>Add to cart</SolidButton>
        </div>
      </BottomSheet>
    </div>
  );
}
