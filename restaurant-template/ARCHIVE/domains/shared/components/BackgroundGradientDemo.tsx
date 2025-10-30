"use client";
import React from "react";
import { BackgroundGradient } from "./BackgroundGradient";

/**
 * BackgroundGradient Demo Component
 *
 * Showcases how to use the BackgroundGradient wrapper component
 * with different content types (cards, images, text blocks)
 */
export function BackgroundGradientDemo() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            BackgroundGradient Component
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Add beautiful animated gradient borders to any component
          </p>
        </div>

        {/* Example 1: Simple Card */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Example 1: Simple Card
          </h2>
          <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Beautiful Gradient Border
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This card has an animated gradient border that glows on hover.
                The gradient continuously animates in the background.
              </p>
              <button className="rounded-full px-4 py-2 text-white bg-black dark:bg-zinc-800 text-sm font-bold hover:bg-gray-800 transition">
                Learn More
              </button>
            </div>
          </BackgroundGradient>
        </div>

        {/* Example 2: Image Card */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Example 2: Image Card (Restaurant Dish)
          </h2>
          <BackgroundGradient className="rounded-[22px] max-w-sm bg-white dark:bg-zinc-900">
            <div className="p-6 space-y-4">
              <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-4xl">🍕</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Signature Pizza
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wood-fired pizza with fresh mozzarella, basil, and tomato sauce.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    $24.99
                  </span>
                  <button className="rounded-full px-4 py-2 text-white bg-black dark:bg-zinc-800 text-sm font-bold">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </BackgroundGradient>
        </div>

        {/* Example 3: Testimonial Card */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Example 3: Testimonial Card
          </h2>
          <BackgroundGradient className="rounded-[22px] max-w-md bg-white dark:bg-zinc-900">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "The food was absolutely amazing! Best restaurant experience I've had in years.
                The atmosphere was perfect and the service was impeccable."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    John Doe
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Food Enthusiast
                  </div>
                </div>
              </div>
            </div>
          </BackgroundGradient>
        </div>

        {/* Example 4: Without Animation */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Example 4: Static Gradient (No Animation)
          </h2>
          <BackgroundGradient
            animate={false}
            className="rounded-[22px] max-w-sm p-6 bg-white dark:bg-zinc-900"
          >
            <p className="text-gray-700 dark:text-gray-300">
              This variant uses <code className="bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded">
                animate=false
              </code> to show a static gradient border without animation.
              This can improve performance when you have many cards on screen.
            </p>
          </BackgroundGradient>
        </div>

        {/* Usage Instructions */}
        <div className="space-y-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            How to Use
          </h2>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p><strong>Import:</strong></p>
            <pre className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto">
              {`import { BackgroundGradient } from '@/domains/shared/components';`}
            </pre>

            <p className="mt-4"><strong>Basic Usage:</strong></p>
            <pre className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto">
{`<BackgroundGradient className="rounded-[22px] p-6 bg-white">
  {/* Your content here */}
</BackgroundGradient>`}
            </pre>

            <p className="mt-4"><strong>Props:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><code>children</code> - The content to wrap</li>
              <li><code>className</code> - Classes for the inner content wrapper</li>
              <li><code>containerClassName</code> - Classes for the outer container</li>
              <li><code>animate</code> - Enable/disable gradient animation (default: true)</li>
            </ul>

            <p className="mt-4"><strong>Important Notes:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Always add a solid background color (bg-white or dark:bg-zinc-900) to prevent transparency</li>
              <li>The component adds 4px padding by default for the gradient border</li>
              <li>Use rounded-[22px] or similar for matching border radius</li>
              <li>The gradient glows more intensely on hover</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
