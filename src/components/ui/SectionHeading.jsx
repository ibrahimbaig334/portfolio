import React from "react";

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
}) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`.trim()}>
      <h2 className="mb-3 animate-slide-up font-heading text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mb-5 max-w-3xl animate-slide-up text-base text-gray-600 sm:mb-6 md:text-lg dark:text-gray-300">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
