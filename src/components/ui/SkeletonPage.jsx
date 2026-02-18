import React from "react";

export default function SkeletonPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="glass-panel-soft flex w-full max-w-sm flex-col items-center gap-4 px-8 py-8 text-center">
          <div
            className="relative h-16 w-16"
            role="status"
            aria-label="Loading portfolio"
          >
            <span className="boot-loader-ring absolute inset-0" />
            <span className="boot-loader-ring boot-loader-ring-delay absolute inset-[7px]" />
            <span className="boot-loader-dot absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 dark:bg-primary-400" />
          </div>
          <p className="text-base font-semibold">Loading portfolio...</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Warming things up for a smooth experience.
          </p>
        </div>
      </div>
    </div>
  );
}
