'use client'
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const THUMBNAIL_BG: Record<string, string> = {
  AUDIT: "bg-[#00ff81]/[0.18]",
  VIDEO: "bg-white/[0.06]",
  NOTE:  "bg-white/[0.04]",
  BRAND: "bg-white/[0.06]",
};

const TAG_STYLES: Record<string, string> = {
  AUDIT: "bg-[#00ff81]/20 text-[#00ff81] border border-[#00ff81]/30",
  VIDEO: "bg-white/[0.10] text-white/60 border border-white/[0.10]",
  NOTE:  "bg-white/[0.07] text-white/45 border border-white/[0.08]",
  BRAND: "bg-white/[0.10] text-white/60 border border-white/[0.10]",
};

const notes = [
  {
    tag: "AUDIT",
    title: "Kuki Beach: where the booking was leaking",
    meta: "Audit breakdown",
    slug: "/blogs",
  },
  {
    tag: "VIDEO",
    title: "Harding Hotels audit walkthrough",
    meta: "Video",
    slug: "/blogs",
  },
  {
    tag: "NOTE",
    title: "Instagram-to-website disconnect",
    meta: "Field note",
    slug: "/blogs",
  },
  {
    tag: "BRAND",
    title: "Flour Dude voice rebuild",
    meta: "Brand build",
    slug: "/blogs",
  },
];

export default function FieldNotes() {
  return (
    <section className="bg-[#0c0d0e] py-28 w-full">
      <div className="max-w-screen-xl mx-auto w-full px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-[11px] font-mono text-white/30 tracking-[0.22em] uppercase mb-4 block">
              Field Notes
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight tracking-tight mb-3">
              Recent work, in motion.
            </h2>
            <p className="text-sm text-white/35 max-w-lg leading-relaxed">
              A live feed from the field. Audit breakdowns, video walkthroughs, brand builds, campaign results.
            </p>
          </motion.div>
          <motion.div
            className="hidden sm:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/blogs"
              className="text-sm font-medium text-white/40 hover:text-[#00ff81] transition-colors duration-200"
            >
              See all field notes →
            </Link>
          </motion.div>
        </div>

        {/* 4-equal-column thumbnail grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {notes.map((note, i) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <Link href={note.slug} className="group block">
                <div className="rounded-2xl border border-white/[0.07] hover:border-white/[0.16] overflow-hidden transition-colors duration-300 bg-white/[0.02]">
                  {/* Thumbnail */}
                  <div
                    className={[
                      "w-full aspect-[9/16] flex items-center justify-center border-b border-white/[0.06]",
                      THUMBNAIL_BG[note.tag],
                    ].join(" ")}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      className="opacity-20"
                    >
                      <rect x="3" y="3" width="22" height="16" rx="2" stroke="white" strokeWidth="1.5" />
                      <circle cx="9" cy="9" r="2" stroke="white" strokeWidth="1.5" />
                      <path d="M3 15l5-4 4 3 4-5 9 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 23h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <span
                      className={[
                        "text-[9px] font-mono tracking-[0.18em] uppercase px-2 py-0.5 rounded-full mb-3 inline-block",
                        TAG_STYLES[note.tag],
                      ].join(" ")}
                    >
                      {note.tag}
                    </span>
                    <p className="text-[13px] font-medium text-white/80 leading-snug group-hover:text-white transition-colors duration-200">
                      {note.title}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile "see all" link */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/blogs"
            className="text-sm font-medium text-white/40 hover:text-[#00ff81] transition-colors duration-200"
          >
            See all field notes →
          </Link>
        </div>
      </div>
    </section>
  );
}
