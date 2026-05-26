'use client'
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SERVICES = [
  {
    tag: "IMAGES + VIDEO",
    headline: "Brand storytelling that makes people choose you.",
    body: "Most businesses sell features. We build the story that makes a customer decide before they've compared a price. Shot, directed, and edited to carry the brand across every channel.",
    imageLeft: false,
  },
  {
    tag: "WEBSITE",
    headline: "A website that turns your brand into enquiries.",
    body: "Not a portfolio piece. A conversion system built around how your customer actually decides. Every page earns its place by moving the visitor forward.",
    imageLeft: true,
  },
  {
    tag: "COPY + CREATIVE",
    headline: "Content that carries the brand and does a job.",
    body: "Content that sounds like the business, not like filler. Written for the channel, built around the brand, and planned to compound over time.",
    imageLeft: false,
  },
  {
    tag: "META + GOOGLE",
    headline: "Paid reach, measured to the enquiry.",
    body: "Ads that speak to the right people with the right message at the right moment. Budgets tracked to outcomes — not impressions, not clicks. Enquiries.",
    imageLeft: true,
  },
  {
    tag: "PERFORMANCE > CRM",
    headline: "A path from first touch to close, with nothing leaking.",
    body: "Most businesses lose the lead after the first contact. We map the entire journey — from ad to booked call — and close the gaps where revenue disappears.",
    imageLeft: false,
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

export default function MarketingPage() {
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
          Marketing
        </motion.p>
        <motion.h1
          className="text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[4.25rem] font-medium text-white leading-[1.1] tracking-tight max-w-4xl mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          Brand-led marketing that makes you the{" "}
          <span className="text-white/[0.22]">obvious choice.</span>
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-white/50 max-w-xl leading-relaxed mb-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          It starts with a brand worth choosing — then the web, content, ads, and
          automation that turn attention into enquiries. Built on storytelling and
          behavioural science, and measured at every step.
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
              HERO VIDEO — marketing-led growth • always visible • endlessly multiplied
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
            Brand first.{" "}
            <span className="text-white/[0.22]">Everything else amplifies it.</span>
          </motion.h2>
          <motion.p
            className="text-base text-white/45 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            Most agencies start with tactics — a new website, some ads, a posting
            schedule — and wonder why nothing compounds. We start with the brand:
            the story, the positioning, the identity that makes a customer choose
            you before they've compared a price. Then every channel amplifies that
            brand instead of competing with it.
          </motion.p>
        </div>
      </section>

      {/* SERVICE ROWS */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pb-24">
        {SERVICES.map((svc) => (
          <motion.div
            key={svc.tag}
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center py-16 border-t border-white/[0.06]`}
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

      {/* TEAM STRIP */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-24 border-t border-white/[0.06]">
        <div className="max-w-2xl">
          <motion.h2
            className="text-3xl md:text-4xl font-medium text-white leading-[1.15] tracking-tight mb-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            A small, senior team.{" "}
            <span className="text-white/[0.22]">Close to the work.</span>
          </motion.h2>
          <motion.p
            className="text-base text-white/45 leading-relaxed mb-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Where most agencies scale by adding headcount, we scale by staying
            senior. You work with the people who actually do the work — no account
            managers, no relay races, no junior hands on senior briefs. We take a
            small number of clients at a time, because senior work done properly
            does not stretch to hundreds.
          </motion.p>
          <motion.p
            className="text-sm text-white/30 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Trusted by established businesses across architecture, yacht management,
            and hospitality.
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
            Ready to close{" "}
            <span className="text-[#00ff81]">the gap?</span>
          </motion.h2>
          <motion.p
            className="text-base text-white/40 leading-relaxed mb-9"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Twenty minutes. Tell us where the business is and what's not working,
            and we'll tell you honestly whether we're the right team to fix it. No
            pitch, no obligation.
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
