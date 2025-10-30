export interface ReviewCardProps {
  author: string;
  rating: number;
  comment?: string | null;
  date?: string | null;
}

export function ReviewCard({ author, rating, comment, date }: ReviewCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">{author}</p>
        <span className="text-sm font-semibold text-yellow-700">★ {rating}</span>
      </div>
      {comment ? <p className="mt-3 text-sm text-muted-foreground">{comment}</p> : null}
      {date ? <p className="mt-2 text-xs text-muted-foreground/70">{date}</p> : null}
    </div>
  );
}

