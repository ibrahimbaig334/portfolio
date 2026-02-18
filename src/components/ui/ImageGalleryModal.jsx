import React, { useEffect, useMemo, useState } from "react";

export default function ImageGalleryModal({
  isOpen,
  onClose,
  images = [],
  projectTitle = "",
}) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images : []),
    [images],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setIndex((i) => Math.min(i + 1, safeImages.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, safeImages.length]);

  if (!isOpen) return null;

  const hasImages = safeImages.length > 0;
  const current = hasImages ? safeImages[index] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Project image gallery"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close gallery"
      />

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
          <div className="min-w-0">
            <div className="truncate font-semibold text-gray-900 dark:text-white">
              {projectTitle || "Gallery"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {hasImages
                ? `Image ${index + 1} of ${safeImages.length}`
                : "No images available"}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>

        <div className="relative flex h-[70vh] items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
          {hasImages ? (
            <img
              src={current}
              alt={`${projectTitle} screenshot ${index + 1}`}
              className="max-h-full max-w-full rounded-xl shadow"
              loading="lazy"
            />
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-300">
              Add image URLs to the project in{" "}
              <code className="mx-1 rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">
                src/data/portfolioData.js
              </code>
              .
            </div>
          )}

          {hasImages && safeImages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                disabled={index === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-xl bg-white/90 p-3 text-gray-900 shadow transition disabled:opacity-40 dark:bg-gray-900/80 dark:text-white"
                aria-label="Previous image"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  setIndex((i) => Math.min(i + 1, safeImages.length - 1))
                }
                disabled={index === safeImages.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl bg-white/90 p-3 text-gray-900 shadow transition disabled:opacity-40 dark:bg-gray-900/80 dark:text-white"
                aria-label="Next image"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
