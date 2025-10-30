'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Root Error Boundary (Last Resort)
 *
 * This is the top-level error boundary for the entire application.
 * If an error reaches here, it means it wasn’t caught by any
 * route-specific error boundary.
 *
 * This should be a rare occurrence - most errors should be caught
 * by segment-level boundaries (e.g., /menu/error.tsx).
 */
export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    globalThis.console?.error?.('[ROOT ERROR BOUNDARY - CRITICAL]', error);
    globalThis.console?.error?.('[ROOT ERROR BOUNDARY] Stack:', error.stack);

    // TODO: Log to error monitoring service (Sentry, etc.)
    // Example: errorLogger.logError(error, { level: 'critical', boundary: 'root' });
  }, [error]);

  const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        {/* Critical Error Icon */}
        <div className="flex justify-center mb-4">
          <svg
            className="w-20 h-20 text-red-600"
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
        <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">
          Critical Application Error
        </h1>
        <p className="text-gray-600 mb-2 text-center">
          We encountered a critical error that affected the entire application.
        </p>
        <p className="text-gray-500 text-sm mb-6 text-center">
          This is unusual and has been logged for our team to investigate.
        </p>

        {/* Error Summary (User-Friendly) */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800 font-medium mb-1">Error Details:</p>
          <p className="text-sm text-red-700">
            {error.message || 'An unexpected error occurred'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              console.log('[ROOT ERROR BOUNDARY] User clicked reset');
              reset();
            }}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Reloading Application
          </button>
          <Link
            href="/"
            className="block w-full text-center bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Go to Home Page
          </Link>
          {isDev && (
            <button
              onClick={() => setShowDetails((s) => !s)}
              className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {showDetails ? 'Hide' : 'Show'} Technical Details
            </button>
          )}
        </div>

        {/* Technical Details (Development Only) */}
        {isDev && showDetails && (
          <details open className="mt-6">
            <summary className="cursor-pointer text-sm font-semibold text-gray-700 mb-3">
              Technical Details (Development Mode)
            </summary>
            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Error Message:</p>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap break-words">
                  {error.message}
                </pre>
              </div>
              {error.stack && (
                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-2">Stack Trace:</p>
                  <pre className="text-xs text-gray-600 overflow-auto max-h-64 whitespace-pre-wrap break-words bg-white p-3 rounded border border-gray-200">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </details>
        )}

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-2">
            If this error persists, please:
          </p>
          <ul className="text-xs text-gray-500 space-y-1 text-center">
            <li>Try refreshing your browser</li>
            <li>Clear your browser cache</li>
            <li>Contact support if the problem continues</li>
          </ul>
        </div>

        {isDev && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-xs text-yellow-800 font-medium">
              Development Note: This error reached the root boundary, which means it wasn’t caught by
              any route-specific error boundary. Consider adding a segment-level error.tsx file to
              handle this error closer to its source.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
