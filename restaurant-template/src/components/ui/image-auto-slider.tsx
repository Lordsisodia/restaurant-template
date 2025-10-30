"use client";

import React from "react";

export interface ImageAutoSliderProps {
  images?: string[];
  className?: string;
  title?: string;
  showTitlePill?: boolean;
}

// The original snippet exported a `Component` named export.
// Keep that API to match the instructions, but allow passing `images`.
export const Component: React.FC<ImageAutoSliderProps> = ({ images, className, title = "Our Space", showTitlePill = true }) => {
  // Default images (Unsplash) if none are provided
  const fallback = [
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://plus.unsplash.com/premium_photo-1675705721263-0bbeec261c49?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0",
  ];

  const imgs = images && images.length > 0 ? images : fallback;
  const duplicatedImages = [...imgs, ...imgs];

  return (
    <>
      <style>{`
        @keyframes scroll-right { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .infinite-scroll { animation: scroll-right 20s linear infinite; }
        .scroll-container { mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%); -webkit-mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%); }
        .image-item { transition: transform 0.3s ease, filter 0.3s ease; }
        .image-item:hover { transform: scale(1.05); filter: brightness(1.1); }
      `}</style>

      <div className={"w-full min-h-[60vh] bg-black relative overflow-hidden flex items-center justify-center " + (className ?? "")}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-0" />

        {/* Optional title pill — match SectionHeading pill style */}
        {showTitlePill && (
          <div className="absolute top-6 left-0 right-0 z-20 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/90 shadow-sm backdrop-blur">
              <div className="relative flex h-1 w-1 items-center justify-center rounded-full bg-white/40">
                <div className="flex h-2 w-2 animate-ping items-center justify-center rounded-full bg-white"></div>
                <div className="absolute top-1/2 left-1/2 flex h-1 w-1 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/80"></div>
              </div>
              {title}
            </span>
          </div>
        )}

        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center py-8">
          <div className="scroll-container w-full max-w-6xl">
            <div className="infinite-scroll flex gap-6 w-max">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="image-item flex-shrink-0 w-72 h-72 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem] rounded-xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={image}
                    alt={`Gallery image ${(index % imgs.length) + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20" />
      </div>
    </>
  );
};

export default Component;
