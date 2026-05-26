'use client'
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SERVICES = [
  {
    no: "01",
    name: "Branding",
    desc: "We craft identities that stick — from mark to motion. Naming, logos, positioning, brand guidelines, and everything that makes a company unmistakable.",
    tags: ["Logo Design", "Brand Guidelines", "Naming", "Positioning", "Typography System"],
  },
  {
    no: "02",
    name: "Creative Design",
    desc: "Scroll-stopping visuals built for feeds, decks, and campaigns. Every asset is crafted to earn attention and communicate value instantly.",
    tags: ["Social Assets", "Pitch Decks", "Ads Creative", "Print Collateral", "Email Design"],
  },
  {
    no: "03",
    name: "Motion Design",
    desc: "Static is dead. We bring concepts to life through micro-interactions, animated brand assets, and high-impact video production.",
    tags: ["Brand Animation", "Reels & Shorts", "Motion Graphics", "UI Animation", "Video Editing"],
  },
  {
    no: "04",
    name: "Web Design",
    desc: "Bespoke websites engineered for conversion — fast, accessible, and designed to move visitors towards one clear action.",
    tags: ["Landing Pages", "Full-Site Design", "Webflow", "Next.js", "Framer"],
  },
  {
    no: "05",
    name: "UI/UX Audits",
    desc: "We map your user journey, surface friction points, and deliver a prioritised fix-list with wireframes — so you stop leaking customers.",
    tags: ["Heuristic Review", "User Flow Mapping", "Wireframing", "Conversion Optimisation"],
  },
  {
    no: "06",
    name: "Brand Voice",
    desc: "Words that sound like you — consistently. We develop tone-of-voice guidelines, messaging frameworks, and copy templates your whole team can use.",
    tags: ["Tone of Voice", "Messaging Framework", "Copy Templates", "Taglines", "Boilerplate"],
  },
];

const COLOR_SWATCHES = [
  { name: "Imperial", hex: "#E91D27", light: false },
  { name: "Eerie",    hex: "#171717", light: false },
  { name: "Seasalt",  hex: "#FAFAFA", light: true  },
  { name: "Cobalt",   hex: "#2D7DD2", light: false },
  { name: "Amber",    hex: "#F7B731", light: true  },
];

export default function DesignPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FAFAFA] min-h-screen">

        {/* Hero */}
        <section className="px-6 md:px-14 lg:px-20 pt-36 pb-20 max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
            <div>
              <Link href="/#services"
                className="inline-flex items-center gap-2 text-xs font-mono text-black/35 hover:text-black transition-colors mb-8 group"
              >
                <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
                Back to Services
              </Link>
              <span className="text-[10px] font-mono text-black/30 tracking-[0.2em] uppercase block mb-4">
                Discipline 01
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-medium text-black tracking-tight leading-[0.88]">
                Design
                <br />
                <span className="text-black/25">&amp; Creative</span>
              </h1>
            </div>
            <div className="lg:max-w-sm">
              <p className="text-black/50 text-base leading-relaxed mb-8">
                Six disciplines. One creative direction. We build the visual identity and digital presence that makes people stop, look twice, and remember you.
              </p>
              <Link href="/appointments"
                className="inline-flex items-center gap-3 bg-black text-white text-sm font-medium px-6 py-3.5 rounded-full hover:bg-black/80 transition-colors duration-200"
              >
                Book a Design Consultation
                <span>↗</span>
              </Link>
            </div>
          </div>

          {/* Colour palette strip */}
          <div className="flex gap-2 mb-20">
            {COLOR_SWATCHES.map(s => (
              <div key={s.name} className="flex-1 rounded-2xl px-4 py-4 flex flex-col justify-between min-h-[90px]"
                style={{ background: s.hex, border: s.light ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
                <span className={`text-xs font-mono ${s.light ? "text-black/50" : "text-white/60"}`}>{s.hex}</span>
                <span className={`text-sm font-medium ${s.light ? "text-black" : "text-white"}`}>{s.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Services grid */}
        <section className="px-6 md:px-14 lg:px-20 pb-28 max-w-screen-xl mx-auto">
          <div className="border-t border-black/[0.07] pt-12 mb-4 flex items-center justify-between">
            <span className="text-[10px] font-mono text-black/30 tracking-[0.2em] uppercase">6 Services</span>
            <span className="text-[10px] font-mono text-black/20">Design Discipline</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(s => (
              <div key={s.no}
                className="bg-white rounded-2xl p-7 border border-black/[0.07] flex flex-col gap-5 hover:border-black/20 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono text-black/25 tabular-nums">{s.no}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black tracking-tight mb-2">{s.name}</h3>
                  <p className="text-sm text-black/50 leading-relaxed">{s.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                  {s.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono text-black/40 bg-black/[0.04] px-2.5 py-1 rounded-full border border-black/[0.05]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 bg-black rounded-3xl p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-3">
                Ready to build something
                <br />
                <span className="text-white/40">worth looking at?</span>
              </h2>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed">
                Book a 30-minute discovery call. We'll scope your project, share relevant examples, and give you a clear path forward.
              </p>
            </div>
            <Link href="/appointments"
              className="flex-shrink-0 inline-flex items-center gap-3 bg-[#00ff81] text-black text-sm font-semibold px-7 py-4 rounded-full hover:bg-[#00ff81]/90 transition-colors duration-200 whitespace-nowrap"
            >
              Book a Call ↗
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
