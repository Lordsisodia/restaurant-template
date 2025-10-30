import Link from 'next/link';
import { Card, CardContent } from '@/domains/shared/components';
import { MessageCircle, Utensils } from 'lucide-react';

type Cta = { label: string; href: string };

export function CalloutCards({ primaryCta, secondaryCta }: { primaryCta?: Cta; secondaryCta?: Cta }) {
  if (!primaryCta && !secondaryCta) return null;

  return (
    <div className="mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
      {primaryCta ? (
        <Link href={primaryCta.href} className="flex-1 no-underline">
          <Card className="group rounded-2xl border-white/20 bg-white/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-white/20 sm:backdrop-blur-md">
            <CardContent className="flex items-center gap-3 p-5 text-left text-white">
              <div className="rounded-full bg-black/30 p-2.5 ring-1 ring-white/30 transition-all group-hover:ring-white/50">
                <Utensils className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold">{primaryCta.label}</p>
                <p className="text-xs text-white/80">Browse today&apos;s dishes and specials.</p>
              </div>
              <span aria-hidden className="ml-auto text-white/70 transition-transform group-hover:translate-x-1">→</span>
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
            <CardContent className="flex items-center gap-3 p-5 text-left text-white">
              <div className="rounded-full bg-black/30 p-2.5 ring-1 ring-white/30 transition-all group-hover:ring-white/50">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold">{secondaryCta.label}</p>
                <p className="text-xs text-white/80">Have a question? Chat with us.</p>
              </div>
              <span aria-hidden className="ml-auto text-white/70 transition-transform group-hover:translate-x-1">→</span>
            </CardContent>
          </Card>
        </Link>
      ) : null}
    </div>
  );
}
