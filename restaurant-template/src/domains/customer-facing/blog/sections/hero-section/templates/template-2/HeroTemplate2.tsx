import type { HeroContent } from '../../types/schema';

export default function HeroTemplate2({
  title,
  subtitle,
}: HeroContent) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          {subtitle ?? 'Latest from the kitchen'}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {title ?? 'Blog Template Two'}
        </h1>
        <p className="mt-6 text-base text-gray-600">
          This variant is a magazine-style hero placeholder. Replace with real layout when designs are ready.
        </p>
      </div>
    </section>
  );
}
