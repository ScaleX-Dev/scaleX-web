'use client'
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

import BookingCalendar from '@/components/BookingCalendar';

const AppointmentScheduler = () => {
  const scrollTrackedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", {
      page: "appointments",
      title: "Book an Appointment - ScaleX"
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) {
        trackEvent("click", {
          element: button.tagName.toLowerCase(),
          text: button.textContent?.trim() || '',
          href: button.getAttribute('href'),
          page: "appointments"
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
          trackEvent("scroll_depth", { depth: milestone, page: "appointments" });
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
    <div className="bg-[#0c0d0e] min-h-screen flex flex-col relative overflow-hidden">
      <Metadata
        title="Book an Appointment — ScaleX"
        description="Schedule a free discovery call with the ScaleX team to discuss your business growth."
      />

      {/* Ambient glow */}
      <div className="absolute top-[10%] right-[5%] w-[600px] h-[500px] bg-[#00ff81]/[0.06] rounded-full blur-[140px] pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1.2px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 50% at 60% 20%, black 10%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 60% 20%, black 10%, transparent 100%)",
        }}
      />

      <Navbar />

      {/* Hero */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pt-44 pb-12 relative z-10 w-full">
        <p className="text-[11px] font-mono text-[#00ff81]/60 tracking-[0.25em] uppercase mb-6">
          Book a Call
        </p>
        <h1 className="font-medium tracking-[-0.025em] leading-[1.0] text-4xl md:text-5xl lg:text-[3.5rem] text-white mb-6">
          Let&apos;s start a<span className="hidden sm:inline"><br /></span>{" "}
          <span className="text-white/25">conversation.</span>
        </h1>
        <p className="text-white/40 text-sm md:text-base max-w-sm leading-relaxed">
          A free 30-minute discovery call. We listen first, then tell you exactly how we can help — or whether we&apos;re the right fit.
        </p>
      </section>

      {/* Calendar */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pb-32 relative z-10 w-full">
        <BookingCalendar />
      </section>

      <Footer />
    </div>
  );
};

export default AppointmentScheduler;
