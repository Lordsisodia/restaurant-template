import ImageWithFallback from '@/domains/customer-facing/landing/shared/components/image-with-fallback';
import { HeroCarousel } from '@/domains/customer-facing/landing/shared/components/hero-carousel';
import type { HeroContent } from '../../types/schema';
import { CalloutCards } from '../../shared/components/CalloutCards';
import { CompactCalloutCards } from '../../shared/components/CompactCalloutCards';
import { TextColor } from '../../shared/components/TextColor';

export default function HeroGradientWords({
  title,
  subtitle,
  imageUrl = '/images/shared/defaults/hero-default.jpg',
  images,
  primaryCta,
  secondaryCta,
  words,
}: HeroContent) {
  const [word1, word2, word3] = words ?? ['Bold.', 'Fresh.', 'Now.'];
  const heroImages = images && images.length > 1 ? images : [imageUrl];
  const useCarousel = heroImages.length > 1;
  const useCompact = true;

  return (
    <section className="relative isolate -mt-[88px] min-h-screen overflow-hidden">
      {useCarousel ? (
        <HeroCarousel images={heroImages} alt={title} interval={5000} />
      ) : (
        <div className="absolute inset-0 -z-10">
          <ImageWithFallback src={imageUrl} alt={title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>
      )}

      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-between px-6 pb-8 pt-28 text-center sm:justify-start">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 sm:flex-initial sm:justify-start sm:pt-4">
          <div className="w-full">
            <TextColor word1={word1} word2={word2} word3={word3} />
          </div>
          {subtitle ? (
            <p className="mx-auto max-w-2xl text-xl text-white/90 drop-shadow-md">{subtitle}</p>
          ) : null}
        </div>
        {useCompact ? (
          <CompactCalloutCards primaryCta={primaryCta} secondaryCta={secondaryCta} />
        ) : (
          <CalloutCards primaryCta={primaryCta} secondaryCta={secondaryCta} />
        )}
      </div>
    </section>
  );
}
