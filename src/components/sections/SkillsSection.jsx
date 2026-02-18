import React from "react";
import SectionHeading from "../ui/SectionHeading";
import { usePortfolioData } from "../../hooks/usePortfolioData";

export default function SkillsSection() {
  const { data } = usePortfolioData();
  const skillCategories = data.skills.categories;

  const highlights = [
    {
      title: "Frontend Excellence",
      description:
        "Responsive, performant UIs with modern React patterns and Tailwind.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
    },
    {
      title: "Backend Development",
      description: "APIs, auth, and scalable services with Node.js / NestJS.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      ),
    },
    {
      title: "Web3 & Smart Contracts",
      description: "Solidity development and Web3 integration for DApps.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      ),
    },
    {
      title: "Python Automation",
      description:
        "Scripts and tooling to automate tasks and improve workflows.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
    },
  ];

  const getColorClasses = (colorScheme) => {
    const colors = {
      primary: {
        border: "border-primary-200 dark:border-primary-800",
        bg: "from-primary-50 to-white dark:from-primary-900/30 dark:to-gray-800",
        text: "text-primary-700 dark:text-primary-300",
        hover:
          "group-hover:from-primary-500/10 group-hover:to-secondary-500/10",
      },
      secondary: {
        border: "border-secondary-200 dark:border-secondary-800",
        bg: "from-secondary-50 to-white dark:from-secondary-900/30 dark:to-gray-800",
        text: "text-secondary-700 dark:text-secondary-300",
        hover: "group-hover:from-secondary-500/10 group-hover:to-accent-500/10",
      },
      accent: {
        border: "border-accent-200 dark:border-accent-800",
        bg: "from-accent-50 to-white dark:from-accent-900/30 dark:to-gray-800",
        text: "text-accent-700 dark:text-accent-300",
        hover: "group-hover:from-accent-500/10 group-hover:to-primary-500/10",
      },
    };
    return colors[colorScheme] || colors.primary;
  };

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-white/20 px-3 py-14 backdrop-blur-sm dark:bg-gray-900/20 sm:px-4 sm:py-16 md:py-18 lg:px-8 lg:py-20"
      aria-label="Skills section"
    >
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          title="Technical Skills"
          subtitle="Expertise across modern web technologies, frameworks, and tools"
          className="mb-10 sm:mb-12"
        />

        <div className="mb-10 grid grid-cols-1 gap-4 sm:mb-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {highlights.map((h, index) => (
            <div
              key={h.title}
              className="glass-panel group relative overflow-hidden p-5 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" />

              <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 p-3 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                <svg
                  className="h-6 w-6 text-white transition-transform duration-500 group-hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {h.icon}
                </svg>
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                {h.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {h.description}
              </p>

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </div>
          ))}
        </div>

        <div className="space-y-6 sm:space-y-8">
          {skillCategories.map((cat, categoryIndex) => {
            const colors = getColorClasses(cat.colorScheme);
            return (
              <div
                key={cat.title}
                className="glass-panel group p-5 sm:p-6 md:p-7 lg:p-8 transition-all duration-500 hover:shadow-2xl"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${0.4 + categoryIndex * 0.15}s both`,
                }}
              >
                <div className="mb-4 flex items-center gap-2.5 sm:mb-6 sm:gap-3">
                  <div
                    className={`h-1 w-12 rounded-full bg-gradient-to-r ${cat.gradientFrom} ${cat.gradientTo} transition-all duration-500 group-hover:w-16`}
                  />
                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                    {cat.title}
                  </h3>
                  <span className="ml-auto rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    {cat.skills.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {cat.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className={`group/skill relative overflow-hidden rounded-lg border ${colors.border} bg-gradient-to-br ${colors.bg} px-5 py-3 font-medium ${colors.text} shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg`}
                      style={{
                        animation: `fadeInScale 0.4s ease-out ${0.6 + categoryIndex * 0.15 + skillIndex * 0.03}s both`,
                      }}
                    >
                      {skill}
                      <div
                        className={`absolute inset-0 -z-10 bg-gradient-to-r ${colors.hover} opacity-0 transition-all duration-300 group-hover/skill:opacity-100`}
                      />
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover/skill:translate-x-full" />
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
