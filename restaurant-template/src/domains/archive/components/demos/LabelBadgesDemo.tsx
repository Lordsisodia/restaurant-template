// demo.tsx
'use client';

import { BookOpen, Bug, Sparkles } from 'lucide-react';
import LabelBadge, { labels } from '@/components/ui/label-badges';

const LabelBadgeDemo = () => {
   return (
      <div className="flex w-full flex-col items-center justify-center gap-10 p-4">
         <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-lg font-semibold">Label Badges</h2>
            <p className="text-sm text-muted-foreground">
               Demonstrating how labels can be displayed on items.
            </p>
         </div>

         <div className="w-full max-w-md space-y-4">
            <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 text-card-foreground">
               <div className="flex items-start justify-between">
                  <p className="font-medium">Fix authentication flow redirect</p>
                  <Bug className="size-5 shrink-0 text-red-500" />
               </div>
               <LabelBadge labels={[labels[1], labels[7]]} />
            </div>

            <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 text-card-foreground">
               <div className="flex items-start justify-between">
                  <p className="font-medium">Implement new dashboard design</p>
                  <Sparkles className="size-5 shrink-0 text-blue-500" />
               </div>
               <LabelBadge labels={[labels[2], labels[0], labels[6]]} />
            </div>

            <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 text-card-foreground">
               <div className="flex items-start justify-between">
                  <p className="font-medium">Update contribution guidelines</p>
                  <BookOpen className="size-5 shrink-0 text-green-500" />
               </div>
               <LabelBadge labels={[labels[3]]} />
            </div>
         </div>
      </div>
   );
};

export { LabelBadgeDemo as DemoOne };

