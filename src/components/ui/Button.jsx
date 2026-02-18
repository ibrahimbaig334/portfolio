import React from "react";

export default function Button({
  text,
  type = "button",
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  ariaLabel,
  leftIcon,
  rightIcon,
}) {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 focus:ring-primary-300 dark:focus:ring-primary-800 active:scale-95",
    secondary:
      "bg-secondary-600 dark:bg-secondary-500 text-white hover:bg-secondary-700 dark:hover:bg-secondary-600 focus:ring-secondary-300 dark:focus:ring-secondary-800 active:scale-95",
    outline:
      "border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-300 dark:focus:ring-primary-800",
    ghost:
      "text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-300 dark:focus:ring-primary-800",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()}
      aria-label={ariaLabel || text}
    >
      {leftIcon || rightIcon ? (
        <span className="inline-flex items-center justify-center gap-2">
          {leftIcon ? <span className="-ml-0.5">{leftIcon}</span> : null}
          <span>{text}</span>
          {rightIcon ? <span className="-mr-0.5">{rightIcon}</span> : null}
        </span>
      ) : (
        text
      )}
    </button>
  );
}
