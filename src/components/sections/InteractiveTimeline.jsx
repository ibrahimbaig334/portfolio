import React, { useMemo } from "react";
import SectionHeading from "../ui/SectionHeading";
import { TRANSITIONS } from "../../lib/constants";
import { usePortfolioData } from "../../hooks/usePortfolioData";

export default function InteractiveTimeline() {
  const { data } = usePortfolioData();

  const timelineItems = useMemo(() => {
    const exps = (data.experience || []).map((exp) => {
      const latestRole = exp.careerProgression?.[0];
      return {
        id: `exp-${exp.company}`,
        type: "experience",
        title: latestRole?.title || exp.company,
        subtitle: exp.company,
        location: exp.location,
        startDate: exp.startDate,
        endDate: latestRole?.endDate || "Present",
        status: exp.currentlyWorking ? "current" : "completed",
        description: exp.keyAchievements,
        progressions: exp.careerProgression,
      };
    });

    const all = [...exps];

    const parseDate = (dateStr) => {
      if (!dateStr || dateStr === "Present") return new Date();
      return new Date(dateStr);
    };

    return all.sort(
      (a, b) =>
        parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime(),
    );
  }, [data.experience]);

  const formatDate = (d) => (d === "Present" ? "Present" : d);

  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-white/15 py-14 backdrop-blur-sm dark:bg-gray-900/20 sm:py-16 md:py-18 lg:py-20"
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <SectionHeading
          title="My Journey"
          subtitle="A chronological view of my career path"
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary-200 via-secondary-200 to-primary-200 dark:from-primary-800 dark:via-secondary-800 dark:to-primary-800 md:left-1/2" />

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const isEducation = item.type === "education";

              return (
                <div
                  key={item.id}
                  className={`relative flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`,
                  }}
                >
                  <div
                    className={`glass-panel ml-14 w-full p-4 sm:ml-16 sm:p-5 md:ml-0 md:w-[calc(50%-3rem)] md:p-6 ${TRANSITIONS.BASE} hover:shadow-2xl ${
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    {item.status === "in-progress" ||
                    item.status === "current" ? (
                      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        {item.status === "current"
                          ? "Currently Working"
                          : "In Progress"}
                      </div>
                    ) : null}

                    <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <h4 className="mb-2 font-semibold text-primary-600 dark:text-primary-400">
                      {item.subtitle}
                    </h4>

                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formatDate(item.startDate)} -{" "}
                        {formatDate(item.endDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item.location}
                      </span>
                      {isEducation && item.gpa ? (
                        <span className="flex items-center gap-1 font-medium text-accent-600 dark:text-accent-400">
                          CGPA: {item.gpa}/{item.gpaScale || "4.0"}
                        </span>
                      ) : null}
                    </div>

                    {item.progressions && item.progressions.length > 1 ? (
                      <div className="mb-4 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 p-4 dark:from-primary-900/10 dark:to-secondary-900/10">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">
                            Career Path
                          </span>
                          <span className="ml-auto rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                            {item.progressions.length} Roles
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          {item.progressions.map((prog, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 rounded-md bg-white/60 p-2.5 transition-all hover:bg-white hover:shadow-sm dark:bg-gray-800/40 dark:hover:bg-gray-800"
                            >
                              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-xs font-bold text-white shadow-sm">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {prog.title}
                                </div>
                                <div className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                                  {formatDate(prog.startDate)} -{" "}
                                  {formatDate(prog.endDate)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {item.description && item.description.length ? (
                      <ul className="space-y-2">
                        {item.description.slice(0, 3).map((desc, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <div className="absolute left-6 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg dark:border-gray-800 sm:left-6 sm:h-11 sm:w-11 md:left-1/2 md:h-12 md:w-12 md:-translate-x-1/2">
                    {isEducation ? (
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.27L3.81 12 12 7.73 20.19 12 12 16.27z" />
                        <path d="M12 17l-7-3.82v5.07c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5.07L12 17z" />
                      </svg>
                    ) : (
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
