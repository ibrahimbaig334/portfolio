import React, { useMemo, useState } from "react";

const PORTFOLIO_URL = "https://ibrahimbaig.netlify.app/";

const ICONS = {
  x: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2H21l-6.016 6.875L22 22h-5.49l-4.3-6.287L6.71 22H4l6.435-7.356L2 2h5.63l3.887 5.722L18.244 2Zm-1.925 18h1.527L6.8 3.895H5.164L16.319 20Z"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2C18.5 10.6 16.9 9.4 14.9 9.4C13.3 9.4 12.6 10.3 12.2 10.9V9.6H9.2V18.5H12.2V13.6C12.2 12.3 12.5 11.1 14.1 11.1C15.7 11.1 15.7 12.6 15.7 13.7V18.5H18.5M5.7 8.3A1.8 1.8 0 1 0 5.7 4.7A1.8 1.8 0 0 0 5.7 8.3M7.2 18.5V9.6H4.2V18.5H7.2Z"
      />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.04C6.5 2.04 2 6.53 2 12.04C2 17.02 5.66 21.14 10.44 21.88V14.89H7.9V12.04H10.44V9.87C10.44 7.36 11.93 5.98 14.22 5.98C15.31 5.98 16.44 6.17 16.44 6.17V8.63H15.19C13.96 8.63 13.56 9.39 13.56 10.17V12.04H16.32L15.88 14.89H13.56V21.88C18.34 21.14 22 17.02 22 12.04C22 6.53 17.5 2.04 12 2.04Z"
      />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.52 3.48A11.88 11.88 0 0 0 12.07 0C5.5 0 .13 5.37.13 11.94C.13 14.03.67 16.09 1.69 17.9L0 24L6.28 22.35C8.02 23.3 9.98 23.8 12.04 23.8H12.05C18.61 23.8 23.99 18.43 24 11.86C24 8.67 22.76 5.68 20.52 3.48ZM12.05 21.77H12.04C10.27 21.77 8.54 21.29 7.02 20.38L6.66 20.17L2.94 21.15L3.93 17.52L3.69 17.15C2.69 15.56 2.16 13.72 2.16 11.86C2.16 6.41 6.6 1.97 12.06 1.97C14.7 1.97 17.19 3 19.05 4.86C20.91 6.73 21.94 9.21 21.93 11.86C21.93 17.31 17.49 21.76 12.05 21.77ZM17.57 14.28C17.27 14.13 15.8 13.41 15.52 13.31C15.23 13.21 15.03 13.16 14.82 13.46C14.61 13.77 14.01 14.47 13.84 14.67C13.67 14.87 13.5 14.9 13.2 14.75C12.9 14.6 11.93 14.29 10.78 13.27C9.88 12.47 9.28 11.48 9.11 11.18C8.94 10.88 9.09 10.71 9.24 10.56C9.38 10.43 9.54 10.22 9.69 10.05C9.84 9.88 9.89 9.75 9.99 9.55C10.09 9.34 10.04 9.16 9.97 9.01C9.89 8.86 9.3 7.39 9.05 6.79C8.81 6.22 8.57 6.3 8.39 6.29L7.88 6.28C7.67 6.28 7.34 6.36 7.06 6.66C6.78 6.97 5.99 7.7 5.99 9.18C5.99 10.66 7.09 12.08 7.24 12.28C7.39 12.48 9.36 15.52 12.34 16.8C13.05 17.11 13.61 17.29 14.05 17.43C14.77 17.65 15.43 17.62 15.95 17.54C16.53 17.45 17.72 16.82 17.97 16.13C18.22 15.44 18.22 14.86 18.14 14.74C18.07 14.62 17.87 14.53 17.57 14.38V14.28Z"
      />
    </svg>
  ),
};

export default function SocialShare() {
  const [copied, setCopied] = useState(false);

  const shareLinks = useMemo(
    () => [
      {
        id: "x",
        label: "X",
        color: "bg-slate-100 text-slate-900 hover:bg-white",
        href: `https://x.com/intent/post?text=${encodeURIComponent(
          `Check out my portfolio: ${PORTFOLIO_URL}`,
        )}`,
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        color: "bg-sky-700 text-white hover:bg-sky-600",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          PORTFOLIO_URL,
        )}`,
      },
      {
        id: "facebook",
        label: "Facebook",
        color: "bg-blue-600 text-white hover:bg-blue-500",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          PORTFOLIO_URL,
        )}`,
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        color: "bg-emerald-500 text-white hover:bg-emerald-400",
        href: `https://wa.me/?text=${encodeURIComponent(
          `Check out my portfolio: ${PORTFOLIO_URL}`,
        )}`,
      },
    ],
    [],
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore clipboard failures
    }
  };

  return (
    <div className="glass-panel border border-white/10 bg-slate-800/75 p-6 text-white shadow-2xl backdrop-blur-lg">
      <div className="mx-auto max-w-4xl">
        <h3 className="text-center text-3xl font-bold tracking-tight">
          Share My Portfolio
        </h3>
        <p className="mt-2 text-center text-sm text-slate-300">
          Help spread the word and share my work with your network
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {shareLinks.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-center gap-3 rounded-xl px-3 py-4 font-semibold transition ${item.color}`}
              aria-label={`Share on ${item.label}`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
                {ICONS[item.id]}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-slate-600/70 bg-slate-950/65 p-4">
          <label
            htmlFor="portfolio-share-url"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Portfolio URL
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="portfolio-share-url"
              type="text"
              readOnly
              value={PORTFOLIO_URL}
              className="w-full rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-sm text-slate-100 outline-none"
            />
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
