import { SolidButton } from '@siso/ui';
import HeroMedia from '@/domains/shared/components/HeroMedia';
import { HeroWithVideo } from '@/domains/shared/components/HeroWithVideo';
import { SimpleImageGallery } from '@/components/ui/simple-image-gallery';

import type { PageBlockRecord } from '@/domains/shared/server';

interface PageBlocksRendererProps {
  blocks: PageBlockRecord[];
}

export default function PageBlocksRenderer({ blocks }: PageBlocksRendererProps) {
  if (blocks.length === 0) {
    return (
      <section className="mx-auto mt-16 max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome to our restaurant platform.
        </h1>
        <p className="text-lg text-muted-foreground">
          Dynamic content is coming soon. In the meantime, explore the menu and place an order.
        </p>
        <div className="flex justify-center gap-3">
          <SolidButton asChild>
            <a href="/menu">Explore the menu</a>
          </SolidButton>
          <SolidButton asChild variant="secondary">
            <a href="/orders">Track orders</a>
          </SolidButton>
        </div>
      </section>
    );
  }

  return (
    <>
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={block.id} {...block.content} />;
          case 'hero-video':
            return <HeroVideoBlock key={block.id} {...block.content} />;
          case 'feature-grid':
            return <FeatureGridBlock key={block.id} {...block.content} />;
          case 'image-gallery':
            return <ImageGalleryBlock key={block.id} {...block.content} />;
          case 'cta':
            return <CtaBlock key={block.id} {...block.content} />;
          default:
            return (
              <pre
                key={block.id}
                className="mx-auto my-8 max-w-5xl overflow-x-auto rounded-lg border border-dashed border-border/70 bg-muted/40 p-6 text-xs text-muted-foreground"
              >
                {JSON.stringify(block.content, null, 2)}
              </pre>
            );
        }
      })}
    </>
  );
}

function HeroBlock(content: Record<string, unknown>) {
  const title = String(content.title ?? 'Experience the flavours of Indonesia.');
  const subtitle = String(
    content.subtitle ??
      'Freshly grilled ayam bakar, signature sambal, and warm hospitality delivered every day.',
  );
  const ctaPrimary = content.ctaPrimary as { label?: string; href?: string } | undefined;
  const ctaSecondary = content.ctaSecondary as { label?: string; href?: string } | undefined;
  const eyebrow = String(content.eyebrow ?? 'Authentic Indonesian Cuisine');
  const imageUrl = (content.imageUrl as string | undefined) ?? '/images/shared/defaults/hero-default.jpg';

  return (
    <HeroMedia
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      imageUrl={imageUrl}
      ctaPrimary={ctaPrimary?.label ? { label: ctaPrimary.label, href: ctaPrimary.href ?? '/menu' } : undefined}
      ctaSecondary={ctaSecondary?.label ? { label: ctaSecondary.label, href: ctaSecondary.href ?? '/contact' } : undefined}
    />
  );
}

function FeatureGridBlock(content: Record<string, unknown>) {
  const title = String(content.title ?? 'Why diners love us');
  const subtitle = String(
    content.subtitle ??
      'Every plate is cooked to order with locally sourced ingredients and family recipes.',
  );
  const items = Array.isArray(content.items) ? content.items : [];

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 px-6 py-12">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item, index) => {
          const itemTitle = String((item as Record<string, unknown>).title ?? `Feature ${index + 1}`);
          const itemDescription = String(
            (item as Record<string, unknown>).description ??
              'Customise this block from the Pages admin.',
          );
          return (
            <div key={index} className="rounded-2xl border border-border/70 bg-background p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground/80">
                {String((item as Record<string, unknown>).eyebrow ?? 'Highlight')}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{itemTitle}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{itemDescription}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HeroVideoBlock(content: Record<string, unknown>) {
  const title = String(content.title ?? 'Experience Authentic Indonesian Cuisine');
  const subtitle = String(
    content.subtitle ?? 'Fresh ingredients, traditional recipes, modern dining experience',
  );
  const videoUrl = content.videoUrl as string | undefined;
  const imageUrl = (content.imageUrl as string | undefined) ?? 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80';
  const ctaPrimary = content.ctaPrimary as { label?: string; href?: string } | undefined;
  const ctaSecondary = content.ctaSecondary as { label?: string; href?: string } | undefined;

  return (
    <HeroWithVideo
      title={title}
      subtitle={subtitle}
      videoUrl={videoUrl}
      imageUrl={imageUrl}
      ctaPrimary={ctaPrimary?.label ? { label: ctaPrimary.label, href: ctaPrimary.href ?? '/menu' } : undefined}
      ctaSecondary={ctaSecondary?.label ? { label: ctaSecondary.label, href: ctaSecondary.href ?? '/contact' } : undefined}
    />
  );
}

function ImageGalleryBlock(content: Record<string, unknown>) {
  const title = String(content.title ?? 'Our Signature Dishes');
  const subtitle = String(
    content.subtitle ?? 'Every dish is crafted with authentic Indonesian flavors and fresh ingredients',
  );
  const images = Array.isArray(content.images)
    ? content.images.map((img, idx) => ({
        id: String((img as any).id ?? idx),
        url: String((img as any).url ?? ''),
        alt: String((img as any).alt ?? `Dish ${idx + 1}`),
      }))
    : [];

  return <SimpleImageGallery title={title} subtitle={subtitle} images={images} columns={3} />;
}

function CtaBlock(content: Record<string, unknown>) {
  const title = String(content.title ?? 'Ready for a table?');
  const subtitle = String(
    content.subtitle ?? 'Reserve online or send us a message—our team will confirm in minutes.',
  );
  const ctaLabel = String(content.ctaLabel ?? 'Book a reservation');
  const ctaHref = String(content.ctaHref ?? '/reservations');

  return (
    <section className="mx-auto w-full max-w-4xl rounded-3xl bg-primary px-8 py-12 text-primary-foreground shadow-lg">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="mt-3 text-sm text-primary-foreground/80">{subtitle}</p>
      <div className="mt-6">
        <SolidButton asChild variant="secondary">
          <a href={ctaHref}>{ctaLabel}</a>
        </SolidButton>
      </div>
    </section>
  );
}
