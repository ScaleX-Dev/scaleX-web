'use client'
import React from "react";
import { motion } from "framer-motion";

export default function TwoWays() {
  return (
    <section className="bg-[#FAFAFA] py-20 md:py-28 w-full">
      <div className="max-w-screen-xl mx-auto w-full px-6 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[11px] font-mono text-black/30 tracking-[0.22em] uppercase mb-5 block">
            The Decision
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight leading-[1.05]">
            Two ways this goes.
          </h2>
        </motion.div>

        {/* Two panels — gap-px on black bg creates a thin divider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/[0.08] rounded-3xl overflow-hidden">
          {/* Path A — Standing still */}
          <motion.div
            className="bg-[#F5F5F5] p-8 md:p-12 flex flex-col justify-between min-h-[320px] md:min-h-[380px]"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-10">
                <span className="text-[10px] font-mono text-black/25 tracking-[0.2em] uppercase">
                  Path A
                </span>
                {/* Flat/stagnant visual */}
                <div className="flex-1 h-px bg-black/10" />
              </div>
              <h3 className="text-2xl font-medium text-black/30 mb-5 leading-snug">
                Standing still
              </h3>
              <p className="text-sm text-black/40 leading-relaxed max-w-sm">
                The marketing stays behind the business. Enquiries leave the page before they
                convert. Margin keeps going to the platforms and competitors whose work is no
                better — only better presented. The gap doesn’t hold steady. It widens,
                because the businesses being represented well are the ones taking the ground.
              </p>
            </div>
            {/* Flat-line indicator */}
            <div className="flex items-end gap-1 mt-10 opacity-25">
              {[18, 18, 20, 17, 19, 18, 20, 18].map((h, i) => (
                <div
                  key={i}
                  className="bg-black rounded-sm w-3 flex-shrink-0"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Path B — Working with us */}
          <motion.div
            className="bg-[#0c0d0e] p-8 md:p-12 flex flex-col justify-between min-h-[320px] md:min-h-[380px] relative overflow-hidden"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
          >
            {/* Green glow accent */}
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(0,255,129,0.12), transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <span className="text-[10px] font-mono text-[#00ff81] tracking-[0.2em] uppercase">
                  Path B
                </span>
                {/* Upward-trend visual */}
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,255,129,0.12), rgba(0,255,129,0.5))",
                  }}
                />
              </div>
              <h3 className="text-2xl font-medium text-[#00ff81] mb-5 leading-snug">
                Working with us
              </h3>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                The marketing finally matches the business. A sales funnel that brings
                enquiries in directly, and brings them in ready. The brand reads as the
                obvious choice across every surface. A marketing function that compounds
                quietly in the background while you run the business — the work,
                matched at last by how it shows up.
              </p>
            </div>
            {/* Growing bar chart */}
            <div className="flex items-end gap-1 mt-10 relative z-10">
              {[10, 14, 18, 22, 26, 32, 38, 44].map((h, i) => (
                <div
                  key={i}
                  className="rounded-sm w-3 flex-shrink-0"
                  style={{
                    height: `${h}px`,
                    background: `rgba(0,255,129,${0.12 + i * 0.1})`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
