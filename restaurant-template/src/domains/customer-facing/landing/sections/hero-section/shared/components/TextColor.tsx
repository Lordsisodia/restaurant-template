"use client";

import { Plus } from 'lucide-react';

export function TextColor({ word1 = 'Bold.', word2 = 'Fresh.', word3 = 'Now.' }: { word1?: string; word2?: string; word3?: string }) {
  return (
    <div className="mb-6 mt-2 px-2">
      <div className="relative h-full w-full border border-slate-200 p-4 [mask-image:radial-gradient(200rem_24rem_at_center,white,transparent)] dark:border-slate-800 md:p-6">
        <h1 className="relative flex select-none flex-col text-center text-7xl font-extrabold leading-none tracking-tighter sm:text-8xl">
          <Plus className="absolute -left-4 -top-4 h-8 w-8 text-indigo-500" />
          <Plus className="absolute -left-4 -bottom-4 h-8 w-8 text-indigo-500" />
          <Plus className="absolute -right-4 -top-4 h-8 w-8 text-indigo-500" />
          <Plus className="absolute -right-4 -bottom-4 h-8 w-8 text-indigo-500" />

          <span
            data-content={word1}
            className="relative px-2 before:absolute before:inset-x-0 before:bottom-4 before:top-0 before:z-0 before:animate-gradient-background-1 before:px-2 before:content-[attr(data-content)] sm:px-5 sm:before:top-0"
          >
            <span className="from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1 bg-gradient-to-r bg-clip-text text-transparent">
              {word1}
            </span>
          </span>

          <span
            data-content={word2}
            className="relative px-2 before:absolute before:inset-x-0 before:bottom-0 before:top-0 before:z-0 before:animate-gradient-background-2 before:px-2 before:content-[attr(data-content)] sm:px-5 sm:before:top-0"
          >
            <span className="from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2 bg-gradient-to-r bg-clip-text text-transparent">
              {word2}
            </span>
          </span>

          <span
            data-content={word3}
            className="relative px-2 before:absolute before:inset-x-0 before:bottom-1 before:top-0 before:z-0 before:animate-gradient-background-3 before:px-2 before:content-[attr(data-content)] sm:px-5 sm:before:top-0"
          >
            <span className="from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3 bg-gradient-to-r bg-clip-text text-transparent">
              {word3}
            </span>
          </span>
        </h1>
      </div>
    </div>
  );
}
