"use client";

import type { QuickRepliesContent } from '../../types/schema';

export default function QuickRepliesPrimary({
  heading = 'Popular quick replies',
  description,
  emptyStateMessage = "Our assistant is learning new answers. Reach out if you can't find what you need.",
  locale = 'id-ID',
  macros,
}: QuickRepliesContent) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-foreground">{heading}</h2>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {macros.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-12 text-center text-muted-foreground">
          {emptyStateMessage}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {macros.map((macro) => (
            <article
              key={macro.id}
              className="rounded-2xl border border-border/70 bg-background p-5 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                {(macro.tags ?? []).length ? (macro.tags ?? []).join(' · ') : 'General'}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{macro.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{macro.prompt}</p>
              <p className="mt-4 text-xs text-muted-foreground/70">
                Updated {new Date(macro.createdAt).toLocaleDateString(locale)}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
