'use client'
import React from "react";
import { motion } from "framer-motion";

const clients = [
  {
    no: "01",
    name: "Gallina Innovations",
    type: "Architecture",
    initials: "GI",
    logo: "/logos/gallina-innovations.png",
    detail: "Thirty years in business.",
    problem:
      "Three decades of legacy work behind a digital presence that did not carry the same weight. The quality was there. The online version of it was not.",
  },
  {
    no: "02",
    name: "Magnate Yachts",
    type: "Yacht Management",
    initials: "MY",
    logo: "/logos/magnate-yachts.png",
    detail: "80% of Sri Lanka yacht arrivals.",
    problem:
      "A category-leading position in the market with a website that handed the advantage back to every competitor. Built to look good. Not built to convert.",
  },
  {
    no: "03",
    name: "Flour Dude",
    type: "Café & Bakery",
    initials: "FD",
    logo: "/logos/flour-dude.png",
    detail: "5-star rated, Galle.",
    problem:
      "The product had a five-star reputation. The brand voice online read like every other coffee shop. Nothing in the marketing said why it deserved to be the first choice.",
  },
];

export default function Clients() {
  return (
    <section className="bg-[#FAFAFA] py-24 w-full">
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 w-full">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 pb-8 border-b border-black/[0.07]">
          <motion.h2
            className="text-2xl md:text-3xl font-medium text-black leading-snug max-w-md"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Leading businesses that trusted us
            <br />
            with the same problem.
          </motion.h2>
          <motion.span
            className="hidden md:block text-[11px] font-mono text-black/25 tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            3 Case Studies
          </motion.span>
        </div>

        {/* Client detail rows */}
        <div className="mb-20">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              className="group grid grid-cols-[28px_1fr] md:grid-cols-[28px_1fr_1fr] gap-6 md:gap-12 py-7 border-b border-black/[0.07] hover:bg-[#00ff81]/[0.03] transition-colors duration-300 -mx-3 px-3 rounded-lg border-l-2 border-l-transparent hover:border-l-[#00ff81]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: "easeOut" }}
            >
              <span className="text-[11px] font-mono text-black/25 group-hover:text-[#00b85a] pt-0.5 select-none tabular-nums transition-colors duration-300">
                {client.no}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h3 className="text-base font-semibold text-black">{client.name}</h3>
                  <span className="text-[10px] font-mono text-black/40 bg-black/[0.06] px-2.5 py-0.5 rounded-full tracking-wide">
                    {client.type}
                  </span>
                </div>
                <p className="text-sm text-black/35">{client.detail}</p>
              </div>
              <p className="hidden md:block text-sm text-black/50 leading-relaxed group-hover:text-black/70 transition-colors duration-300 pt-0.5">
                {client.problem}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── LOGO STRIP (Moved after the "trusted us" section & detail rows, exact replica of the uploaded layout) ── */}
        <div className="border-t border-b border-black/[0.08] -mx-6 md:-mx-16 lg:-mx-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-black/[0.08]">
            {/* Logo 1: GBM */}
            <div className="flex items-center justify-center py-7 px-4 hover:bg-black/[0.01] transition-colors duration-200">
              <span className="text-[20px] font-bold tracking-[0.06em] text-black/75" style={{ fontFamily: "Cinzel, Didot, Garamond, serif", textShadow: "0.5px 0px 0px currentColor" }}>
                GBM
              </span>
            </div>

            {/* Logo 2: Sears */}
            <div className="flex items-center justify-center py-7 px-4 hover:bg-black/[0.01] transition-colors duration-200 border-t sm:border-t-0 border-black/[0.08]">
              <div className="flex items-center gap-1.5 text-black/70">
                <span className="text-[21px] font-normal tracking-[-0.04em] lowercase" style={{ fontFamily: "system-ui, sans-serif" }}>sears</span>
                <svg className="w-[18px] h-[18px] fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                  <path d="M3 10l9-7 9 7M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9l-7-5.5L5 9z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Logo 3: Ultimate Finance */}
            <div className="flex items-center justify-center py-7 px-4 hover:bg-black/[0.01] transition-colors duration-200 border-t sm:border-t-0 border-black/[0.08]">
              <div className="flex items-center gap-2.5 text-black/70">
                <div className="relative w-5 h-7">
                  {/* Custom U-F continuous stroke curve */}
                  <svg className="absolute inset-0 w-full h-full fill-none stroke-current stroke-[2.4]" viewBox="0 0 24 28">
                    <path d="M4 6c0 3.5 3 5 8 5s8-1.5 8-5M12 11V23M8 16h8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col text-left leading-[1.0] -space-y-0.5">
                  <span className="text-[8px] font-bold tracking-[0.16em] uppercase">ultimate</span>
                  <span className="text-[8px] font-bold tracking-[0.16em] uppercase text-black/45">finance</span>
                </div>
              </div>
            </div>

            {/* Logo 4: Sunbridge */}
            <div className="flex items-center justify-center py-7 px-4 hover:bg-black/[0.01] transition-colors duration-200 border-t lg:border-t-0 border-black/[0.08]">
              <div className="flex items-center gap-2.5 text-black/70">
                <div className="w-[22px] h-[22px] rounded-full border-[1.8px] border-current flex flex-col items-center justify-center overflow-hidden px-0.5 relative">
                  {/* Sunrays and water contours inside circle */}
                  <svg className="w-full h-full fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                    <path d="M12 4v4M8 6l2 2M16 6l-2 2" strokeLinecap="round" />
                    <path d="M4 14c4-1.5 6-1.5 10 0s4 1.5 6 0" strokeLinecap="round" />
                    <path d="M4 17.5c4-1.5 6-1.5 10 0" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold tracking-[0.26em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>sunbridge</span>
              </div>
            </div>

            {/* Logo 5: Fitness Playground */}
            <div className="flex items-center justify-center py-7 px-4 hover:bg-black/[0.01] transition-colors duration-200 border-t lg:border-t-0 border-black/[0.08]">
              <div className="flex items-center gap-2 text-black/70">
                <svg className="w-6 h-6 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                  <path d="M4 5h8a4 4 0 010 8H4M4 12V20M4 12h6" strokeLinecap="round"/>
                  <path d="M15 5h4M17 5v15" strokeLinecap="round"/>
                </svg>
                <div className="flex flex-col text-left leading-[1.0] -space-y-0.5">
                  <span className="text-[8px] font-bold tracking-[0.14em] uppercase">fitness</span>
                  <span className="text-[8px] font-bold tracking-[0.14em] uppercase text-black/45">playground</span>
                </div>
              </div>
            </div>

            {/* Logo 6: Shorelight */}
            <div className="flex items-center justify-center py-7 px-4 hover:bg-black/[0.01] transition-colors duration-200 border-t lg:border-t-0 border-black/[0.08]">
              <span className="text-[13.5px] font-black tracking-[0.18em] uppercase text-black/80" style={{ fontFamily: "system-ui, sans-serif" }}>
                shorelight
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
