'use client'
import React from "react";
import { motion } from "framer-motion";

const clients = [
  {
    no: "01",
    name: "Gallina Innovations",
    type: "Architecture practice.",
    initials: "GI",
    logo: "/logos/gallina-innovations.png",
    detail: "Thirty years in business.",
    problem:
      "Three decades of legacy work behind a digital presence that did not carry the same weight.",
  },
  {
    no: "02",
    name: "Magnate Yachts",
    type: "Sri Lanka's leading yacht management agency.",
    initials: "MY",
    logo: "/logos/magnate-yachts.png",
    detail: "Handles 80% of yacht and superyacht arrivals into the country.",
    problem:
      "A category-leading position in-market, a website that had not been built to reflect it.",
  },
  {
    no: "03",
    name: "Flour Dude",
    type: "Five-star rated café and bakery.",
    initials: "FD",
    logo: "/logos/flour-dude.png",
    detail: "The product had a five-star reputation.",
    problem:
      "The marketing voice could have belonged to any café.",
  },
];

export default function Clients() {
  return (
    <section className="bg-[#FAFAFA] py-12 md:py-16 w-full">
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 md:mb-8 pb-6 border-b border-black/[0.07] gap-3">
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-medium text-black leading-snug max-w-md"
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

        {/* 3-col card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 md:mb-14">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              className="group bg-white border border-black/[0.08] rounded-2xl overflow-hidden hover:border-black/[0.14] hover:shadow-sm transition-all duration-300"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              {/* Logo area */}
              <div className="h-[88px] bg-black/[0.03] border-b border-black/[0.06] flex items-center justify-center">
                <span className="text-[13px] font-mono font-semibold tracking-[0.18em] text-black/30 uppercase select-none">
                  {client.initials}
                </span>
              </div>
              {/* Content */}
              <div className="p-6">
                <h3 className="text-[15px] font-semibold text-black mb-1 leading-snug">
                  {client.name}
                </h3>
                <p className="text-[13px] text-black/45 leading-snug mb-1">{client.type}</p>
                <p className="text-[13px] text-black/35 mb-4">{client.detail}</p>
                <p className="text-[13px] text-black/55 leading-relaxed border-t border-black/[0.06] pt-4">
                  {client.problem}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── LOGO STRIP ── */}
        <div className="border-t border-b border-black/[0.08] -mx-6 md:-mx-16 lg:-mx-24">
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-black/[0.08]">
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
