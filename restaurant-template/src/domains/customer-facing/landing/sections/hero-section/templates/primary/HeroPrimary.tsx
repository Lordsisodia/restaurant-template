import Link from 'next/link';
import ImageWithFallback from '@/domains/customer-facing/landing/shared/components/image-with-fallback';
import { Card, CardContent } from '@/domains/shared/components';
import { MessageCircle, Utensils } from 'lucide-react';
import type { HeroContent } from '../../types/schema';
import { TextColor } from '../../shared/components/TextColor';

export default function HeroPrimary({
  title,
  subtitle,
  imageUrl = '/images/shared/defaults/hero-default.jpg',
  primaryCta = { label: 'View Menu', href: '/menu' },
  secondaryCta = { label: 'Message on WhatsApp', href: '#' },
  words,
  useAnimatedHeadline,
}: HeroContent) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden lg:-mt-[80px]">
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback src={imageUrl} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
        {useAnimatedHeadline || words ? (
          <div className="w-full">
            <TextColor
              word1={words?.[0]}
              word2={words?.[1]}
              word3={words?.[2]}
            />
          </div>
        ) : (
          <>
            <h1 className="text-balance text-5xl font-bold tracking-tight text-white drop-shadow-lg sm:text-6xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mx-auto max-w-2xl text-xl text-white/90 drop-shadow-md">{subtitle}</p>
            ) : null}
          </>
        )}

        <div className="mt-6 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          <Link href={primaryCta.href} className="no-underline">
            <Card className="group border-white/20 bg-white/10 backdrop-blur hover:bg-white/15">
              <CardContent className="flex items-center gap-3 p-4 text-left text-white">
                <div className="rounded-md bg-black/30 p-2 ring-1 ring-white/20">
                  <Utensils className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold">{primaryCta.label}</p>
                  <p className="text-xs text-white/80">Browse today&apos;s dishes and specials.</p>
                </div>
                <span aria-hidden className="ml-auto text-white/70 transition-transform group-hover:translate-x-0.5">→</span>
              </CardContent>
            </Card>
          </Link>

          <Link
            href={secondaryCta.href}
            className="no-underline"
            target={secondaryCta.href.startsWith('http') ? '_blank' : undefined}
          >
            <Card className="group border-white/20 bg-white/10 backdrop-blur hover:bg-white/15">
              <CardContent className="flex items-center gap-3 p-4 text-left text-white">
                <div className="rounded-md bg-black/30 p-2 ring-1 ring-white/20">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold">{secondaryCta.label}</p>
                  <p className="text-xs text-white/80">Have a question? Chat with us.</p>
                </div>
                <span aria-hidden className="ml-auto text-white/70 transition-transform group-hover:translate-x-0.5">→</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
