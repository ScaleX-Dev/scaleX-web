'use client'
import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import Link from "next/link";

const TICKER = [
  "Performance Marketing", "Brand Identity", "Web Design",
  "Growth Strategy", "Motion Design", "Content Strategy",
  "Paid Media", "UI/UX Design", "Lead Generation", "SEO",
  "Email Sequences", "Brand Voice",
];

const HEADLINE_LINES = [
  {
    segments: [
      { text: "For businesses ", muted: false },
      { text: "worth more than", muted: true },
    ],
  },
  {
    segments: [{ text: "their marketing shows.", muted: false }],
  },
];

export default function Hero() {
  return (
    <div className="bg-[#FAFAFA] relative overflow-hidden min-h-screen flex flex-col z-10">
      <Navbar />

      {/* Strong green radial — large, centre-top, clearly visible */}
      <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-[#00ff81]/[0.28] rounded-full blur-[120px] pointer-events-none select-none z-0" />

      {/* Secondary smaller glow — bottom-left for depth */}
      <div className="absolute bottom-[5%] left-[5%] w-[500px] h-[420px] bg-[#00ff81]/[0.14] rounded-full blur-[100px] pointer-events-none select-none z-0" />

      {/* Full-coverage dot grid — strong enough to read against the light bg */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.08) 1.4px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Vignette — darken edges slightly so content area pops */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 85% at 50% 45%, transparent 55%, rgba(0,0,0,0.06) 100%)",
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-36 pb-12 max-w-screen-xl mx-auto w-full relative z-10">
        {/* Meta row */}
        <motion.div
          className="flex items-center justify-between mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="text-[11px] font-mono text-black/35 tracking-[0.22em] uppercase">
            Est. 2023 · Sri Lanka &amp; UAE
          </span>
        </motion.div>

        {/* Headline — line-by-line reveal */}
        <div className="mb-14 relative">
          {HEADLINE_LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                className="block font-medium tracking-[-0.025em] leading-[1.0] text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[4.25rem]"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.88,
                  delay: 0.22 + i * 0.11,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line.segments.map((seg, j) => (
                  <span key={j} className={seg.muted ? "text-[#00ff81]" : "text-[#0c0d0e]"}>
                    {seg.text}
                  </span>
                ))}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Bottom row: copy + CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.62, ease: "easeOut" }}
        >
          <p className="text-black/55 max-w-xs text-sm md:text-base leading-relaxed">
            A World-Class marketing, branding, and design partner for B2B and B2C
            service businesses across Sri Lanka and the UAE. Built to close the gap
            between the business and how it shows up online.
          </p>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/appointments">
              <button className="bg-black text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-[#00ff81] hover:text-black transition-all duration-300">
                Book a discovery call
              </button>
            </Link>
            <Link href="/blogs">
              <button className="text-black text-sm font-medium px-7 py-3.5 rounded-full border border-black/15 hover:border-black/35 hover:bg-black/[0.04] transition-all duration-200">
                See recent work →
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom service ticker */}
      <motion.div
        className="relative z-10 border-t border-black/[0.07] py-4 overflow-hidden select-none bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <style>{`@keyframes ticker-ltr { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "ticker-ltr 32s linear infinite" }}
        >
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 px-5 text-[10px] font-mono text-black/[0.38] tracking-[0.2em] uppercase"
            >
              {item}
              <span className="text-[#00c85a] font-bold">·</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
