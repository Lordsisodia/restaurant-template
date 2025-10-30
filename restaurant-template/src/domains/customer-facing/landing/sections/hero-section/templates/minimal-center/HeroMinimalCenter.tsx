import ImageWithFallback from '@/domains/customer-facing/landing/shared/components/image-with-fallback';
import type { HeroContent } from '../../types/schema';

export default function HeroMinimalCenter({
  title,
  subtitle,
  imageUrl = '/images/shared/defaults/hero-default.jpg',
}: HeroContent) {
  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden lg:-mt-[80px]">
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback src={imageUrl} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
      </div>

      <div className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-center gap-4 px-6 pt-24 text-center">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white drop-shadow-lg sm:text-6xl">{title}</h1>
        {subtitle ? (
          <p className="mx-auto max-w-2xl text-lg text-white/90 drop-shadow">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
