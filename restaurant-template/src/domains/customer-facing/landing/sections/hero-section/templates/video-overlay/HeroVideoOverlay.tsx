import { HeroWithVideo } from '@/domains/customer-facing/landing/shared/components/hero-with-video';
import type { HeroContent } from '../../types/schema';

export default function HeroVideoOverlay({
  title,
  subtitle = '',
  videoUrl,
  imageUrl,
  primaryCta,
  secondaryCta,
}: HeroContent) {
  return (
    <HeroWithVideo
      title={title}
      subtitle={subtitle}
      videoUrl={videoUrl}
      imageUrl={imageUrl}
      ctaPrimary={primaryCta}
      ctaSecondary={secondaryCta}
    />
  );
}
