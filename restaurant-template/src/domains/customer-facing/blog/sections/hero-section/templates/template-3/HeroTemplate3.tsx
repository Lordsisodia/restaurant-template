import type { HeroContent } from '../../types/schema';

export default function HeroTemplate3({ title }: HeroContent) {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-gray-950 py-24 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 text-center">
        <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
          Coming Soon
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title ?? 'Experimental Blog Hero'}
        </h1>
        <p className="max-w-xl text-base text-white/70">
          Placeholder for future hero experiment. Replace with finalized design when ready.
        </p>
      </div>
    </section>
  );
}
