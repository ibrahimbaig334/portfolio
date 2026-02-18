import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import ResumePreviewModal from "../ui/ResumePreviewModal";
import { usePortfolioData } from "../../hooks/usePortfolioData";

export default function HeroSection() {
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const sectionRef = useRef(null);

  const { data } = usePortfolioData();
  const hero = data.hero;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const handleMouseEnter = () => setIsMouseInside(true);
    const handleMouseLeave = () => setIsMouseInside(false);

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.querySelector(`#${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const Icon = {
    Eye: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    Spark: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    Mail: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-3 pb-16 pt-16 sm:px-4 sm:pb-24 sm:pt-18 md:pb-28 lg:px-8 lg:pb-36 lg:pt-20"
      aria-label="Hero section"
    >
      {isMouseInside ? (
        <>
          <div
            className="pointer-events-none absolute z-30 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.08) 25%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)",
              opacity: 1,
            }}
          />
          <div
            className="pointer-events-none absolute z-30 h-3 w-3 rounded-full bg-primary-500/60 blur-sm transition-all duration-100"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="pointer-events-none absolute z-30 h-2 w-2 rounded-full bg-secondary-500/50 blur-sm transition-all duration-200"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: "translate(-50%, -50%) scale(1.5)",
            }}
          />
        </>
      ) : null}
      <div className="container relative z-10 mx-auto">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="order-1 space-y-6 lg:order-1 sm:mt-10 lg:mt-0 mt-0">
            <div className="mb-3">
              <span
                className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1.5 text-xs font-semibold text-green-700 shadow-md ring-2 ring-green-200/50 transition-all hover:scale-105 hover:shadow-lg dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-400 dark:ring-green-700/50"
                style={{ animation: "fadeInUp 0.6s ease-out 0s both" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                {hero.availabilityStatus}
              </span>
            </div>

            <p
              className="text-base font-medium text-primary-600 dark:text-primary-400"
              style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}
            >
              Hello! I&apos;m
            </p>

            <h1
              className="group relative mb-3 flex flex-wrap gap-4 font-heading text-3xl font-bold leading-tight drop-shadow-sm sm:text-4xl lg:text-5xl"
              style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
            >
              {hero.nameWords.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-flex">
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      key={letterIndex}
                      className="inline-block cursor-default bg-gradient-to-br from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent transition-all hover:from-primary-600 hover:via-secondary-500 hover:to-accent-600 hover:drop-shadow-lg dark:from-white dark:via-primary-400 dark:to-secondary-400"
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <div
              className="mb-6 flex items-center gap-3"
              style={{ animation: "fadeInUp 0.6s ease-out 0.3s both" }}
            >
              <div className="relative">
                <h2 className="text-lg font-bold text-secondary-600 dark:text-secondary-400 sm:text-xl lg:text-2xl">
                  {hero.designation}
                </h2>
                <div className="mt-1 h-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
              </div>
            </div>

            <p
              className="mb-8 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300"
              style={{ animation: "fadeInUp 0.6s ease-out 0.4s both" }}
            >
              {hero.summary}
            </p>

            <div
              className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
              style={{ animation: "fadeInUp 0.6s ease-out 0.5s both" }}
            >
              <StatCard
                label="Experience"
                value={`${hero.yearsOfExperience}+`}
                icon="briefcase"
              />
              <StatCard
                label="Projects"
                value={`${hero.projectsCompleted}+`}
                icon="spark"
              />
              <StatCard
                label="Satisfaction"
                value={`${hero.satisfactionRate}%`}
                icon="star"
              />
            </div>

            <div
              className="flex flex-col gap-3 sm:flex-row"
              style={{ animation: "fadeInUp 0.6s ease-out 0.6s both" }}
            >
              <Button
                text="Preview Resume"
                variant="primary"
                size="sm"
                onClick={() => setIsResumePreviewOpen(true)}
                leftIcon={Icon.Eye}
              />
              <Button
                text="View Portfolio"
                variant="outline"
                size="sm"
                onClick={() => scrollToSection("portfolio")}
                leftIcon={Icon.Spark}
              />
              <Button
                text="Hire Me"
                variant="outline"
                size="sm"
                onClick={() => scrollToSection("contact")}
                leftIcon={Icon.Mail}
                ariaLabel="Hire me - scroll to contact section"
              />
            </div>

            <div
              className="mt-10"
              style={{ animation: "fadeInUp 0.6s ease-out 0.7s both" }}
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {hero.techStack.map((t, i) =>
                  (() => {
                    const gradients = [
                      ["rgba(59, 130, 246, 0.95)", "rgba(147, 51, 234, 0.95)"],
                      ["rgba(20, 184, 166, 0.95)", "rgba(59, 130, 246, 0.95)"],
                      ["rgba(236, 72, 153, 0.95)", "rgba(147, 51, 234, 0.95)"],
                      ["rgba(245, 158, 11, 0.95)", "rgba(236, 72, 153, 0.95)"],
                    ];
                    const [a, b] = gradients[i % gradients.length];
                    return (
                      <span
                        key={t}
                        className="tech-pill"
                        style={{
                          animationDelay: `${0.3 + i * 0.08}s`,
                          "--tech-a": a,
                          "--tech-b": b,
                        }}
                      >
                        {t}
                      </span>
                    );
                  })(),
                )}
              </div>
            </div>
          </div>

          <div className="order-2 mt-4 sm:mt-6 lg:order-2 lg:mt-10">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-xl">
              {/* Decorative Background with multiple layers (ported from portfolio-v2) */}
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-2 animate-pulse rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 opacity-15 blur-2xl dark:opacity-10" />
                <div className="absolute inset-6 animate-pulse rounded-full bg-gradient-to-br from-secondary-400 to-accent-400 opacity-15 blur-xl [animation-delay:0.5s] dark:opacity-10" />
              </div>

              {/* Floating decorative elements */}
              <div className="pointer-events-none absolute -left-2 top-1/4 h-12 w-12 animate-bounce rounded-full bg-primary-200/45 blur-lg [animation-delay:0.5s] dark:bg-primary-500/15" />
              <div className="pointer-events-none absolute -right-2 bottom-1/4 h-14 w-14 animate-bounce rounded-full bg-secondary-200/45 blur-lg [animation-delay:1s] dark:bg-secondary-500/15" />

              {/* Profile Image with same hover animation (ring + zoom) */}
              <div className="animate-avatar-float">
                <div className="group relative mx-auto h-[min(82vw,24rem)] w-[min(82vw,24rem)] overflow-hidden rounded-full border-8 border-white bg-gradient-to-br from-primary-100 to-secondary-100 shadow-2xl transition-transform duration-500 hover:scale-105 dark:border-gray-700 dark:from-primary-900/20 dark:to-secondary-900/20 sm:h-[28rem] sm:w-[28rem]">
                  {/* Animated gradient ring (shows on hover) */}
                  <div className="animate-spin-slow absolute -inset-2 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-55" />

                  <img
                    src={hero.profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Overlay gradient on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ResumePreviewModal
        isOpen={isResumePreviewOpen}
        onClose={() => setIsResumePreviewOpen(false)}
        resumeUrl={hero.resumeLink}
      />
    </section>
  );
}

function StatCard({ label, value, icon }) {
  const iconPath = {
    briefcase: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    spark: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
    star: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    ),
  };

  return (
    <div className="glass-panel-soft group relative overflow-hidden p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
      <div className="absolute right-0 top-0 h-20 w-20 -translate-y-8 translate-x-8 rounded-full bg-primary-100 opacity-50 transition-transform group-hover:scale-150 dark:bg-primary-900/30" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
          <svg
            className="h-5 w-5 text-primary-600 dark:text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {iconPath[icon]}
          </svg>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
