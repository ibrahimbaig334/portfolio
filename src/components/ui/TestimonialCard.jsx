import React from "react";

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <div
      className="glass-panel group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" />

      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow">
          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-lg font-bold">
              {(testimonial.name || "A")[0]}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <div className="truncate font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </div>
          <div className="truncate text-xs text-gray-600 dark:text-gray-400">
            {testimonial.role}
            {testimonial.company ? ` • ${testimonial.company}` : ""}
          </div>
        </div>
      </div>

      <div
        className="mb-3 flex items-center gap-1"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${i < (testimonial.rating || 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <span className="mr-1 text-2xl font-bold leading-none text-primary-500">
          “
        </span>
        {testimonial.testimonial}
        <span className="ml-1 text-2xl font-bold leading-none text-primary-500">
          ”
        </span>
      </p>

      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </div>
  );
}
