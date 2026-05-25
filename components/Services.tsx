'use client'
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Constellation (Marketing panel background) ───────── */
const NODES = [
  { x: 55, y: 35 }, { x: 145, y: 18 }, { x: 230, y: 55 },
  { x: 310, y: 28 }, { x: 368, y: 82 }, { x: 330, y: 138 },
  { x: 250, y: 152 }, { x: 162, y: 130 }, { x: 72, y: 138 },
  { x: 30, y: 88 }, { x: 188, y: 82 }, { x: 288, y: 105 },
];
const CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,0],
  [10,1],[10,2],[10,7],[10,11],[11,3],[11,4],[11,5],[0,10],[6,11],
];
const GREEN_NODES = new Set([1, 4, 10, 11]);

function ConstellationSVG() {
  const [tick, setTick] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    let id: number;
    const loop = () => { raf.current += 0.008; setTick(raf.current); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);
  const drifted = NODES.map((n, i) => ({
    x: n.x + Math.sin(tick * 0.7 + i * 1.2) * 5,
    y: n.y + Math.cos(tick * 0.5 + i * 0.9) * 4,
  }));
  return (
    <svg className="w-full h-full" viewBox="0 0 400 175" fill="none">
      {CONNECTIONS.map(([a, b], i) => {
        const na = drifted[a], nb = drifted[b];
        const p = (Math.sin(tick * 1.5 + i * 0.6) + 1) / 2;
        const isG = GREEN_NODES.has(a) || GREEN_NODES.has(b);
        return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
          stroke={isG ? "#00ff81" : "rgba(255,255,255,0.18)"}
          strokeWidth={isG ? 0.9 : 0.5} opacity={0.2 + p * 0.38} />;
      })}
      {drifted.map((n, i) => {
        const g = GREEN_NODES.has(i);
        const p = (Math.sin(tick * 2 + i * 0.8) + 1) / 2;
        return (
          <g key={i}>
            {g && <circle cx={n.x} cy={n.y} r={10 + p * 6} fill="#00ff81" opacity={0.05 + p * 0.08} />}
            <circle cx={n.x} cy={n.y} r={g ? 2.5 + p * 1.5 : 2} fill={g ? "#00ff81" : "rgba(255,255,255,0.65)"} />
          </g>
        );
      })}
      <circle r="2.5" fill="#00ff81" opacity="0.9">
        <animateMotion dur="4s" repeatCount="indefinite" path="M55,35 L145,18 L230,55 L188,82 L162,130 L72,138 L30,88 Z" />
      </circle>
      <circle r="1.5" fill="#00ff81" opacity="0.6">
        <animateMotion dur="6.5s" repeatCount="indefinite" path="M310,28 L288,105 L330,138 L250,152 L188,82 Z" />
      </circle>
    </svg>
  );
}

/* ─── Data ──────────────────────────────────────────────── */
const COLOR_SWATCHES = [
  { name: "Imperial", hex: "#E91D27", light: false },
  { name: "Eerie",    hex: "#171717", light: false },
  { name: "Seasalt",  hex: "#FAFAFA", light: true  },
  { name: "Cobalt",   hex: "#2D7DD2", light: false },
  { name: "Amber",    hex: "#F7B731", light: true  },
];
const PALETTE_DOTS = [
  "#E91D27","#171717","#FAFAFA","#2D7DD2","#F7B731",
  "#7C3AED","#10B981","#F97316","#38BDF8","#FF6B4A","#4ADE80","#E040FB",
];
const DESIGN_SERVICES = [
  { no: "01", name: "Branding" },
  { no: "02", name: "Creative Design" },
  { no: "03", name: "Motion Design" },
  { no: "04", name: "Web Design" },
  { no: "05", name: "UI/UX Audits" },
  { no: "06", name: "Brand Voice" },
];
const MARKETING_SERVICES = [
  { no: "07", name: "Growth Strategy" },
  { no: "08", name: "Performance Marketing" },
  { no: "09", name: "SEO" },
  { no: "10", name: "Lead Nurturing" },
  { no: "11", name: "Founder Content" },
  { no: "12", name: "Data Stack" },
];

/* ─── Component ─────────────────────────────────────────── */
const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {

      gsap.from(".srv-header-title", {
        y: 80, opacity: 0, duration: 1.1, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".srv-header-title", start: "top 92%" },
      });
      gsap.from(".srv-panel", {
        y: 60, opacity: 0, stagger: 0.18, duration: 1, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".srv-panels", start: "top 95%" },
      });
      gsap.from(".srv-palette-dot", {
        scale: 0, opacity: 0, stagger: 0.04, duration: 0.45, ease: "back.out(1.4)",
        immediateRender: false,
        scrollTrigger: { trigger: ".srv-palette-dots", start: "top 95%" },
      });
      gsap.from(".srv-swatch", {
        y: 40, opacity: 0, stagger: 0.11, duration: 0.75, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".srv-swatches", start: "top 95%" },
      });
      gsap.to(".srv-swatch", {
        y: -22, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "+=500", scrub: 1.2 },
      });
      gsap.from(".srv-row", {
        scale: 0.85, opacity: 0, stagger: 0.06, duration: 0.5, ease: "back.out(1.3)",
        immediateRender: false,
        scrollTrigger: { trigger: ".srv-design-list", start: "top 95%" },
      });
      gsap.from(".srv-mrow", {
        scale: 0.85, opacity: 0, stagger: 0.06, duration: 0.5, ease: "back.out(1.3)",
        immediateRender: false,
        scrollTrigger: { trigger: ".srv-mktg-list", start: "top 95%" },
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#FAFAFA] px-6 md:px-14 lg:px-20 py-28 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <span className="text-xs font-mono text-black/30 tracking-[0.2em] uppercase mb-5 block">
              Our Capabilities
            </span>
            <h2 className="srv-header-title text-5xl md:text-7xl lg:text-8xl font-medium text-black leading-[0.88] tracking-tight">
              12 services.
              <br />
              <span className="text-black/30">2 disciplines.</span>
            </h2>
          </div>
          <p className="text-black/45 text-sm md:text-base max-w-xs leading-relaxed font-light md:text-right">
            We operate at the intersection of visual craft and scalable distribution. Pick one lane — or let us run both.
          </p>
        </div>

        {/* ══ Panels ══════════════════════════════════════════ */}
        <div className="srv-panels grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ── Design Card ─────────────────────────────────── */}
          <Link href="/design"
            className="srv-panel group relative bg-white rounded-3xl border border-black/[0.07] overflow-hidden flex flex-col transition-all duration-300 hover:border-black/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
          >
            {/* Top section */}
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-[10px] font-mono text-black/30 tracking-[0.18em] uppercase block mb-3">
                    Discipline 01
                  </span>
                  <h3 className="srv-design-title text-5xl md:text-6xl font-medium text-black tracking-tight">
                    Design
                  </h3>
                </div>
                {/* Arrow */}
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-black group-hover:border-black transition-all duration-300">
                  <svg className="w-4 h-4 text-black/40 group-hover:text-white transition-colors duration-300 group-hover:translate-x-px group-hover:-translate-y-px" fill="none" viewBox="0 0 16 16">
                    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Palette dots */}
              <div className="srv-palette-dots flex flex-wrap gap-1.5 mb-6">
                {PALETTE_DOTS.map((c, i) => (
                  <div key={i} className="srv-palette-dot w-5 h-5 rounded-md flex-shrink-0"
                    style={{ background: c, boxShadow: `0 1px 6px ${c}50` }} />
                ))}
              </div>

              {/* Color swatches */}
              <div className="srv-swatches space-y-2 mb-0">
                {COLOR_SWATCHES.map(s => (
                  <div key={s.name} className="srv-swatch flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: s.hex, border: s.light ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
                    <span className={`font-medium text-sm ${s.light ? "text-black" : "text-white"}`}>{s.name}</span>
                    <span className={`font-mono text-xs ${s.light ? "text-black/50" : "text-white/60"}`}>{s.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service pills */}
            <div className="srv-design-list border-t border-black/[0.06] px-8 md:px-10 pb-8 md:pb-10 pt-6 mt-auto">
              <div className="flex flex-wrap gap-2">
                {DESIGN_SERVICES.map(s => (
                  <span key={s.no} className="srv-row text-sm font-medium text-black/60 bg-black/[0.06] px-4 py-2.5 rounded-full group-hover:text-black/75 group-hover:bg-black/[0.08] transition-all duration-200">
                    {s.name}
                  </span>
                ))}
                <span className="text-sm font-medium text-black/30 bg-black/[0.03] px-4 py-2.5 rounded-full">+ More</span>
              </div>
            </div>

            {/* Bottom CTA strip */}
            <div className="bg-black/[0.02] border-t border-black/[0.05] px-8 md:px-10 py-4 flex items-center justify-between">
              <span className="text-xs font-mono text-black/35 tracking-wide">6 services</span>
              <span className="text-xs font-medium text-black/40 group-hover:text-black transition-colors duration-200">
                Explore Design →
              </span>
            </div>
          </Link>

          {/* ── Marketing Card ───────────────────────────────── */}
          <Link href="/marketing"
            className="srv-panel group relative bg-[#0c0d0e] rounded-3xl border border-white/[0.05] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#00ff81]/25 hover:shadow-[0_8px_48px_rgba(0,255,129,0.07)]"
          >
            {/* constellation bg */}
            <div className="absolute inset-0 opacity-60 pointer-events-none">
              <ConstellationSVG />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d0e]/85 via-[#0c0d0e]/30 to-[#0c0d0e]/95 pointer-events-none" />

            {/* Green glow */}
            <motion.div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[90px] opacity-[0.18] pointer-events-none"
              style={{ background: "#00ff81" }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.24, 0.12] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Top section */}
            <div className="relative z-10 p-8 md:p-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-[10px] font-mono text-white/25 tracking-[0.18em] uppercase block mb-3">
                    Discipline 02
                  </span>
                  <h3 className="srv-mktg-title text-5xl md:text-6xl font-medium text-white tracking-tight">
                    Marketing
                  </h3>
                </div>
                {/* Arrow */}
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#00ff81] group-hover:border-[#00ff81] transition-all duration-300">
                  <svg className="w-4 h-4 text-white/35 group-hover:text-black transition-colors duration-300" fill="none" viewBox="0 0 16 16">
                    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

            </div>

            {/* Service pills */}
            <div className="srv-mktg-list relative z-10 border-t border-white/[0.06] px-8 md:px-10 pb-8 md:pb-10 pt-6 mt-auto">
              <div className="flex flex-wrap gap-2">
                {MARKETING_SERVICES.map(s => (
                  <span key={s.no} className="srv-mrow text-sm font-medium text-white/55 bg-white/[0.07] px-4 py-2.5 rounded-full group-hover:text-white/80 group-hover:bg-white/[0.10] transition-all duration-200">
                    {s.name}
                  </span>
                ))}
                <span className="text-sm font-medium text-white/25 bg-white/[0.04] px-4 py-2.5 rounded-full">+ More</span>
              </div>
            </div>

            {/* Bottom CTA strip */}
            <div className="relative z-10 bg-white/[0.02] border-t border-white/[0.05] px-8 md:px-10 py-4 flex items-center justify-between">
              <span className="text-xs font-mono text-white/20 tracking-wide">6 services</span>
              <span className="text-xs font-medium text-white/30 group-hover:text-[#00ff81] transition-colors duration-200">
                Explore Marketing →
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Services;
