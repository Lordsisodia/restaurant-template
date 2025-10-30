import Link from 'next/link';

export function AdminEmptyState({
  title = 'Nothing here yet',
  description = 'Once you add data, it will appear here.',
  actionHref,
  actionLabel,
}: {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-12 text-center">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {actionHref && actionLabel ? (
        <div className="mt-4">
          <Link
            href={actionHref}
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:border-primary/40"
          >
            {actionLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

