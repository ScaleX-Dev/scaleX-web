'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const TYPE_LABELS: Record<string, string> = {
  case_study: "Case study",
  video:      "Video",
  article:    "Article",
  guide:      "Guide",
};

const TAG_STYLES: Record<string, string> = {
  case_study: "bg-[#00ff81]/20 text-[#00ff81] border border-[#00ff81]/30",
  video:      "bg-blue-900/40 text-blue-300 border border-blue-700/40",
  article:    "bg-white/[0.07] text-white/50 border border-white/[0.10]",
  guide:      "bg-amber-900/30 text-amber-400 border border-amber-700/30",
};

interface Resource {
  id: string;
  title: string;
  type: string;
  coverImageUrl: string;
}

export default function FieldNotes() {
  const [notes, setNotes] = useState<Resource[]>([]);

  useEffect(() => {
    fetch("/api/resources")
      .then((r) => r.json())
      .then((data: Resource[]) => setNotes(data.slice(0, 4)))
      .catch(() => {/* silently stay empty */});
  }, []);

  return (
    <section className="bg-[#0c0d0e] py-12 md:py-16 w-full">
      <div className="max-w-screen-xl mx-auto w-full px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 md:mb-8 gap-4">
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
              href="/resources"
              className="text-sm font-medium text-white/40 hover:text-[#00ff81] transition-colors duration-200"
            >
              See all field notes →
            </Link>
          </motion.div>
        </div>

        {/* Grid: 2-col mobile → 4-col lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {notes.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <Link href={`/resource?id=${note.id}`} className="group block">
                <div className="rounded-xl overflow-hidden relative aspect-[9/16] bg-white/[0.04]">
                  {/* Thumbnail */}
                  {note.coverImageUrl ? (
                    <img
                      src={note.coverImageUrl}
                      alt={note.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="opacity-20">
                        <rect x="3" y="3" width="22" height="16" rx="2" stroke="white" strokeWidth="1.5" />
                        <circle cx="9" cy="9" r="2" stroke="white" strokeWidth="1.5" />
                        <path d="M3 15l5-4 4 3 4-5 9 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 23h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                  {/* Gradient + overlay text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span
                      className={[
                        "text-[8px] font-mono tracking-[0.16em] uppercase px-1.5 py-0.5 rounded-full mb-2 inline-block",
                        TAG_STYLES[note.type] ?? TAG_STYLES["article"],
                      ].join(" ")}
                    >
                      {TYPE_LABELS[note.type] ?? note.type}
                    </span>
                    <p className="text-[11px] font-medium text-white/90 leading-snug group-hover:text-white transition-colors duration-200 line-clamp-2">
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
            href="/resources"
            className="text-sm font-medium text-white/40 hover:text-[#00ff81] transition-colors duration-200"
          >
            See all field notes →
          </Link>
        </div>
      </div>
    </section>
  );
}
