'use client'
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogCards";
import Projects from "@/components/Projects";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

const ProjectsPage = () => {
  const scrollTrackedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", {
      page: "projects",
      title: "Projects - ScaleX"
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) {
        trackEvent("click", {
          element: button.tagName.toLowerCase(),
          text: button.textContent?.trim() || '',
          href: button.getAttribute('href'),
          page: "projects"
        });
      }
    };

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercentage >= milestone && !scrollTrackedRef.current.has(milestone)) {
          scrollTrackedRef.current.add(milestone);
          trackEvent("scroll_depth", { depth: milestone, page: "projects" });
        }
      });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <Metadata
        title="Case Studies — ScaleX"
        description="Explore our portfolio of successful digital marketing projects at ScaleX."
      />
      <Navbar />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#FAFAFA]">
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              backgroundImage: "radial-gradient(rgba(0,0,0,0.035) 1.2px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(ellipse 72% 58% at 50% 32%, black 15%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 72% 58% at 50% 32%, black 15%, transparent 100%)",
            }}
          />
          <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pt-44 pb-16 relative z-10">
            <p className="text-[11px] font-mono text-black/30 tracking-[0.25em] uppercase mb-6">
              Our Work
            </p>
            <h1 className="font-medium tracking-[-0.025em] leading-[1.0] text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] text-[#0c0d0e] mb-6">
              Work that speaks<span className="hidden sm:inline"><br /></span>{" "}
              <span className="text-[#00ff81]">for itself.</span>
            </h1>
            <p className="text-black/45 text-sm md:text-base max-w-sm leading-relaxed">
              A curated look at the brands we&apos;ve built, the campaigns we&apos;ve run, and the results that followed.
            </p>
          </div>
        </section>

        <Projects />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
