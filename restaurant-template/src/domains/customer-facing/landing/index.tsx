import { getMenu } from '@/domains/customer-facing/menu/shared/services';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';
import { loadTenantRuntime } from '@/lib/config/site';
import { getSpecials } from '@/domains/archive/specials/server';
import { listReviews } from '@/domains/customer-facing/reviews/shared/services';
import { HeroRenderer, type HeroVariant } from './sections/hero-section';
import { ReviewRenderer, type ReviewVariant } from './sections/review-section';
import { EssentialsRenderer } from './sections/essentials-section';
import { MenuRenderer } from './sections/menu-section';
import { StoryRenderer } from './sections/story-section';
import { MapRenderer } from './sections/map-section';
import { CtaRenderer } from './sections/cta-section';
import { SpecialsRenderer } from './sections/specials-section';
import { InstagramRenderer } from './sections/instagram-section';
import { GalleryRenderer } from './sections/gallery-section';

export default async function LandingPage() {
  const tenant = await getTenantFromRequest();
  const runtime = await loadTenantRuntime(tenant);
  const features = (runtime.siteConfig?.features as Record<string, any> | undefined) ?? {};

  const brand = features.brand ?? {};
  const contact = features.contact ?? {};

  // Config objects - declare early
  const heroConfig = (features.hero as Record<string, any> | undefined) ?? {};
  const reviewConfig = (features.reviews as Record<string, any> | undefined) ?? {};
  const deliveryPartners = (features.delivery as Record<string, any> | undefined)?.partners ?? [];
  const deliveryPartnerList = Array.isArray(deliveryPartners) ? deliveryPartners : [];

  const heroImage: string = brand.heroUrl || brand.hero || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80';
  const heroImages: string[] | undefined = Array.isArray(heroConfig.images) ? heroConfig.images : undefined;
  const heroLogo: string | undefined = heroConfig.logoUrl || brand.heroLogoUrl;
  const galleryConfig = (features.gallery as Record<string, any> | undefined) ?? {};
  const defaultGalleryImages = [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
    'https://images.unsplash.com/photo-1527169402691-feff5539e52c?w=900&q=80',
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=80',
    'https://images.unsplash.com/photo-1523942839745-7848c839b661?w=900&q=80',
    'https://images.unsplash.com/photo-1579631384019-29d447ef1bc0?w=900&q=80',
    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=900&q=80',
  ];

  const resolveGalleryImages = () => {
    const configured = Array.isArray(galleryConfig.images) ? galleryConfig.images : [];
    const base = configured.length > 0 ? configured : heroImages && heroImages.length > 0 ? heroImages : defaultGalleryImages;
    const sanitized = base.filter((url) => typeof url === 'string' && url.trim().length > 0);

    if (sanitized.length >= 6) {
      return sanitized.slice(0, 6);
    }

    const seen = new Set(sanitized);
    const supplemented = [...sanitized];
    for (const fallback of defaultGalleryImages) {
      if (supplemented.length >= 6) break;
      if (!seen.has(fallback)) {
        supplemented.push(fallback);
        seen.add(fallback);
      }
    }

    return supplemented;
  };

  const galleryImages = resolveGalleryImages();

  const menu = await getMenu().catch(() => ({ categories: [] }));
  const flatItems = menu.categories.flatMap((c) => c.items);
  const specialtySliderItems = flatItems
    .map((item: any, index: number) => ({
      id: String(item?.id ?? item?.slug ?? item?.name ?? `special-${index}`),
      title: item?.name ?? item?.title ?? 'Featured Item',
      description: item?.description ?? undefined,
      category: item?.categoryName ?? item?.category ?? item?.categoryId ?? undefined,
      imageUrl: item?.imageUrl ?? item?.image_url ?? item?.image ?? undefined,
      price: typeof item?.price === 'number' ? item.price : undefined,
      priceFormatted: item?.priceFormatted,
    }))
    .filter((item) => item.title);

  const sampleSliderItems = [
    {
      id: 'sample-slider-1',
      title: 'Slow Brew Tonic',
      description: 'Cold brew over artisanal tonic with citrus peel.',
      category: 'Specialty Drinks',
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&q=80',
      price: 55000,
      priceFormatted: '55.000 IDR',
    },
    {
      id: 'sample-slider-2',
      title: 'Charred Corn Fritters',
      description: 'Served with sambal mayo and herb salad.',
      category: 'Mocktails',
      imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=900&q=80',
      price: 65000,
      priceFormatted: '65.000 IDR',
    },
    {
      id: 'sample-slider-3',
      title: 'Cocoa Nib Affogato',
      description: 'Espresso poured over vanilla gelato and cocoa nibs.',
      category: 'Coffee',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80',
      price: 48000,
      priceFormatted: '48.000 IDR',
    },
    {
      id: 'sample-slider-4',
      title: 'Balinese Spiced Latte',
      description: 'Single-origin espresso with palm sugar and spices.',
      category: 'Tea',
      imageUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=900&q=80',
      price: 42000,
      priceFormatted: '42.000 IDR',
    },
    {
      id: 'sample-slider-5',
      title: 'Dragon Fruit Spritz',
      description: 'Sparkling mocktail with dragon fruit, lime, and mint.',
      category: 'Smoothies',
      imageUrl: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=900&q=80',
      price: 52000,
      priceFormatted: '52.000 IDR',
    },
    {
      id: 'sample-slider-6',
      title: 'Sunset Espresso Martini',
      description: 'Shaken espresso, vanilla, and orange bitters.',
      category: 'Cocktails',
      imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=80',
      price: 98000,
      priceFormatted: '98.000 IDR',
    },
  ];

  const sliderItems = specialtySliderItems.length > 0 ? specialtySliderItems : sampleSliderItems;

  // Fetch specials and reviews
  const specials = await getSpecials().catch(() => []);
  const specialsGridItems = specials.map((special: any, index: number) => ({
    id: String(special?.id ?? special?.slug ?? `grid-special-${index}`),
    title: special?.title ?? 'Chef Special',
    description: special?.description ?? special?.summary ?? undefined,
    type: special?.type ?? special?.tag ?? undefined,
  }));
  const allReviews = await listReviews('published').catch(() => []);
  
  // Sample fallback reviews if none exist
  const sampleReviews = [
    {
      id: 'sample-1',
      authorName: 'Sarah Chen',
      rating: 5,
      comment: 'Absolutely incredible! The coffee is perfectly brewed and the food is outstanding. The atmosphere is cozy and welcoming. Will definitely be coming back!',
      status: 'published' as const,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-2',
      authorName: 'Michael Rodriguez',
      rating: 5,
      comment: 'Best breakfast spot in town! Their signature dishes are amazing and the service is always friendly. The coffee is top-notch.',
      status: 'published' as const,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-3',
      authorName: 'Emma Thompson',
      rating: 5,
      comment: 'A hidden gem! The quality of food and attention to detail is impressive. Great place for brunch with friends or a quiet coffee break.',
      status: 'published' as const,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-4',
      authorName: 'David Park',
      rating: 4,
      comment: 'Really enjoyed my visit. The menu has great variety and everything we tried was delicious. The staff is knowledgeable and helpful.',
      status: 'published' as const,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'sample-5',
      authorName: 'Lisa Martinez',
      rating: 5,
      comment: 'My go-to spot for quality food and coffee! The atmosphere is perfect and the presentation of each dish is beautiful. Highly recommend!',
      status: 'published' as const,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];

  // Use real reviews if available, otherwise use samples
  const displayReviews = allReviews.length > 0 ? allReviews : sampleReviews;
  const topReviews = displayReviews.slice(0, 3);
  const avgRating = displayReviews.length > 0
    ? displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length
    : 4.8;
  const phone = (contact as Record<string, string> | undefined)?.phone;
  const whatsapp = (contact as Record<string, string> | undefined)?.whatsapp;

  // Build helpful CTAs
  const waDigits = whatsapp ? whatsapp.replace(/[^+\d]/g, '') : null;
  const phoneDigits = phone ? phone.replace(/[^+\d]/g, '') : null;
  const secondaryHref = waDigits
    ? `https://wa.me/${waDigits}`
    : phoneDigits
      ? `tel:${phoneDigits}`
      : '/contact';

  // Delivery platform link (TODO: Configure in siteConfig)
  const deliveryLink = (features.delivery as any)?.deepLink || undefined;

  // Story config (TODO: Configure in siteConfig)
  const storyConfig = (features.story as any) || {};
  const storyEnabled = storyConfig.enabled !== false; // Default to true
  const storyImageUrl = storyConfig.imageUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80';
  const storyContent = storyConfig.content || `Three generations of family recipes, brought from Jakarta to your table. Each dish tells a story of tradition, passion, and the love we put into every meal we serve.`;

  const mapConfig = (features.map as Record<string, any> | undefined) ?? {};
  const runtimeAddress = (runtime.siteConfig?.address as Record<string, any> | undefined) ?? {};
  const fallbackAddress = runtimeAddress.full as string | undefined;
  const mapAddress =
    typeof contact.address === 'string' && contact.address.trim().length > 0
      ? contact.address
      : typeof fallbackAddress === 'string' && fallbackAddress.trim().length > 0
        ? fallbackAddress
        : 'Jl. Mahendradatta Selatan No.7b, Pemecutan Klod, Denpasar, Bali 80119';

  const hoursSummary =
    typeof contact.hours === 'string'
      ? contact.hours
      : (contact.hours?.general as string | undefined) ?? 'Open daily until 11:00 PM';

  const defaultOperatingHours = [
    { day: 'Monday – Thursday', open: '08:00', close: '23:00' },
    { day: 'Friday – Saturday', open: '08:00', close: '24:00', note: 'Live DJ from 21:00' },
    { day: 'Sunday', open: '08:00', close: '22:00' },
  ];

  const mapOperatingHours = defaultOperatingHours;

  const mapLink =
    typeof mapConfig.link === 'string' && mapConfig.link.trim().length > 0
      ? mapConfig.link
      : `https://maps.google.com/?q=${encodeURIComponent(mapAddress)}`;

  const mapEmbedUrl =
    typeof mapConfig.embedUrl === 'string' && mapConfig.embedUrl.trim().length > 0
      ? mapConfig.embedUrl
      : undefined;

  const contactCardEntries = [
    phoneDigits
      ? {
          id: 'call',
          label: 'Call the cafe',
          href: `tel:${phoneDigits}`,
          description: contact.phoneFormatted ?? phone,
          icon: 'phone',
        }
      : null,
    waDigits
      ? {
          id: 'whatsapp',
          label: 'WhatsApp reservations',
          href: `https://wa.me/${waDigits}`,
          description: whatsapp,
          icon: 'whatsapp',
        }
      : null,
    (contact.mapsUrl as string | undefined)
      ? {
          id: 'maps',
          label: 'Open directions',
          href: contact.mapsUrl as string,
          description: 'Launch Google Maps',
          icon: 'maps',
        }
      : null,
  ].filter(Boolean) as Array<{
    id: string;
    label: string;
    href?: string;
    description?: string;
    icon?: string;
  }>;

  const arrivalNotes = ['Wheelchair access via the east entrance ramp'];
  const parkingInfo = 'Street parking available. Motorcycle parking directly in front.';
  const directionsText =
    typeof mapConfig.directions === 'string' && mapConfig.directions.trim().length > 0
      ? mapConfig.directions
      : 'Located on Jl. Mahendradatta Selatan, easily accessible from central Denpasar. Look for our distinctive Draco logo at the corner unit.';

  return (
    <div>
      {/* 1. HERO SECTION - Emotional impact */}
      <HeroRenderer
        variant={(heroConfig.variant as HeroVariant) || 'primary'}
        content={{
          title: tenant.displayName,
          subtitle: heroConfig.subtitle as string | undefined,
          imageUrl: heroImage,
          images: heroImages,
          logoUrl: heroLogo,
          primaryCta: { label: 'Order Now', href: deliveryLink || '/menu' },
          secondaryCta: { label: 'View Menu', href: '/menu' },
          words: Array.isArray(heroConfig.words) && heroConfig.words.length === 3 ? (heroConfig.words as [string, string, string]) : undefined,
          videoUrl: heroConfig.videoUrl as string | undefined,
          useAnimatedHeadline: heroConfig.useAnimatedHeadline as boolean | undefined,
        }}
      />

      {/* 2. STICKY CTA BAR - DISABLED (User didn't like it) */}
      {/* <CtaRenderer
        variant="primary"
        content={{
          primaryCTA: {
            label: 'Order on GrabFood',
            href: deliveryLink || '/menu',
          },
          secondaryCTA: {
            label: 'WhatsApp',
            href: secondaryHref ?? '/contact',
          },
          showAfterScroll: 30,
        }}
      /> */}

      {/* 3. ESSENTIALS CHIPS - Answer "Can I order?" friction */}
      <EssentialsRenderer
        variant="primary"
        content={{
          hours: contact.hours ?? null,
          address: contact.address ?? null,
          whatsapp,
          phone,
          partners: deliveryPartnerList,
        }}
      />

      {/* 4. SIGNATURE DISHES - Visual appetite appeal (BEFORE menu) */}
      <MenuRenderer
        variant="signature-dishes"
        content={{
          items: flatItems as any,
          maxItems: 4,
          deliveryLink: deliveryLink ?? undefined,
        }}
      />

      {/* 4.5 SPECIALS SLIDER - Auto-sliding drinks & specialties */}
      {sliderItems.length > 0 && (
        <SpecialsRenderer
          variant="slider"
          content={{
            items: sliderItems,
            viewMenuHref: deliveryLink ?? '/menu',
            layout: 'slider',
          }}
        />
      )}

      {/* 5. SOCIAL PROOF / REVIEWS - Build trust early */}
      <ReviewRenderer
        variant={(reviewConfig.variant as ReviewVariant) || 'primary'}
        content={{
          reviews: displayReviews,
          avgRating,
          totalCount: displayReviews.length,
          title: reviewConfig.title as string | undefined,
          viewAllHref: '/reviews',
        }}
      />

      {/* 6. TODAY'S SPECIALS - Create urgency (conditional) */}
      {specialsGridItems.length > 0 && (
        <SpecialsRenderer
          variant="grid"
          content={{
            items: specialsGridItems,
            layout: 'grid',
            heading: "Today's Specials",
            subtitle: "Limited-time offers you don't want to miss.",
            viewAllHref: '/specials',
          }}
        />
      )}

      {/* 7. MENU PREVIEW - Show variety (AFTER signature dishes) */}
      {/* <MenuRenderer variant="overview" content={{ items: flatItems as any }} /> */}

      {/* 8. STORY TEASER - Emotional connection with carousel */}
      {storyEnabled && (
        <StoryRenderer
          variant="primary"
          content={{
            title: storyConfig.title || "Our Story",
            story: storyContent,
            imageUrl: storyImageUrl,
            images: [
              {
                src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=80',
                title: 'Where It All Began',
                description: 'Discover Our Journey',
              },
              {
                src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
                title: 'Traditional Recipes',
                description: 'Passed Down Through Generations',
              },
              {
                src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80',
                title: 'Crafted With Love',
                description: 'Every Dish Tells a Story',
              },
              {
                src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
                title: 'Fresh & Local',
                description: 'Quality Ingredients Daily',
              },
            ],
            highlights: [
              { icon: 'heart', label: 'Traditional Recipes' },
              { icon: 'sparkles', label: 'Made Fresh Daily' },
            ],
            ctaLabel: storyConfig.ctaLabel || 'Read Our Full Story',
            ctaHref: storyConfig.ctaHref || '/about',
            useCarousel: true,
          }}
        />
      )}

      {/* 8.5 INSTAGRAM FEED - Social proof & community engagement */}
      <InstagramRenderer
        variant="primary"
        content={{
          instagramHandle: contact.instagram || '@yourrestaurant',
          instagramUrl: contact.instagramUrl || 'https://instagram.com/yourrestaurant',
          incentiveText: 'Follow us for exclusive offers & 10% off your first order!',
        }}
      />

      {/* 9. GALLERY - Visual snapshot */}
      {galleryImages.length > 0 && (
        <GalleryRenderer
          variant="grid"
          content={{
            images: galleryImages,
            heading: (galleryConfig.heading as string | undefined) ?? 'Scenes from Draco',
            subtitle: (galleryConfig.subtitle as string | undefined) ?? 'Moments from the roastery, dining room, and after-hours lounge.',
            layout: 'grid',
          }}
        />
      )}

      {/* 10. LOCATION & HOURS - Logistics (lazy loaded, compact) */}
      {mapAddress && (
        <MapRenderer
          variant="primary"
          content={{
            address: mapAddress,
            label: hoursSummary,
            embedUrl: mapEmbedUrl,
            iframeTitle: `${tenant.displayName} location`,
            mapLink,
            hoursSummary,
            operatingHours: mapOperatingHours,
            directions: directionsText,
            parkingInfo,
            arrivalNotes,
            contacts: contactCardEntries,
          }}
        />
      )}
    </div>
  );
}
