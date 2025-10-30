export function RatingBadge({ rating, count }: { rating: number; count?: number }) {
  const rounded = Math.round(rating * 10) / 10;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/15 px-2 py-1 text-xs font-semibold text-yellow-700">
      ★ {rounded}{typeof count === "number" ? <span className="text-[10px] font-normal text-yellow-800/80"> ({count})</span> : null}
    </span>
  );
}

