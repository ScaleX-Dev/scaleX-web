'use client'
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ConversationCTA() {
  return (
    <section className="bg-[#0c0d0e] py-16 md:py-20 px-6 md:px-16 lg:px-24 relative overflow-hidden z-0">
      {/* Subtle green ambient glow */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,129,0.06), transparent 65%)",
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,129,0.04), transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto">
        {/* Top label */}
        <motion.span
          className="text-[11px] font-mono text-[#00ff81]/60 tracking-[0.22em] uppercase mb-10 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Get Started
        </motion.span>

        {/* Two-column layout: headline left, body+CTAs right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-20">
          {/* Left: Big headline */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[0.96] tracking-tight">
              Start with a
              <br />
              <span className="text-[#00ff81]">conversation.</span>
            </h2>
          </motion.div>

          {/* Right: Body + CTAs */}
          <motion.div
            className="lg:max-w-xs shrink-0"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
          >
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Twenty minutes to turn your business into the obvious choice. Tell us where
              things stand and what’s not working, and we’ll tell you honestly whether
              we’re the right team to fix it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/appointments">
                <button className="bg-[#00ff81] text-black text-sm font-medium px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-200 min-h-[44px]">
                  Book a discovery call
                </button>
              </Link>
              <Link href="/blogs">
                <button className="text-white text-sm font-medium px-7 py-3.5 rounded-full border border-white/[0.12] hover:border-white/30 transition-colors duration-200 min-h-[44px]">
                  Read field notes →
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom rule */}
        <motion.div
          className="mt-20 h-px bg-white/[0.06]"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
          style={{ background: "linear-gradient(to right, rgba(0,255,129,0.3), rgba(0,255,129,0.05))" }}
        />
      </div>
    </section>
  );
}
