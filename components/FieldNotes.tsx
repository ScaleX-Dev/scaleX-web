'use client'
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const tagColors: Record<string, string> = {
  AUDIT: "bg-orange-100 text-orange-700",
  VIDEO: "bg-blue-100 text-blue-700",
  NOTE: "bg-gray-100 text-gray-600",
  BRAND: "bg-primary-green/20 text-green-800",
};

const notes = [
  {
    tag: "AUDIT",
    title: "Kuki Beach: where the booking was leaking",
    slug: "/blogs",
  },
  {
    tag: "VIDEO",
    title: "Harding Hotels audit walkthrough",
    slug: "/blogs",
  },
  {
    tag: "NOTE",
    title: "Instagram-to-website disconnect",
    slug: "/blogs",
  },
  {
    tag: "BRAND",
    title: "Flour Dude voice rebuild",
    slug: "/blogs",
  },
];

const FieldNotes = () => {
  return (
    <section className="bg-[#FAFAFA] px-6 md:px-16 lg:px-24 py-24 max-w-screen-xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
        <div>
          <motion.h2
            className="text-3xl md:text-4xl font-medium text-black leading-snug"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Recent work, in motion.
          </motion.h2>
          <motion.p
            className="text-sm text-black/45 mt-2 max-w-sm leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            A live feed from the field. Audit breakdowns, video walkthroughs, brand builds, campaign results.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/blogs"
            className="text-sm text-black font-medium hover:opacity-60 transition-opacity"
          >
            See all field notes →
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {notes.map((note, i) => (
          <motion.div
            key={note.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          >
            <Link href={note.slug} className="group block">
              {/* Thumbnail placeholder */}
              <div className="aspect-video bg-black/5 rounded-2xl mb-4 overflow-hidden group-hover:bg-black/10 transition-colors" />
              <span
                className={`inline-block text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-full mb-2 ${tagColors[note.tag] ?? "bg-gray-100 text-gray-600"}`}
              >
                {note.tag}
              </span>
              <p className="text-sm font-medium text-black leading-snug group-hover:opacity-60 transition-opacity">
                {note.title}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FieldNotes;
