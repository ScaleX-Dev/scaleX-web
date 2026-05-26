'use client'
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    number: "01",
    label: "Conversation",
    sub: "20 minutes",
    description:
      "We start with a twenty-minute call to understand where the business stands, what is not working, and whether we are the right team to fix it. No pitch. Just an honest assessment of fit.",
  },
  {
    number: "02",
    label: "Diagnosis",
    sub: "Full audit",
    description:
      "A full audit of your website, marketing funnel, and brand presence. We map the gaps, score the drop-offs, and return with evidence-based priorities — not opinions.",
  },
  {
    number: "03",
    label: "Build",
    sub: "Execution",
    description:
      "We execute against the diagnosis, starting with the fixes that move the needle fastest. Design, copy, campaigns — deployed with the urgency the business deserves.",
  },
];

export default function ProcessPath() {
  return (
    <section className="bg-[#0c0d0e] py-28 w-full">
      <div className="max-w-screen-xl mx-auto w-full px-6 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[11px] font-mono text-white/30 tracking-[0.22em] uppercase mb-5 block">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[0.98]">
            Three steps. <span className="text-white/[0.22]">No retainers.</span>
          </h2>
        </motion.div>

        {/* Step Cards with gap-px divider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.07] overflow-hidden rounded-3xl border border-white/[0.07]">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="bg-[#0c0d0e] p-8 md:p-10 flex flex-col justify-between min-h-[340px] relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              {/* Background glowing watermark step number */}
              <span className="absolute right-[-10px] -bottom-10 text-[9rem] font-medium font-sans select-none pointer-events-none text-[#00ff81]/[0.18] group-hover:text-[#00ff81]/[0.22] group-hover:scale-105 transition-all duration-500 transform origin-bottom-right">
                {step.number}
              </span>

              {/* Step info */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="text-xl font-medium text-white">{step.label}</h3>
                  <span className="text-[9px] font-mono text-[#008840] bg-[#00ff81]/[0.12] px-2.5 py-0.5 rounded-full tracking-wide">
                    {step.sub}
                  </span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed max-w-xs group-hover:text-white/70 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional quick next action trigger */}
        <motion.div
          className="mt-14 flex justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/appointments">
            <button className="bg-[#00ff81] text-black text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#00e873] transition-colors duration-200">
              Start with a call
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
