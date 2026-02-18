import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import SocialShare from "./components/ui/SocialShare";

import HeroSection from "./components/sections/HeroSection";
import SkillsSection from "./components/sections/SkillsSection";
import InteractiveTimeline from "./components/sections/InteractiveTimeline";
import PortfolioSection from "./components/sections/PortfolioSection";
// import TestimonialsSection from "./components/sections/TestimonialsSection";
import ContactSection from "./components/sections/ContactSection";
import SkeletonPage from "./components/ui/SkeletonPage";
import MesmerizingBackground from "./components/ui/MesmerizingBackground";

export default function App() {
  const [bootLoading, setBootLoading] = useState(() => {
    try {
      return sessionStorage.getItem("portfolio_booted") !== "1";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!bootLoading) return;

    let cancelled = false;
    const done = () => {
      if (cancelled) return;
      setBootLoading(false);
      try {
        sessionStorage.setItem("portfolio_booted", "1");
      } catch {
        // ignore
      }
    };

    // Keep a tiny minimum time so the boot loader transition feels intentional.
    const minDelay = window.setTimeout(done, 650);

    // Also finish on window load (whichever happens later is fine, minDelay ensures smoothness).
    if (document.readyState !== "complete") {
      window.addEventListener("load", done, { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(minDelay);
      window.removeEventListener("load", done);
    };
  }, [bootLoading]);

  return (
    <ThemeProvider>
      <MesmerizingBackground />
      <div className="relative z-10">
        {bootLoading ? (
          <SkeletonPage />
        ) : (
          <>
            <Header />
            <main>
              <HeroSection />
              <SkillsSection />
              <InteractiveTimeline />
              <PortfolioSection />
              {/* <TestimonialsSection /> */}
              <div className="bg-transparent px-3 py-8 sm:px-4 sm:py-10 lg:px-8 lg:py-12">
                <div className="container mx-auto max-w-4xl">
                  <SocialShare />
                </div>
              </div>
              <ContactSection />
            </main>
            <Footer />
            <ScrollToTop />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
