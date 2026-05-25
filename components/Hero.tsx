'use client'
import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-[#FAFAFA] relative overflow-hidden min-h-screen flex flex-col">
      <Navbar />

      {/* Modern crisp background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Interactive/Animated neon-green and emerald blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full opacity-35 filter blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00ff81 10%, #10b981 70%)"
        }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[5%] right-[-10%] w-[45vw] h-[45vw] max-w-[550px] rounded-full opacity-30 filter blur-[130px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00ff81 0%, #34d399 80%)"
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-36 pb-24 max-w-screen-xl mx-auto w-full relative z-10">
        <motion.p
          className="text-sm font-semibold text-black/40 mb-6 tracking-widest uppercase inline-flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
          Sri Lanka &amp; UAE — Marketing, Branding &amp; Design
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-medium text-black leading-[1.05] tracking-tight mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          For businesses worth more than their marketing shows.
        </motion.h1>

        <motion.p
          className="text-black/55 mb-10 max-w-xl text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
        >
          We are a World-Class marketing, branding, and design partner for B2B and B2C service businesses across Sri Lanka and the UAE. Built to close the gap between the business and how it shows up online.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <Link href="/appointments">
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-black/80 transition text-sm font-medium">
              Book a discovery call
            </button>
          </Link>
          <Link href="/blogs">
            <button className="bg-transparent text-black px-6 py-3 rounded-full border border-black/20 hover:border-black/50 transition text-sm font-medium">
              See recent work
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
