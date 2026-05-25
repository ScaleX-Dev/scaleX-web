'use client'
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ConversationCTA = () => {
  return (
    <section className="bg-[#FAFAFA] px-6 md:px-16 lg:px-24 py-16 max-w-screen-xl mx-auto w-full">
      <div className="bg-black text-white rounded-3xl p-10 md:p-16 lg:p-20 relative overflow-hidden border border-white/5 shadow-2xl">
        {/* Modern dark grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Glowing backdrop animations */}
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 filter blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #00ff81, transparent 70%)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-20 filter blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10">
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.05] tracking-tight mb-6 max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Start with a conversation.
          </motion.h2>

          <motion.p
            className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            Twenty minutes to turn your business into the obvious choice. Tell us where things stand and what&apos;s not working, and we&apos;ll tell you honestly whether we&apos;re the right team to fix it.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          >
            <Link href="/appointments">
              <button className="bg-primary-green text-black px-6 py-3 rounded-full hover:bg-white transition text-sm font-medium">
                Book a discovery call
              </button>
            </Link>
            <Link href="/blogs">
              <button className="bg-transparent text-white px-6 py-3 rounded-full border border-white/20 hover:border-white/50 transition text-sm font-medium">
                Read recent field notes
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConversationCTA;
