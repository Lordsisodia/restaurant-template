import { HeroRenderer } from '../sections/hero-section';
import { CuisinePhilosophyRenderer } from '../sections/cuisine-philosophy-section';
import { AwardsRenderer } from '../sections/awards-section';
import { StoryRenderer } from '../sections/story-section';
import { TeamRenderer } from '../sections/team-section';
import { ValuesRenderer } from '../sections/values-section';
import { VenueGalleryRenderer } from '../sections/venue-gallery-section';
import { LocationRenderer } from '../sections/location-section';
import { FaqRenderer } from '../sections/faq-section';
import { CtaRenderer } from '../sections/cta-section';
import type { HeroContent, HeroVariant } from '../sections/hero-section';
import type {
  CuisinePhilosophyContent,
  CuisinePhilosophyVariant,
} from '../sections/cuisine-philosophy-section';
import type { AwardsContent, AwardsVariant } from '../sections/awards-section';
import type { StoryContent, StoryVariant } from '../sections/story-section';
import type { CtaContent, CtaVariant } from '../sections/cta-section';
import type { TeamContent, TeamVariant } from '../sections/team-section';
import type { ValuesContent, ValuesVariant } from '../sections/values-section';
import type { VenueGalleryContent, VenueGalleryVariant } from '../sections/venue-gallery-section';
import type { LocationContent, LocationVariant } from '../sections/location-section';
import type { FaqContent, FaqVariant } from '../sections/faq-section';

export interface AboutPageData {
  hero: HeroContent;
  heroVariant?: HeroVariant;
  venueGallery: VenueGalleryContent;
  venueGalleryVariant?: VenueGalleryVariant;
  cuisinePhilosophy: CuisinePhilosophyContent;
  cuisinePhilosophyVariant?: CuisinePhilosophyVariant;
  awards: AwardsContent;
  awardsVariant?: AwardsVariant;
  story: StoryContent;
  storyVariant?: StoryVariant;
  cta: CtaContent;
  ctaVariant?: CtaVariant;
  team: TeamContent;
  teamVariant?: TeamVariant;
  values: ValuesContent;
  valuesVariant?: ValuesVariant;
  location: LocationContent;
  locationVariant?: LocationVariant;
  faq: FaqContent;
  faqVariant?: FaqVariant;
}

export interface AboutPageProps {
  data: AboutPageData;
}

/**
 * AboutPage - Composes all About Us sections
 *
 * Uses primary templates by default for all sections.
 * Future: Add variant selection per section.
 */
export default function AboutPage({ data }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Pills & Gradient */}
      <HeroRenderer variant={data.heroVariant} content={data.hero} />

      {/* Venue Gallery */}
      <VenueGalleryRenderer variant={data.venueGalleryVariant} content={data.venueGallery} />

      {/* Intro Paragraph - Optional */}
      <section className="bg-background px-6 pt-6 pb-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Since opening our doors, Draco Coffee and Eatery has been serving Bali’s boldest coffee 
            and most authentic flavors. From our signature Nasi Bakar to expertly crafted espresso, 
            every dish tells a story of passion, tradition, and community.
          </p>
        </div>
      </section>

      {/* Our Story Timeline */}
      <StoryRenderer variant={data.storyVariant} content={data.story} />

      {/* Cuisine Philosophy */}
      <CuisinePhilosophyRenderer variant={data.cuisinePhilosophyVariant} content={data.cuisinePhilosophy} />

      {/* Awards & Social Proof - NEW */}
      <AwardsRenderer variant={data.awardsVariant} content={data.awards} />

      {/* Meet The Team */}
      <TeamRenderer variant={data.teamVariant} content={data.team} />

      {/* Values & Mission */}
      <ValuesRenderer variant={data.valuesVariant} content={data.values} />

      {/* Call To Action */}
      <CtaRenderer variant={data.ctaVariant} content={data.cta} />

      {/* Location & Contact - NEW */}
      <LocationRenderer variant={data.locationVariant} content={data.location} />

      {/* FAQ Section - NEW */}
      <FaqRenderer variant={data.faqVariant} content={data.faq} />
    </div>
  );
}
