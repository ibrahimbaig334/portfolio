import React from "react";

export default function DecorativeBackground({
  variant = "default",
  opacity = 40,
}) {
  const base = "absolute inset-0 z-0";
  const style = { opacity: Math.max(0, Math.min(100, opacity)) / 100 };

  if (variant === "minimal") {
    return (
      <div className={`${base} pointer-events-none`} style={style}>
        <div className="absolute -left-16 top-24 h-72 w-72 animate-pulse rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute -right-16 bottom-24 h-72 w-72 animate-pulse rounded-full bg-secondary-500/20 blur-3xl" />
      </div>
    );
  }

  if (variant === "dense") {
    return (
      <div className={`${base} pointer-events-none`} style={style}>
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary-500/15 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-secondary-500/15 blur-3xl [animation-delay:1s]" />
        <div className="absolute left-1/3 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-accent-500/15 blur-3xl [animation-delay:2s]" />
      </div>
    );
  }

  if (variant === "3d") {
    // Legacy placeholder: the app now uses a single global background.
    return null;
  }

  return (
    <div className={`${base} pointer-events-none`} style={style}>
      <div className="absolute -left-4 top-20 h-72 w-72 animate-pulse rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute -right-4 bottom-20 h-72 w-72 animate-pulse rounded-full bg-secondary-500/20 blur-3xl" />
    </div>
  );
}
