'use client'
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Campaign Flow (Marketing panel background) ──────── */
// Hub-and-spoke: one central node + 7 channel satellites
const HUB = { x: 200, y: 87 };
const SATELLITES = [
  { x: 58,  y: 28  },
  { x: 190, y: 18  },
  { x: 338, y: 32  },
  { x: 368, y: 100 },
  { x: 310, y: 152 },
  { x: 95,  y: 155 },
  { x: 28,  y: 105 },
];
const OUTER_LINKS = [[0,1],[1,2],[2,3],[5,6],[6,0]];

function CampaignFlow() {
  const [tick, setTick] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    let id: number;
    const loop = () => { raf.current += 0.014; setTick(raf.current); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  // Hub broadcast rings
  const HUB_RINGS = 3;
  // Packet positions along each spoke (hub ↔ satellite)
  const packets = SATELLITES.map((s, si) => {
    const phase = ((tick * 0.55 + si * (1 / SATELLITES.length)) % 1);
    return { x: HUB.x + (s.x - HUB.x) * phase, y: HUB.y + (s.y - HUB.y) * phase, op: Math.sin(phase * Math.PI) * 0.9 };
  });
  // Reverse packets (satellite → hub)
  const rpackets = SATELLITES.map((s, si) => {
    const phase = ((tick * 0.4 + si * (1 / SATELLITES.length) + 0.5) % 1);
    return { x: s.x + (HUB.x - s.x) * phase, y: s.y + (HUB.y - s.y) * phase, op: Math.sin(phase * Math.PI) * 0.55 };
  });

  return (
    <svg className="w-full h-full" viewBox="0 0 400 175" fill="none">
      {/* Hub broadcast rings */}
      {Array.from({ length: HUB_RINGS }, (_, ri) => {
        const phase = ((tick * 0.5 + ri * (1 / HUB_RINGS)) % 1);
        return (
          <circle key={`ring-${ri}`} cx={HUB.x} cy={HUB.y}
            r={phase * 52} stroke="#00ff81" strokeWidth={0.8}
            fill="none" opacity={(1 - phase) * 0.5} />
        );
      })}
      {/* Spoke lines hub → satellite */}
      {SATELLITES.map((s, i) => (
        <line key={`spoke-${i}`} x1={HUB.x} y1={HUB.y} x2={s.x} y2={s.y}
          stroke="#00ff81" strokeWidth={0.5}
          opacity={0.15 + Math.sin(tick * 1.2 + i * 0.9) * 0.08} />
      ))}
      {/* Outer ring links */}
      {OUTER_LINKS.map(([a, b], i) => {
        const sa = SATELLITES[a], sb = SATELLITES[b];
        return (
          <line key={`outer-${i}`} x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
            stroke="rgba(255,255,255,0.15)" strokeWidth={0.4}
            opacity={0.12 + Math.sin(tick * 0.8 + i * 1.3) * 0.07} />
        );
      })}
      {/* Outbound packets */}
      {packets.map((p, i) => (
        <circle key={`pkt-${i}`} cx={p.x} cy={p.y} r={2.2}
          fill="#00ff81" opacity={p.op} />
      ))}
      {/* Return packets */}
      {rpackets.map((p, i) => (
        <circle key={`rpkt-${i}`} cx={p.x} cy={p.y} r={1.4}
          fill="rgba(255,255,255,0.7)" opacity={p.op} />
      ))}
      {/* Satellite nodes */}
      {SATELLITES.map((s, i) => {
        const pulse = (Math.sin(tick * 1.8 + i * 0.7) + 1) / 2;
        return (
          <g key={`sat-${i}`}>
            <circle cx={s.x} cy={s.y} r={6 + pulse * 4} fill="#00ff81" opacity={0.04 + pulse * 0.06} />
            <circle cx={s.x} cy={s.y} r={2.2} fill="rgba(255,255,255,0.65)" />
          </g>
        );
      })}
      {/* Hub node */}
      <circle cx={HUB.x} cy={HUB.y} r={18 + Math.sin(tick * 1.1) * 4}
        fill="#00ff81" opacity={0.07 + Math.sin(tick * 1.1) * 0.04} />
      <circle cx={HUB.x} cy={HUB.y} r={5} fill="#00ff81" opacity={0.9} />
      <circle cx={HUB.x} cy={HUB.y} r={3} fill="#00ff81" />
    </svg>
  );
}

/* ─── Static palette dots (Design panel) ─────────────── */
function AnimatedPalette() {
  return (
    <div className="srv-palette-dots flex flex-wrap gap-1.5 mb-6">
      {PALETTE_DOTS.map((c, i) => (
        <div key={i} className="srv-palette-dot w-5 h-5 rounded-md flex-shrink-0"
          style={{ background: c }}
        />
      ))}
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────── */
const COLOR_SWATCHES = [
  { name: "Signal Green", hex: "#00FF81", light: true },
  { name: "Ink Black", hex: "#0C0D0E", light: false },
  { name: "Soft Canvas", hex: "#FAFAFA", light: true },
  { name: "Mist Gray", hex: "#D9DDD8", light: true },
  { name: "Steel Olive", hex: "#7D8A74", light: true },
];
const PALETTE_DOTS = [
  "#00FF81", "#0C0D0E", "#FAFAFA", "#D9DDD8", "#7D8A74",
  "#C7FFD8", "#8CF3B8", "#2C3A33", "#B7C1B0", "#EEF2EC", "#4E5A4A", "#111715",
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
      gsap.from(".srv-panels", {
        opacity: 0,
        scrollTrigger: { trigger: ".srv-panels", start: "top 99%" },
      });
      gsap.from(".srv-panel", {
        y: 60, opacity: 0, stagger: 0.18, duration: 1, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".srv-panels", start: "top 95%" },
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
    <section ref={sectionRef} className="bg-[#FAFAFA] px-6 md:px-14 lg:px-20 py-20 md:py-28 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <h2 className="srv-header-title text-[3rem] sm:text-6xl md:text-8xl lg:text-[7.5rem] font-semibold tracking-tight leading-[0.88] uppercase">
              Marketing
              <br />
              <span className="text-black/20">&amp; Design</span>
            </h2>
          </div>
          <p className="text-black/45 text-sm md:text-base max-w-xs leading-relaxed font-light md:text-right">
            We operate at the intersection of visual craft and scalable distribution. Pick one lane — or let us run both.
          </p>
        </div>

        {/* ══ Panels ══════════════════════════════════════════ */}
        <div className="srv-panels grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ── Design Card ─────────────────────────────────── */}
          <Link href="/branding-design"
            className="srv-panel group relative bg-white rounded-3xl border border-black/[0.07] overflow-hidden flex flex-col transition-all duration-300 hover:border-black/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
          >
            {/* Top section */}
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-[10px] font-mono text-black/30 tracking-[0.18em] uppercase block mb-3">
                    Discipline 01
                  </span>
                  <h3 className="srv-design-title text-4xl sm:text-5xl md:text-6xl font-medium text-black tracking-tight">
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

              {/* Animated palette dots */}
              <AnimatedPalette />

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
            {/* campaign flow bg */}
            <div className="absolute inset-0 opacity-70 pointer-events-none">
              <CampaignFlow />
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
                  <h3 className="srv-mktg-title text-4xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight">
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
