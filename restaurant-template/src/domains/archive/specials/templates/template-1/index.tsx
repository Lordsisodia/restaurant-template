/**
 * Specials Template 1 - Card Layout
 * 🎨 REPLACE WITH v0.dev TEMPLATE
 */

import type { SpecialsTemplateProps } from '../types';
import { SpecialsCard } from '@/domains/shared/components';

export default function SpecialsTemplate1({ specials, tenant }: SpecialsTemplateProps) {
  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-border bg-primary/10 py-16 text-center text-primary">
        <h1 className="text-3xl font-bold sm:text-4xl">Specials at {tenant.displayName}</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Fresh deals and limited-time offers curated for you.
        </p>
      </section>

      <section className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16">
        {specials.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-12 text-center text-muted-foreground">
            No specials available right now. Check back soon!
          </div>
        ) : (
          specials.map((special) => (
            <SpecialsCard
              key={special.id}
              title={special.title}
              description={special.description}
              type={special.type}
            />
          ))
        )}
      </section>
    </div>
  );
}
