"use client";

import Link from 'next/link';
import { SpecialsCard } from '@/domains/shared/components';
import type { SpecialsContent } from '../../types/schema';

export default function SpecialsGrid({ heading, subtitle, viewAllHref = '/specials', items }: SpecialsContent) {
  if (!items?.length) return null;
  const top = items.slice(0, 3);
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-8">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">{heading ?? "Today's Specials"}</h2>
          <p className="text-sm text-muted-foreground">{subtitle ?? 'Limited-time items curated by our chef.'}</p>
        </div>
        <Link href={viewAllHref} className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {top.map((item) => (
          <SpecialsCard
            key={item.id}
            title={item.title}
            description={item.description ?? undefined}
            type={item.type ?? item.tag ?? undefined}
          />
        ))}
      </div>
    </section>
  );
}
