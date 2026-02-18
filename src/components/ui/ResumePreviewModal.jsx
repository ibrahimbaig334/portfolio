import React, { useEffect } from "react";

export default function ResumePreviewModal({ isOpen, onClose, resumeUrl }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Resume preview"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close resume preview"
      />

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
          <div className="font-semibold text-gray-900 dark:text-white">
            Resume Preview
          </div>
          <div className="flex items-center gap-2">
            {resumeUrl ? (
              <a
                href={resumeUrl}
                download
                className="rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-primary-700"
              >
                Download
              </a>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>

        <div className="h-[75vh] bg-gray-50 dark:bg-gray-950">
          {resumeUrl ? (
            <iframe
              title="Resume preview"
              src={resumeUrl}
              className="h-full w-full"
              style={{ border: 0 }}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-gray-600 dark:text-gray-300">
              No resume file configured. Update{" "}
              <code className="mx-1 rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">
                src/data/portfolioData.js
              </code>
              .
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
