type TeamMember = { name: string; role: string; avatar: string };

const groups: { title: string; members: TeamMember[] }[] = [
  {
    title: 'Leadership',
    members: [
      { name: 'Ayu Lestari', role: 'General Manager', avatar: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=400&q=80' },
      { name: 'Made Surya', role: 'Operations Manager', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80' },
    ],
  },
  {
    title: 'Kitchen',
    members: [
      { name: 'Chef Kadek', role: 'Head Chef', avatar: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80' },
      { name: 'Putu Ayu', role: 'Pastry Chef', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
    ],
  },
  {
    title: 'Bar & Coffee',
    members: [
      { name: 'Wayan Sujana', role: 'Master Barista', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
      { name: 'Rizky Pratama', role: 'Mixologist', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&q=80' },
    ],
  },
  {
    title: 'Marketing & Media',
    members: [
      { name: 'Nadia Rahma', role: 'Marketing Manager', avatar: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&q=80' },
      { name: 'Agus Pratama', role: 'Social Media', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&q=80' },
    ],
  },
];

import { SectionHeading } from '@/domains/shared/components';

export default function TeamSection() {
    return (
        <section className="py-12 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                {/* Match landing page heading style + pill */}
                <SectionHeading
                  pillText="Our Team"
                  title="Meet Our Team"
                  subtitle="The people behind our food and coffee"
                  titleClassName="text-3xl md:text-4xl font-bold"
                  as="h2"
                  centered
                  className="mb-8 md:mb-10"
                />

                {groups.map((group) => (
                  <div key={group.title} className="mt-6">
                    <h3 className="mb-6 text-lg font-medium text-center">{group.title}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 border-t py-6 justify-items-center">
                      {group.members.map((m) => (
                        <div key={m.name} className="text-center">
                          <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                            <img className="aspect-square rounded-full object-cover" src={m.avatar} alt={m.name} height="460" width="460" loading="lazy" />
                          </div>
                          <span className="mt-2 block text-sm font-medium text-foreground">{m.name}</span>
                          <span className="text-muted-foreground block text-xs">{m.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
        </section>
    )
}
