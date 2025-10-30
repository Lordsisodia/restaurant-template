import Link from 'next/link';
import { Card, CardContent } from '@/domains/shared/components';
import { MessageCircle, Utensils } from 'lucide-react';

type Cta = { label: string; href: string };

export function CompactCalloutCards({ primaryCta, secondaryCta }: { primaryCta?: Cta; secondaryCta?: Cta }) {
  if (!primaryCta && !secondaryCta) return null;

  return (
    <div className="mt-2 flex w-full max-w-2xl gap-3">
      {primaryCta ? (
        <Link href={primaryCta.href} className="flex-1 no-underline">
          <Card className="group rounded-2xl border-white/20 bg-white/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-white/20 sm:backdrop-blur-md">
            <CardContent className="flex items-center justify-center gap-2 p-4 text-white">
              <div className="rounded-full bg-black/30 p-2 ring-1 ring-white/30 transition-all group-hover:ring-white/50">
                <Utensils className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold">{primaryCta.label}</p>
              <span aria-hidden className="text-white/70 transition-transform group-hover:translate-x-1">→</span>
            </CardContent>
          </Card>
        </Link>
      ) : null}

      {secondaryCta ? (
        <Link
          href={secondaryCta.href}
          className="flex-1 no-underline"
          target={secondaryCta.href.startsWith('http') ? '_blank' : undefined}
        >
          <Card className="group rounded-2xl border-white/20 bg-white/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-white/20 sm:backdrop-blur-md">
            <CardContent className="flex items-center justify-center gap-2 p-4 text-white">
              <div className="rounded-full bg-black/30 p-2 ring-1 ring-white/30 transition-all group-hover:ring-white/50">
                <MessageCircle className="h-4 w-4" />
              </div>
              <p className="text-sm font-semibold">{secondaryCta.label}</p>
              <span aria-hidden className="text-white/70 transition-transform group-hover:translate-x-1">→</span>
            </CardContent>
          </Card>
        </Link>
      ) : null}
    </div>
  );
}
