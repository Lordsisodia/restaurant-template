"use client";

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HorizontalScrollerProps {
  children: ReactNode;
  className?: string;
  itemWidthClass?: string;
  ariaLabel?: string;
}

export default function HorizontalScroller({ children, className, itemWidthClass = 'w-[320px]', ariaLabel }: HorizontalScrollerProps) {
  return (
    <div className={cn('relative', className)} aria-label={ariaLabel}>
      <div className="-mx-4 overflow-x-auto overscroll-x-contain px-4">
        <div className="flex snap-x snap-mandatory gap-4">
          {Array.isArray(children) ? (
            children.map((child, i) => (
              <div key={i} className={cn('snap-start shrink-0', itemWidthClass)}>
                {child}
              </div>
            ))
          ) : (
            <div className={cn('snap-start shrink-0', itemWidthClass)}>{children}</div>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-12 bg-gradient-to-r from-black/90 via-black/20 to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-gradient-to-l from-black/90 via-black/20 to-transparent md:block" />
    </div>
  );
}
