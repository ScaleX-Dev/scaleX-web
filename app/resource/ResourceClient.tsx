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

export default function ResourceClient() {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const searchParams = useSearchParams();
  const router = useRouter();
  const resourceId = searchParams?.get("id") ?? null;
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", {
      page: "resource",
      title: resource?.title || "Resource — ScaleX",
      resourceId,
    });
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
  }, [resourceId, resource?.title]);

  useEffect(() => {
    if (!resourceId) { setLoading(false); return; }
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
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Navbar />
        <div className="w-8 h-8 rounded-full border-2 border-[#00ff81] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center gap-4">
        <Navbar />
        <p className="text-black/40 text-sm">Resource not found.</p>
        <Link
          href="/resources"
          className="text-[13px] text-[#0c0d0e] border border-black/15 px-5 py-2.5 rounded-full hover:border-black/30 transition-colors"
        >
          ← Back to Resources
        </Link>
      </div>
    );
  }

  const publishedDate = resource.createdAt
    ? format(new Date(resource.createdAt), "MMM d, yyyy")
    : null;

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <Metadata
        title={`${resource.title} — ScaleX`}
        description={resource.shortTitle || "Read this resource from ScaleX."}
      />
      <Navbar />

      {/* Cover */}
      {resource.coverImageUrl && (
        <div className="w-full h-[300px] md:h-[480px] overflow-hidden relative mt-0">
          <Image
            src={resource.coverImageUrl}
            alt={resource.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent" />
        </div>
      )}

      {/* Article header */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-10 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => router.push("/resources")}
              className="text-[11px] font-mono text-black/35 hover:text-[#00ff81] tracking-[0.18em] uppercase transition-colors"
            >
              ← Resources
            </button>
            <span className="w-px h-3 bg-black/15" />
            <span className="text-[11px] font-mono text-[#00ff81] tracking-[0.18em] uppercase">
              {TYPE_LABELS[resource.type] || resource.type}
            </span>
          </div>

          <h1 className="font-medium tracking-[-0.025em] leading-[1.1] text-[2rem] sm:text-[2.6rem] md:text-[3rem] text-[#0c0d0e] mb-5">
            {resource.title}
          </h1>

          {/* Author row */}
          <div className="flex items-center gap-3 pb-8 border-b border-black/[0.07]">
            {resource.authorImage && (
              <Image
                src={resource.authorImage}
                alt={resource.publisher}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-[13px] font-medium text-[#0c0d0e]">
                {resource.publisher}
              </p>
              <p className="text-[12px] text-black/38">
                {resource.designation}
                {publishedDate && ` · ${publishedDate}`}
                {resource.readTime && ` · ${resource.readTime}`}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="max-w-3xl mx-auto px-6 sm:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
      >
        <div
          className="prose prose-gray max-w-none
            prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-[#0c0d0e]
            prose-p:text-[#0c0d0e]/70 prose-p:leading-relaxed
            prose-a:text-[#00b85e] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#0c0d0e] prose-strong:font-semibold
            prose-blockquote:border-l-[#00ff81] prose-blockquote:bg-[#00ff81]/[0.04] prose-blockquote:rounded-r-lg prose-blockquote:py-1
            prose-code:bg-black/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: resource.content }}
        />
      </motion.div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 pb-20">
        <div className="border-t border-black/[0.07] pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-[13px] font-medium text-[#0c0d0e] mb-0.5">
              Ready to apply this to your business?
            </p>
            <p className="text-[12px] text-black/38">
              Let&apos;s talk through what&apos;s holding back your growth.
            </p>
          </div>
          <Link
            href="/appointments"
            className="bg-[#0c0d0e] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#00ff81] hover:text-black transition-all duration-300 shrink-0"
          >
            Book a discovery call
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
