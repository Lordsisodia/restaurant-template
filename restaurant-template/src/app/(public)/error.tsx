'use client';

import Link from 'next/link';

/**
 * Marketing Route Group Error Boundary
 *
 * This error boundary isolates errors in the marketing pages
 * (landing, reservations, loyalty, etc.) from affecting the rest
 * of the application.
 */

const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log error in development
  if (isDev) {
    globalThis.console?.error?.('[Marketing Error Boundary] Error caught:', error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
          Page Temporarily Unavailable
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          We&apos;re experiencing issues loading this page. Other parts of the site are still available.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/"
              className="block text-center bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="block text-center bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
            >
              Menu
            </Link>
          </div>
        </div>

        {/* Error Details (Development Only) */}
        {isDev && (
          <details className="mt-6">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 font-medium">
              Error Details (Development Only)
            </summary>
            <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-2">Error Message:</p>
              <pre className="text-xs text-gray-600 mb-3 whitespace-pre-wrap break-words">
                {error.message}
              </pre>
              {error.digest && (
                <>
                  <p className="text-xs font-semibold text-gray-700 mb-2">Error Digest:</p>
                  <pre className="text-xs text-gray-600 mb-3">
                    {error.digest}
                  </pre>
                </>
              )}
            </div>
          </details>
        )}

        <p className="mt-6 text-xs text-gray-500 text-center">
          If this problem persists, please contact support or try again later.
        </p>
      </div>
    </div>
  );
}
