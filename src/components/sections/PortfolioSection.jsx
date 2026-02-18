import React, { useCallback, useMemo, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import ImageGalleryModal from "../ui/ImageGalleryModal";
import ProjectCard from "../ui/ProjectCard";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { useScrollToSection } from "../../lib/useScrollToSection";

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const scrollToSection = useScrollToSection();
  const { data } = usePortfolioData();

  const projectsNewestFirst = useMemo(() => {
    const projects = data.projects || [];
    return projects.slice().reverse();
  }, [data.projects]);
  const featuredProjects = projectsNewestFirst.filter((p) => p.isFeatured);
  const allProjects = projectsNewestFirst;

  const handleViewScreenshots = useCallback((project) => {
    setSelectedProject(project);
    setIsGalleryOpen(true);
  }, []);

  const handleCloseGallery = useCallback(() => setIsGalleryOpen(false), []);

  const handleContactClick = useCallback(() => {
    scrollToSection("#contact");
  }, [scrollToSection]);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-white/20 px-3 py-14 backdrop-blur-sm dark:bg-gray-900/20 sm:px-4 sm:py-16 md:py-18 lg:px-8 lg:py-20"
      aria-label="Portfolio section"
    >
      <div className="container relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          title="Key Recent Projects"
          subtitle="Showcasing my best work in web development and design"
          className="mb-8 sm:mb-10"
        />

        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="mb-6 flex items-center gap-2.5 sm:mb-8 sm:gap-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-100 to-pink-100 px-3 py-1 text-sm font-semibold text-primary-700 ring-2 ring-primary-200/50 dark:from-primary-900/40 dark:to-pink-900/40 dark:text-primary-300 dark:ring-primary-700/50">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-primary-500 to-pink-500" />
              Highlighted Work
            </span>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isFeatured
                index={index}
                onViewGallery={handleViewScreenshots}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center gap-2.5 sm:mb-8 sm:gap-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              All Projects
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-secondary-100 to-accent-100 px-3 py-1 text-sm font-semibold text-secondary-700 ring-2 ring-secondary-200/50 dark:from-secondary-900/40 dark:to-accent-900/40 dark:text-secondary-300 dark:ring-secondary-700/50">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-secondary-500 to-accent-500" />
              {allProjects.length} Projects
            </span>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
            {allProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onViewGallery={handleViewScreenshots}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-accent-600 via-primary-600 to-secondary-600 p-6 shadow-2xl sm:mt-12 sm:p-8 lg:mt-16 lg:p-12">
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <h3 className="mb-3 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-2xl font-bold text-transparent sm:mb-4 sm:text-3xl">
              Interested in working together?
            </h3>
            <p className="mb-5 text-base text-white/90 sm:mb-6 sm:text-lg lg:mb-8">
              I&apos;m always open to exciting projects and collaborations.
            </p>
            <button
              onClick={handleContactClick}
              className="group relative overflow-hidden rounded-xl bg-white px-8 py-3 font-semibold text-primary-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
              aria-label="Get in touch"
              type="button"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get in Touch
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
        images={(selectedProject && selectedProject.images) || []}
        projectTitle={(selectedProject && selectedProject.title) || ""}
      />
    </section>
  );
}
