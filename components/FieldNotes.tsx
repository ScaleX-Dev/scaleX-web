'use client'
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const TAG_STYLES: Record<string, string> = {
  AUDIT:  "bg-black/[0.15] text-black/70 border border-black/[0.15]",
  VIDEO:  "bg-white/[0.10] text-white/60 border border-white/[0.10]",
  NOTE:   "bg-white/[0.07] text-white/45 border border-white/[0.08]",
  BRAND:  "bg-[#00ff81]/20 text-[#00ff81] border border-[#00ff81]/30",
};

const TAG_BG: Record<string, string> = {
  AUDIT:  "bg-[#00ff81]",
  VIDEO:  "bg-white/[0.04]",
  NOTE:   "bg-white/[0.03]",
  BRAND:  "bg-white/[0.04]",
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
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-[11px] font-mono text-white/30 tracking-[0.22em] uppercase mb-5 block">
              Field Notes
            </span>
            <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight tracking-tight">
              Recent work, in motion.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/blogs"
              className="text-sm font-medium text-white/40 hover:text-[#00b85a] transition-colors duration-200"
            >
              See all →
            </Link>
          </motion.div>
        </div>

        {/* Grid: 1 featured (col-span-2) + 3 regular */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Featured card */}
          <motion.div
            className="lg:col-span-2 lg:row-span-1"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Link href={notes[0].slug} className="group block h-full">
              <div
                className={[
                  "h-full min-h-[240px] rounded-2xl p-8 flex flex-col justify-between",
                  "border border-transparent hover:border-[#00ff81]/40 transition-colors duration-300",
                  TAG_BG[notes[0].tag],
                ].join(" ")}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={[
                      "text-[10px] font-mono tracking-[0.18em] uppercase px-2.5 py-1 rounded-full",
                      TAG_STYLES[notes[0].tag],
                    ].join(" ")}
                  >
                    {notes[0].tag}
                  </span>
                  <span className="text-lg text-black/40 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-200">
                    ↗
                  </span>
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-semibold text-black leading-snug group-hover:opacity-80 transition-opacity duration-200 max-w-xs">
                    {notes[0].title}
                  </p>
                  <p className="text-xs font-mono text-black/50 tracking-wide uppercase mt-3">
                    {notes[0].meta}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Remaining 3 */}
          {notes.slice(1).map((note, i) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.08, ease: "easeOut" }}
            >
              <Link href={note.slug} className="group block h-full">
                <div
                  className={[
                    "h-full min-h-[180px] rounded-2xl p-7 flex flex-col justify-between",
                    "border border-white/[0.07] hover:border-white/20 transition-colors duration-300",
                    TAG_BG[note.tag],
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={[
                        "text-[10px] font-mono tracking-[0.18em] uppercase px-2.5 py-1 rounded-full",
                        TAG_STYLES[note.tag],
                      ].join(" ")}
                    >
                      {note.tag}
                    </span>
                    <span className="text-base text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                      ↗
                    </span>
                  </div>
                  <div>
                    <p className="text-base font-medium text-white leading-snug group-hover:opacity-75 transition-opacity duration-200">
                      {note.title}
                    </p>
                    <p className="text-[10px] font-mono text-white/30 tracking-wide uppercase mt-2">
                      {note.meta}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
