import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Draco Promotions & Events',
  description: 'Latest events, tastings, and limited-time offers from Draco Coffee & Eatery.',
};

const PROMOTIONS = [
  {
    id: 'sunset-sessions',
    title: 'Sunset Espresso Sessions',
    dateRange: 'Fridays & Saturdays · 5:00 PM – Late',
    summary: 'Live DJ, espresso cocktails, and wood-fired bites to kick off the weekend.',
    ctaLabel: 'Reserve via WhatsApp',
    ctaHref: 'https://wa.me/6281999777138',
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=80',
  },
  {
    id: 'tasting-flight',
    title: 'Single-Origin Tasting Flight',
    dateRange: 'First Sunday of every month · 3:00 PM',
    summary: 'Guided tasting of three rotating single-origin coffees with pairing notes.',
    ctaLabel: 'Book a seat',
    ctaHref: 'https://wa.me/6281999777138',
    imageUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&q=80',
  },
];

export default function PromotionsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Promotions</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">What&apos;s on at Draco</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Seasonal drops, late-night sessions, and community events. Check back often—specials rotate weekly.
        </p>
      </header>

      <div className="grid gap-8">
        {PROMOTIONS.map((promo) => (
          <article key={promo.id} className="grid gap-6 overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-4 p-8">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  <span className="inline-block h-1 w-1 rounded-full bg-primary" />
                  Promotions
                </span>
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {promo.dateRange}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-foreground">{promo.title}</h2>
              <p className="text-sm text-muted-foreground">{promo.summary}</p>
              <Link
                href={promo.ctaHref}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                {promo.ctaLabel}
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="relative min-h-[280px]">
              <Image
                src={promo.imageUrl}
                alt={promo.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 320px, 100vw"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
