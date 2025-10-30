import type { Metadata } from 'next';

const EXAMPLE_STORY = {
  title: 'Our Story',
  subtitle: 'A Journey of Passion, Tradition & Flavor',
  heroImageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90',
  introduction:
    'What started as a small family kitchen has grown into a beloved culinary destination. Our story is one of passion, dedication, and a deep love for bringing people together through exceptional food.',
  milestones: [
    {
      id: '1',
      year: '1985',
      title: 'The Beginning',
      description:
        'Founded by Chef Maria in a small kitchen, serving traditional family recipes to the local community.',
      imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=85',
    },
    {
      id: '2',
      year: '1995',
      title: 'First Expansion',
      description:
        'Moved to our current location with a full dining room, allowing us to welcome more guests and expand our menu.',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85',
    },
    {
      id: '3',
      year: '2005',
      title: 'Award Recognition',
      description:
        'Received our first culinary award, recognizing excellence in traditional cuisine and hospitality.',
      imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=85',
    },
    {
      id: '4',
      year: '2015',
      title: 'Next Generation',
      description:
        "Chef Maria's daughter Ana joined as head chef, bringing fresh creativity while honoring our traditions.",
      imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=85',
    },
    {
      id: '5',
      year: '2023',
      title: 'Modern Evolution',
      description:
        'Launched online ordering and delivery while maintaining the quality and care that made us special.',
      imageUrl: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=85',
    },
  ],
  founderQuote: {
    text: "Food is more than sustenance—it's a celebration of life, love, and the bonds we share.",
    author: 'Chef Maria Rodriguez',
    role: 'Founder & Master Chef',
  },
  closingStatement:
    'Today, we continue to honor our roots while embracing the future. Thank you for being part of our story.',
};

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about our journey, passion, and commitment to exceptional dining.',
};

export default function OurStoryRoute() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={EXAMPLE_STORY.heroImageUrl}
          alt={EXAMPLE_STORY.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center px-6 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">{EXAMPLE_STORY.subtitle}</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{EXAMPLE_STORY.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/80">{EXAMPLE_STORY.introduction}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="space-y-12">
          {EXAMPLE_STORY.milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="grid gap-8 rounded-3xl border border-border/70 bg-card/80 p-8 shadow-sm backdrop-blur sm:grid-cols-[280px_1fr]"
            >
              <div className="space-y-3">
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
                  {milestone.year}
                </span>
                <h2 className="text-xl font-semibold text-foreground">{milestone.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{milestone.description}</p>
              </div>
              <div className="relative h-60 overflow-hidden rounded-2xl">
                <img src={milestone.imageUrl} alt={milestone.title} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <blockquote className="text-2xl font-light italic text-foreground">
            “{EXAMPLE_STORY.founderQuote.text}”
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            {EXAMPLE_STORY.founderQuote.author} · {EXAMPLE_STORY.founderQuote.role}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-lg text-muted-foreground">{EXAMPLE_STORY.closingStatement}</p>
      </section>
    </div>
  );
}
