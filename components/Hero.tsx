'use client'
import React from "react";
import Navbar from "./Navbar";
import SignalField from "./SignalField";
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

      {/* Live signal field — the dot grid, responding to cursor and pulses */}
      <div className="absolute inset-0 z-0">
        <SignalField />
      </div>

      {/* Vignette — darken edges slightly so content area pops */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 85% at 50% 45%, transparent 55%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-28 sm:pt-32 md:pt-36 pb-6 md:pb-8 max-w-screen-xl mx-auto w-full relative z-10">
        {/* Meta row */}
        <motion.div
          className="flex items-center gap-3 mb-10 md:mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff81] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c85a]" />
          </span>
          <span className="text-[11px] font-mono text-black/35 tracking-[0.22em] uppercase">
            Est. 2023 · Sri Lanka &amp; UAE
          </span>
        </motion.div>

        {/* Headline — line-by-line reveal */}
        <div className="mb-14 relative">
          {HEADLINE_LINES.map((line, i) => (
            <div key={i} className="overflow-hidden pb-[0.14em]">
              <motion.span
                className="block font-medium tracking-[-0.025em] leading-[1.0] text-[2rem] xs:text-[2.4rem] sm:text-5xl md:text-[3.5rem] lg:text-[4.25rem]"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.88,
                  delay: 0.22 + i * 0.11,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line.segments.map((seg, j) => (
                  <span key={j} className={seg.muted ? "text-[#00c85a]" : "text-[#0c0d0e]"}>
                    {seg.text}
                  </span>
                ))}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Bottom row: copy + CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.62, ease: "easeOut" }}
        >
          <p className="text-black/55 max-w-sm text-[14px] md:text-base leading-relaxed">
            A World-Class marketing, branding, and design partner for B2B and B2C
            service businesses across Sri Lanka and the UAE. Built to close the gap
            between the business and how it shows up online.
          </p>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/appointments">
              <button className="bg-black text-white text-sm font-medium px-6 py-3 sm:px-7 sm:py-3.5 rounded-full hover:bg-[#00ff81] hover:text-black transition-all duration-300 min-h-[44px]">
                Book a discovery call
              </button>
            </Link>
            <Link href="/blogs">
              <button className="text-black text-sm font-medium px-6 py-3 sm:px-7 sm:py-3.5 rounded-full border border-black/15 hover:border-black/35 hover:bg-black/[0.04] transition-all duration-200 min-h-[44px]">
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
