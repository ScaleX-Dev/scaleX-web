'use client'
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

interface Resource {
  title: string;
  shortTitle: string;
  type: "case_study" | "video" | "article" | "guide";
  content: string;
  coverImageUrl: string;
  publisher: string;
  designation: string;
  authorImage: string;
  createdAt: string | null;
  readTime?: string;
  clientName?: string;
  clientMeta?: string;
}

const TYPE_LABELS: Record<string, string> = {
  case_study: "Case study",
  video: "Video",
  article: "Article",
  guide: "Guide",
};

const TYPE_COLORS: Record<string, string> = {
  case_study: "bg-[#00ff81]/10 text-[#00a854] border-[#00ff81]/20",
  video: "bg-blue-50 text-blue-600 border-blue-100",
  article: "bg-violet-50 text-violet-600 border-violet-100",
  guide: "bg-amber-50 text-amber-600 border-amber-100",
};

const normalizeRichText = (html: string) =>
  html.replace(/&nbsp;/g, " ").replace(/\u00a0/g, " ");

export default function ResourceClient() {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const searchParams = useSearchParams();
  const router = useRouter();
  const resourceId = searchParams?.get("id") ?? null;
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  // Run once on mount — capture UTM and register scroll tracker
  useEffect(() => {
    captureUTM();
    const handleScroll = () => {
      const pct = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      [25, 50, 75, 100].forEach((m) => {
        if (pct >= m && !scrollTrackedRef.current.has(m)) {
          scrollTrackedRef.current.add(m);
          trackEvent("scroll_depth", { depth: m, page: "resource", resourceId });
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [resourceId]);

  // Fire page_view only once the resource title is known
  useEffect(() => {
    if (!resource) return;
    trackEvent("page_view", {
      page: "resource",
      title: resource.title,
      resourceId,
    });
  }, [resource, resourceId]);

  useEffect(() => {
    if (!resourceId) {
      // Use a microtask so the setState is async, not synchronous in the effect body
      Promise.resolve().then(() => setLoading(false));
      return;
    }
    fetch(`/api/resources?id=${resourceId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setResource(data as Resource);
      })
      .catch((err) => console.error("Resource fetch error:", err))
      .finally(() => setLoading(false));
  }, [resourceId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-8 h-8 rounded-full border-2 border-[#00ff81] border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
          <p className="text-black/40 text-sm">Resource not found.</p>
          <Link
            href="/resources"
            className="text-[13px] text-[#0c0d0e] border border-black/15 px-5 py-2.5 rounded-full hover:border-black/30 transition-colors"
          >
            ← Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  const publishedDate = resource.createdAt
    ? format(new Date(resource.createdAt), "MMM d, yyyy")
    : null;

  const badgeClass = TYPE_COLORS[resource.type] || "bg-black/5 text-black/50 border-black/10";
  const normalizedContent = normalizeRichText(resource.content);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <Metadata
        title={`${resource.title} — ScaleX`}
        description={resource.shortTitle || "Read this resource from ScaleX."}
      />
      <Navbar />

      {/* ── Hero cover image ─────────────────────────────────── */}
      {resource.coverImageUrl ? (
        <div className="w-full mt-[68px] h-[280px] sm:h-[420px] md:h-[520px] overflow-hidden relative">
          <Image
            src={resource.coverImageUrl}
            alt={resource.title}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          {/* gradient: transparent top → opaque page bg at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/30 to-transparent" />
        </div>
      ) : (
        /* no image → just push content below navbar */
        <div className="mt-[68px]" />
      )}

      {/* ── Article wrapper ──────────────────────────────────── */}
      <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        {/* breadcrumb + type badge */}
        <motion.div
          className="flex items-center gap-2.5 pt-8 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => router.push("/resources")}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-black/35 hover:text-[#0c0d0e] tracking-[0.16em] uppercase transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Resources
          </button>
          <span className="w-px h-3 bg-black/15" />
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-[0.14em] uppercase border ${badgeClass}`}>
            {TYPE_LABELS[resource.type] || resource.type}
          </span>
        </motion.div>

        {/* title */}
        <motion.h1
          className="font-semibold tracking-[-0.03em] leading-[1.08] text-[2rem] sm:text-[2.75rem] md:text-[3.2rem] text-[#0c0d0e] mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {resource.title}
        </motion.h1>

        {/* short description */}
        {resource.shortTitle && (
          <motion.p
            className="text-[1.05rem] text-black/50 leading-[1.7] mb-8 font-normal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {resource.shortTitle}
          </motion.p>
        )}

        {/* author + meta row */}
        <motion.div
          className="flex items-center gap-4 py-5 border-y border-black/[0.07] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {resource.authorImage ? (
            <Image
              src={resource.authorImage}
              alt={resource.publisher}
              width={42}
              height={42}
              className="w-[42px] h-[42px] rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-[42px] h-[42px] rounded-full bg-[#00ff81]/15 border border-[#00ff81]/20 flex items-center justify-center shrink-0">
              <span className="text-[13px] font-semibold text-[#00a854]">
                {(resource.publisher || "?").slice(0, 1).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[14px] font-medium text-[#0c0d0e] truncate">{resource.publisher}</span>
            <div className="flex items-center gap-2 flex-wrap text-[12px] text-black/40">
              <span>{resource.designation}</span>
              {publishedDate && (
                <>
                  <span className="w-0.5 h-0.5 rounded-full bg-black/25 inline-block" />
                  <span>{publishedDate}</span>
                </>
              )}
              {resource.readTime && (
                <>
                  <span className="w-0.5 h-0.5 rounded-full bg-black/25 inline-block" />
                  <span>{resource.readTime}</span>
                </>
              )}
              {resource.clientName && (
                <>
                  <span className="w-0.5 h-0.5 rounded-full bg-black/25 inline-block" />
                  <span className="font-medium text-black/55">{resource.clientName}</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Article body ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div
            className="resource-content prose prose-gray max-w-none
              prose-headings:font-semibold prose-headings:tracking-[-0.02em] prose-headings:text-[#0c0d0e] prose-headings:mt-10 prose-headings:mb-4
              prose-h2:text-[1.6rem] prose-h3:text-[1.25rem]
              prose-p:text-[#3a3a3a] prose-p:leading-[1.9] prose-p:text-[1.0rem] prose-p:my-5
              prose-li:text-[#3a3a3a] prose-li:leading-[1.85] prose-li:my-1
              prose-ul:my-5 prose-ol:my-5
              prose-a:text-[#00a854] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#0c0d0e] prose-strong:font-semibold
              prose-blockquote:border-l-[3px] prose-blockquote:border-l-[#00ff81] prose-blockquote:bg-[#00ff81]/[0.04] prose-blockquote:rounded-r-xl prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:text-[#2d2d2d] prose-blockquote:not-italic prose-blockquote:my-8
              prose-code:bg-black/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[0.875rem] prose-code:font-mono prose-code:text-[#0c0d0e] prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0c0d0e] prose-pre:rounded-xl prose-pre:p-5
              prose-img:rounded-2xl prose-img:shadow-md prose-img:my-8
              prose-hr:border-black/[0.08] prose-hr:my-10"
            style={{ color: '#3a3a3a' }}
            dangerouslySetInnerHTML={{ __html: normalizedContent }}
          />
        </motion.div>

        {/* ── CTA strip ────────────────────────────────────── */}
        <div className="mt-16 mb-20">
          <div className="rounded-2xl border border-black/[0.07] bg-white p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[15px] font-semibold text-[#0c0d0e] mb-1">
                Ready to apply this to your business?
              </p>
              <p className="text-[13px] text-black/45 leading-snug">
                Let&apos;s talk through what&apos;s holding back your growth.
              </p>
            </div>
            <Link
              href="/appointments"
              className="shrink-0 inline-flex items-center gap-2 bg-[#0c0d0e] text-white text-[13px] font-medium px-6 py-3 rounded-full hover:bg-[#00ff81] hover:text-[#0c0d0e] transition-all duration-300"
            >
              Book a discovery call
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
