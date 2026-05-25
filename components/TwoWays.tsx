'use client'
import React from "react";
import { motion } from "framer-motion";

const TwoWays = () => {
  return (
    <section className="bg-[#FAFAFA] px-6 md:px-16 lg:px-24 py-24 max-w-screen-xl mx-auto w-full">
      <motion.h2
        className="text-3xl md:text-4xl font-medium text-black mb-12 leading-snug"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Two ways this goes.
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Standing still */}
        <motion.div
          className="rounded-3xl border border-black/10 bg-white p-8 md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h3 className="text-xl font-semibold text-black/40 mb-5">Standing still</h3>
          <p className="text-sm text-black/50 leading-relaxed">
            The marketing stays behind the business. Enquiries leave the page before they convert. Margin keeps going to the platforms and competitors whose work is no better — only better presented. The gap doesn&apos;t hold steady. It widens, because the businesses being represented well are the ones taking the ground.
          </p>
        </motion.div>

        {/* Working with us */}
        <motion.div
          className="rounded-3xl border border-black bg-black p-8 md:p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
        >
          {/* Subtle green glow */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #00ff81, transparent 70%)" }}
          />
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-white mb-5">Working with us</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              The marketing finally matches the business. A sales funnel that brings enquiries in directly, and brings them in ready. The brand reads as the obvious choice across every surface. A marketing function that compounds quietly in the background while you run the business — the work, matched at last by how it shows up.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TwoWays;
