import React, { memo } from "react";
import { TRANSITIONS } from "../../lib/constants";

const DOMINANT_COLORS = ["#06b6d4", "#ec4899", "#14b8a6", "#f59e0b"];

const STYLE_CONFIG = {
  featured: {
    height: "h-56",
    badgeSpacing: "bottom-4 right-4",
    badgeGap: "gap-2",
    badgeSize: "h-3.5 w-3.5",
    contentPadding: "p-6",
    titleSize: "mb-2 text-xl",
    descSize: "mb-4 text-sm",
    skillPadding: "px-3 py-1",
    skillGap: "gap-2",
    skillDisplayCount: 4,
    titleTextSize: "text-4xl",
  },
  standard: {
    height: "h-40",
    badgeSpacing: "bottom-3 right-3",
    badgeGap: "gap-1.5",
    badgeSize: "h-3 w-3",
    contentPadding: "p-4",
    titleSize: "mb-1 text-base",
    descSize: "mb-3 text-xs",
    skillPadding: "px-2 py-0.5",
    skillGap: "gap-1.5",
    skillDisplayCount: 3,
    titleTextSize: "text-2xl",
  },
};

function ProjectCard({
  project,
  isFeatured = false,
  onViewGallery,
  index = 0,
}) {
  const cardAnimation = `fadeInUp 0.6s ease-out ${isFeatured ? index * 0.1 : 0.4 + (index % 12) * 0.05}s both`;
  const styles = STYLE_CONFIG[isFeatured ? "featured" : "standard"];

  const dominantColor = DOMINANT_COLORS[index % DOMINANT_COLORS.length];
  const baseGradient = `linear-gradient(135deg, ${dominantColor} 0%, ${dominantColor} 45%, #7c3aed 70%, #1e3a8a 100%)`;

  const handleProjectActivate = () => {
    if (project.link) {
      window.location.href = project.link;
      return;
    }
    onViewGallery(project);
  };

  return (
    <div
      className="glass-panel group relative overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
      style={{ animation: cardAnimation }}
      role="article"
      aria-label={`${project.title} project`}
    >
      <div
        onClick={handleProjectActivate}
        className={`relative ${styles.height} flex cursor-pointer items-center justify-center overflow-hidden`}
        style={{ backgroundImage: baseGradient }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleProjectActivate();
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
          style={{ animation: "shimmer 2s infinite" }}
        />
        <div className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:bg-black group-hover:opacity-20" />
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transition-transform duration-700 group-hover:translate-x-full" />

        <div className="relative z-10 px-6 text-center">
          <h2 className={`${styles.titleTextSize} font-bold text-white`}>
            {project.title}
          </h2>
        </div>

        {project.images && project.images.length > 0 ? (
          <div
            className={`absolute z-20 ${styles.badgeSpacing} flex items-center ${styles.badgeGap} rounded-lg bg-white px-2 py-1 shadow-md backdrop-blur transition-all duration-300 hover:scale-105 dark:bg-gray-900/70`}
          >
            <svg
              className={`${styles.badgeSize} text-primary-600 dark:text-white`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-semibold text-gray-900 dark:text-white">
              {project.images.length}
            </span>
          </div>
        ) : null}
      </div>

      <div className={styles.contentPadding}>
        <h3
          className={`${styles.titleSize} font-bold text-gray-900${TRANSITIONS.BASE} group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400`}
        >
          {project.title}
        </h3>
        <p
          className={`${styles.descSize} leading-relaxed text-gray-600 dark:text-gray-400`}
        >
          {project.description}
        </p>

        <div className={`flex flex-wrap ${styles.skillGap}`}>
          {project.usedSkills
            .slice(0, styles.skillDisplayCount)
            .map((skill, i) => {
              const colors = [
                "from-primary-100 to-primary-50 text-primary-700 dark:from-primary-800 dark:to-primary-900 dark:text-primary-300",
                "from-secondary-100 to-secondary-50 text-secondary-700 dark:from-secondary-800 dark:to-secondary-900 dark:text-secondary-300",
                "from-accent-100 to-accent-50 text-accent-700 dark:from-accent-800 dark:to-accent-900 dark:text-accent-300",
                "from-blue-100 to-blue-50 text-blue-700 dark:from-blue-800 dark:to-blue-900 dark:text-blue-300",
              ];
              return (
                <span
                  key={skill}
                  className={`rounded-full bg-gradient-to-r ${colors[i % colors.length]} ${styles.skillPadding} text-xs font-medium ring-1 ring-transparent transition-all hover:scale-105`}
                >
                  {skill}
                </span>
              );
            })}
          {project.usedSkills.length > styles.skillDisplayCount ? (
            <span
              className={`rounded-full bg-gradient-to-r from-gray-100 to-gray-50 ${styles.skillPadding} text-xs font-medium text-gray-700 ring-1 ring-gray-200 transition-all hover:scale-105 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300 dark:ring-gray-600`}
            >
              +{project.usedSkills.length - styles.skillDisplayCount}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectCard);

// tiny keyframe used by this file
if (
  typeof document !== "undefined" &&
  !document.head.querySelector("style[data-shimmer]")
) {
  const style = document.createElement("style");
  style.setAttribute("data-shimmer", "true");
  style.textContent = `@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`;
  document.head.appendChild(style);
}
