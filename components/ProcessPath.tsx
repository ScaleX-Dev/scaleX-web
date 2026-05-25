'use client'
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    number: "01",
    label: "Conversation",
    description:
      "Twenty minutes. Where the business is, what is not working, whether we are the right fit.",
  },
  {
    number: "02",
    label: "Diagnosis",
    description:
      "A full audit of your website, content, or ads so every decision sits on evidence, not opinion.",
  },
  {
    number: "03",
    label: "Build",
    description:
      "Urgent fixes first, the larger work sequenced behind, at a pace that matches where you are.",
  },
];

const ProcessPath = () => {
  return (
    <section className="bg-[#FAFAFA] px-6 md:px-16 lg:px-24 py-24 max-w-screen-xl mx-auto w-full">
      <motion.h2
        className="text-3xl md:text-4xl font-medium text-black mb-3 max-w-2xl leading-snug"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        A clear path from here, tailored to your business
      </motion.h2>

      {/* Steps */}
      <div className="mt-12 border-t border-black/10">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="group/step relative flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-7 px-4 -mx-4 border-b border-black/10 transition-all duration-300 rounded-xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          >
            {/* Beautiful hover green gradient reveal */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-green/10 via-transparent to-transparent opacity-0 group-hover/step:opacity-100 transition-opacity duration-300 rounded-xl" />

            <span className="text-xs text-black/30 font-mono w-8 shrink-0 pt-1 relative z-10 transition-colors duration-300 group-hover/step:text-black">
              {step.number}
            </span>
            <div className="flex-1 relative z-10">
              <h3 className="text-lg font-semibold text-black mb-1 flex items-center gap-2">
                {step.label}
                <span className="w-1.5 h-1.5 rounded-full bg-primary-green scale-0 group-hover/step:scale-100 transition-transform duration-300" />
              </h3>
              <p className="text-sm text-black/55 leading-relaxed max-w-lg transition-colors duration-300 group-hover/step:text-black/70">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex flex-wrap gap-3 mt-10"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
      >
        <Link href="/appointments">
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-black/80 transition text-sm font-medium">
            Book a discovery call
          </button>
        </Link>
        <Link href="/blogs">
          <button className="bg-transparent text-black px-6 py-3 rounded-full border border-black/20 hover:border-black/50 transition text-sm font-medium">
            Watch a sample audit walkthrough
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default ProcessPath;
