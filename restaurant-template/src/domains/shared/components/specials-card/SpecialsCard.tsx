export interface SpecialsCardProps {
  title: string;
  description?: string | null;
  type?: string | null; // e.g., "limited", "deal"
  validText?: string | null; // e.g., "Today only"
}

export function SpecialsCard({ title, description, type, validText }: SpecialsCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-background p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {type ? (
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">{type}</span>
        ) : null}
      </div>
      {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
      {validText ? <p className="mt-2 text-xs text-muted-foreground/70">{validText}</p> : null}
    </article>
  );
}
