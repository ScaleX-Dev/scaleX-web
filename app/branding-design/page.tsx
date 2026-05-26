'use client'
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SERVICES = [
  {
    tag: "BRAND IDENTITY — system + guidelines",
    headline: "An identity that survives contact with the real world.",
    body: "Logos break. Fonts drift. Colours get approximated. We build identity systems with the rules, the assets, and the logic to hold together across every team, vendor, and surface — not just on a slide deck.",
    imageLeft: false,
  },
  {
    tag: "WEB DESIGN — landing pages",
    headline: "A website that sells, not just one that looks good.",
    body: "We design websites the way your best salesperson operates — with a clear argument, the right evidence at the right moment, and a path that ends in a conversation.",
    imageLeft: true,
  },
  {
    tag: "PHOTO + VIDEO DIRECTION — cut + edit",
    headline: "We run the brief, not the camera.",
    body: "We direct the shoot to produce the images the website actually needs — not the hero shots the photographer wanted to take. Then we edit to brand, not to taste.",
    imageLeft: false,
  },
  {
    tag: "COLLATERAL — print + physical",
    headline: "The brand, everywhere it lives offline.",
    body: "Proposals, packaging, signage, print. Every physical touchpoint is an extension of the brand — and most businesses let it drift. We don't.",
    imageLeft: true,
  },
];

function ImagePlaceholder({ tag }: { tag: string }) {
  return (
    <div
      className="w-full aspect-[4/3] rounded-2xl bg-[#111213] border border-white/[0.07] flex flex-col items-end justify-end p-5 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
      <span className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase">{tag}</span>
    </div>
  );
}

export default function BrandingDesignPage() {
  return (
    <div className="bg-[#0c0d0e] min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pt-44 pb-24">
        <motion.p
          className="text-[11px] font-mono text-[#00ff81]/60 tracking-[0.25em] uppercase mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Branding & Design
        </motion.p>
        <motion.h1
          className="text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[4.25rem] font-medium text-white leading-[1.1] tracking-tight max-w-4xl mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          Brand and design that makes you the{" "}
          <span className="text-white/[0.22]">obvious choice.</span>
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-white/50 max-w-xl leading-relaxed mb-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          Identity, web, photography and video direction, collateral — built so
          your brand looks like the business you actually are. Led by Vishaka.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          <Link
            href="/appointments"
            className="bg-[#00ff81] text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#00e873] transition-colors duration-200"
          >
            Book a discovery call
          </Link>
          <Link
            href="/blogs"
            className="text-white text-sm font-medium px-6 py-3 rounded-full border border-white/15 hover:border-white/35 hover:bg-white/[0.04] transition-all duration-200"
          >
            See recent work
          </Link>
        </motion.div>
      </section>

      {/* VIDEO PLACEHOLDER */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pb-28">
        <motion.div
          className="w-full aspect-video rounded-2xl bg-[#111213] border border-white/[0.07] flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div className="text-center z-10">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-white/50 ml-1" />
            </div>
            <p className="text-[11px] font-mono text-white/20 tracking-[0.2em] uppercase">
              HERO VIDEO — design process cut • scroll-triggered identity reveals
            </p>
          </div>
        </motion.div>
      </section>

      {/* MANIFESTO */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-24 border-t border-white/[0.06]">
        <div className="max-w-2xl">
          <motion.p
            className="text-[11px] font-mono text-white/30 tracking-[0.2em] uppercase mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            The approach
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.12] tracking-tight mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            From a single project to a brand{" "}
            <span className="text-white/[0.22]">that scales.</span>
          </motion.h2>
          <motion.p
            className="text-base text-white/45 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            Whether you're launching a brand or rebuilding one that's drifted, the
            work expands with you — and stays consistent across every surface, long
            after we hand it over. We build identity systems made to survive real
            use, not just look good in a pitch.
          </motion.p>
        </div>
      </section>

      {/* SERVICE ROWS */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pb-24">
        {SERVICES.map((svc) => (
          <motion.div
            key={svc.tag}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center py-16 border-t border-white/[0.06]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <div className={svc.imageLeft ? "md:order-2" : ""}>
              <span className="text-[10px] font-mono text-[#00ff81]/50 tracking-[0.22em] uppercase mb-4 block">
                {svc.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-medium text-white leading-[1.2] tracking-tight mb-5">
                {svc.headline}
              </h3>
              <p className="text-sm md:text-base text-white/45 leading-relaxed">
                {svc.body}
              </p>
            </div>
            <div className={svc.imageLeft ? "md:order-1" : ""}>
              <ImagePlaceholder tag={svc.tag} />
            </div>
          </motion.div>
        ))}
      </section>

      {/* ABOUT STRIP */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-24 border-t border-white/[0.06]">
        <div className="max-w-2xl">
          <motion.h2
            className="text-3xl md:text-4xl font-medium text-white leading-[1.15] tracking-tight mb-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Design and marketing,{" "}
            <span className="text-white/[0.22]">under one roof.</span>
          </motion.h2>
          <motion.p
            className="text-base text-white/45 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Most agencies split brand from performance — and six months in, the
            website and the feed look like two different companies. We build them
            together. Vishaka leads the design, the marketing team operates inside
            the system she builds. The brand stays the brand across every surface,
            because the same team is responsible for all of it.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-24 border-t border-white/[0.06]">
        <div className="max-w-2xl">
          <motion.p
            className="text-[11px] font-mono text-[#00ff81]/60 tracking-[0.25em] uppercase mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get started
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.12] tracking-tight mb-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Building or rebuilding{" "}
            <span className="text-[#00ff81]">the brand?</span>
          </motion.h2>
          <motion.p
            className="text-base text-white/40 leading-relaxed mb-9"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Twenty minutes. Tell us what you're building, and we'll tell you
            honestly whether we're the right team and what the work would look like.
            No pitch, no obligation.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <Link
              href="/appointments"
              className="bg-[#00ff81] text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#00e873] transition-colors duration-200"
            >
              Book a discovery call
            </Link>
            <Link
              href="/blogs"
              className="text-white text-sm font-medium px-6 py-3 rounded-full border border-white/15 hover:border-white/35 hover:bg-white/[0.04] transition-all duration-200"
            >
              Read recent field notes
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
