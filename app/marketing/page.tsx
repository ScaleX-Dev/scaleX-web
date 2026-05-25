'use client'
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SERVICES = [
  {
    no: "07",
    name: "Growth Strategy",
    desc: "We build data-driven roadmaps that identify your fastest path to revenue — channels, messaging, positioning, and the quarterly milestones to get there.",
    tags: ["Market Research", "ICP Definition", "Channel Strategy", "Quarterly Roadmap"],
  },
  {
    no: "08",
    name: "Performance Marketing",
    desc: "Paid media that pays back. We plan, launch, and optimise high-ROI campaigns across Meta, Google, and LinkedIn — obsessed with cost per acquisition.",
    tags: ["Meta Ads", "Google Ads", "LinkedIn Ads", "Retargeting", "A/B Testing"],
  },
  {
    no: "09",
    name: "SEO",
    desc: "Long-game authority-building. Technical audits, content strategy, and link acquisition that compound over time to dominate the keywords your buyers search.",
    tags: ["Technical SEO", "Content Strategy", "Link Building", "Keyword Research", "Core Web Vitals"],
  },
  {
    no: "10",
    name: "Lead Nurturing",
    desc: "Turn cold traffic into retained clients. We architect email sequences, CRM automations, and nurture flows that keep you top-of-mind until they're ready to buy.",
    tags: ["Email Sequences", "CRM Setup", "Automation", "Lead Scoring", "Segmentation"],
  },
  {
    no: "11",
    name: "Founder Content",
    desc: "Your story is your strongest asset. We ghostwrite, edit, and distribute long-form LinkedIn content that turns your profile into an inbound machine.",
    tags: ["LinkedIn Strategy", "Ghostwriting", "Short-Form Video", "Newsletter", "Thought Leadership"],
  },
  {
    no: "12",
    name: "Data Stack",
    desc: "You can't improve what you can't measure. We configure your analytics infrastructure — GA4, Mixpanel, attribution modelling — so every decision is evidence-based.",
    tags: ["GA4 Setup", "Attribution", "Mixpanel", "Dashboards", "Event Tracking"],
  },
];

const CHANNELS = [
  { label: "Meta Ads",     color: "#1877F2" },
  { label: "Google Ads",   color: "#EA4335" },
  { label: "LinkedIn",     color: "#0A66C2" },
  { label: "Email",        color: "#00ff81" },
  { label: "SEO",          color: "#7C3AED" },
  { label: "Content",      color: "#F97316" },
  { label: "Analytics",    color: "#10B981" },
  { label: "Automation",   color: "#F7B731" },
];

/* Constellation (reused from Services) */
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

function ConstellationHero() {
  const [tick, setTick] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    let id: number;
    const loop = () => { raf.current += 0.006; setTick(raf.current); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);
  const drifted = NODES.map((n, i) => ({
    x: n.x + Math.sin(tick * 0.7 + i * 1.2) * 6,
    y: n.y + Math.cos(tick * 0.5 + i * 0.9) * 5,
  }));
  return (
    <svg className="w-full h-full" viewBox="0 0 400 175" fill="none">
      {CONNECTIONS.map(([a, b], i) => {
        const na = drifted[a], nb = drifted[b];
        const p = (Math.sin(tick * 1.5 + i * 0.6) + 1) / 2;
        const isG = GREEN_NODES.has(a) || GREEN_NODES.has(b);
        return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
          stroke={isG ? "#00ff81" : "rgba(255,255,255,0.22)"}
          strokeWidth={isG ? 1 : 0.6} opacity={0.25 + p * 0.45} />;
      })}
      {drifted.map((n, i) => {
        const g = GREEN_NODES.has(i);
        const p = (Math.sin(tick * 2 + i * 0.8) + 1) / 2;
        return (
          <g key={i}>
            {g && <circle cx={n.x} cy={n.y} r={12 + p * 8} fill="#00ff81" opacity={0.06 + p * 0.1} />}
            <circle cx={n.x} cy={n.y} r={g ? 3 + p * 1.5 : 2.5}
              fill={g ? "#00ff81" : "rgba(255,255,255,0.7)"} />
          </g>
        );
      })}
      <circle r="3" fill="#00ff81" opacity="0.9">
        <animateMotion dur="4s" repeatCount="indefinite" path="M55,35 L145,18 L230,55 L188,82 L162,130 L72,138 L30,88 Z" />
      </circle>
    </svg>
  );
}

export default function MarketingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#080909] min-h-screen">

        {/* Hero */}
        <section className="relative px-6 md:px-14 lg:px-20 pt-36 pb-20 max-w-screen-xl mx-auto overflow-hidden">

          {/* Constellation bg */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <ConstellationHero />
          </div>
          {/* Green glow */}
          <motion.div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.12] pointer-events-none"
            style={{ background: "#00ff81" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
            <div>
              <Link href="/#services"
                className="inline-flex items-center gap-2 text-xs font-mono text-white/30 hover:text-white transition-colors mb-8 group"
              >
                <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
                Back to Services
              </Link>
              <span className="text-[10px] font-mono text-white/25 tracking-[0.2em] uppercase block mb-4">
                Discipline 02
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-medium text-white tracking-tight leading-[0.88]">
                Marketing
                <br />
                <span className="text-white/20">&amp; Growth</span>
              </h1>
            </div>
            <div className="lg:max-w-sm">
              <p className="text-white/45 text-base leading-relaxed mb-8">
                Six scalable channels. One growth engine. We distribute your message to the right audience, at the right time, with a cost-per-acquisition you'll want to show investors.
              </p>
              <Link href="/appointments"
                className="inline-flex items-center gap-3 bg-[#00ff81] text-black text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#00ff81]/90 transition-colors duration-200"
              >
                Book a Growth Consultation ↗
              </Link>
            </div>
          </div>

          {/* Channel tags strip */}
          <div className="relative z-10 flex flex-wrap gap-2 mb-0">
            {CHANNELS.map(c => (
              <span key={c.label}
                className="text-sm font-mono px-4 py-2 rounded-full border"
                style={{ color: c.color, borderColor: `${c.color}30`, background: `${c.color}10` }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </section>

        {/* Services grid */}
        <section className="px-6 md:px-14 lg:px-20 pb-28 max-w-screen-xl mx-auto">
          <div className="border-t border-white/[0.06] pt-12 mb-4 flex items-center justify-between">
            <span className="text-[10px] font-mono text-white/25 tracking-[0.2em] uppercase">6 Services</span>
            <span className="text-[10px] font-mono text-white/15">Marketing Discipline</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(s => (
              <div key={s.no}
                className="bg-white/[0.03] rounded-2xl p-7 border border-white/[0.07] flex flex-col gap-5 hover:border-[#00ff81]/20 hover:bg-white/[0.05] transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono text-white/20 tabular-nums">{s.no}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white tracking-tight mb-2">{s.name}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                  {s.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono text-white/30 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.06]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 bg-[#00ff81] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium text-black tracking-tight mb-3">
                Ready to turn spend
                <br />
                <span className="text-black/40">into pipeline?</span>
              </h2>
              <p className="text-black/50 text-sm max-w-sm leading-relaxed">
                Book a 30-minute growth audit. We'll review your current channels, spot the biggest leaks, and map a 90-day sprint to fix them.
              </p>
            </div>
            <Link href="/appointments"
              className="flex-shrink-0 inline-flex items-center gap-3 bg-black text-white text-sm font-semibold px-7 py-4 rounded-full hover:bg-black/80 transition-colors duration-200 whitespace-nowrap"
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
