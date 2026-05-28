'use client'
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

export interface Resource {
  id: string;
  title: string;
  shortTitle: string;
  type: "case_study" | "video" | "article" | "guide";
  coverImageUrl: string;
  publisher: string;
  designation: string;
  authorImage: string;
  createdAt: string | null;
  featured: boolean;
  readTime?: string;
  clientName?: string;
  clientMeta?: string;
}

type FilterTab = "all" | "case_study" | "video" | "article" | "guide";

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "case_study", label: "Case studies" },
  { id: "video", label: "Videos" },
  { id: "article", label: "Articles" },
  { id: "guide", label: "Guides" },
];

const TYPE_LABELS: Record<string, string> = {
  case_study: "Case study",
  video: "Video",
  article: "Article",
  guide: "Guide",
};

function ResourceCard({
  resource,
  onClick,
  index,
}: {
  resource: Resource;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      className="group cursor-pointer flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
    >
      {/* Visual */}
      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative bg-[#e8e8e4] mb-4">
        {resource.coverImageUrl ? (
          <Image
            src={resource.coverImageUrl}
            alt={resource.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[#e8e8e4]">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute bottom-3 right-3 text-[9px] font-mono text-black/25 tracking-[0.18em] uppercase">
              {TYPE_LABELS[resource.type] || resource.type} visual
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Meta */}
      <div>
        <span className="text-[10px] font-mono text-black/35 tracking-[0.2em] uppercase mb-1.5 block">
          {TYPE_LABELS[resource.type] || resource.type}
        </span>
        <h3 className="text-[0.9rem] font-medium text-[#0c0d0e] leading-snug tracking-[-0.01em] group-hover:text-black transition-colors mb-0.5">
          {resource.title}
        </h3>
        {(resource.clientMeta || resource.readTime) && (
          <p className="text-[0.75rem] text-black/38 leading-snug">
            {resource.clientMeta || resource.readTime}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function ResourcesClient() {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", { page: "resources", title: "Resources — ScaleX" });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest("button, a");
      if (btn) {
        trackEvent("click", {
          element: btn.tagName.toLowerCase(),
          text: btn.textContent?.trim() || "",
          href: btn.getAttribute("href"),
          page: "resources",
        });
      }
    };
    const handleScroll = () => {
      const pct = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      [25, 50, 75, 100].forEach((m) => {
        if (pct >= m && !scrollTrackedRef.current.has(m)) {
          scrollTrackedRef.current.add(m);
          trackEvent("scroll_depth", { depth: m, page: "resources" });
        }
      });
    };
    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetch("/api/resources")
      .then((r) => r.json())
      .then((data: Resource[]) => {
        setResources(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Resources fetch error:", err);
        setLoading(false);
      });
  }, []);

  const openResource = (r: Resource) => {
    router.push(`/resource?id=${r.id}`);
  };

  const filtered =
    activeTab === "all"
      ? resources
      : resources.filter((r) => r.type === activeTab);

  const caseStudies = resources.filter((r) => r.type === "case_study").slice(0, 3);
  const latest = resources
    .filter((r) => r.type !== "case_study")
    .slice(0, 6);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || subState !== "idle") return;
    setSubState("loading");
    try {
      await fetch("/api/send-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "You're subscribed to ScaleX resources",
          html: `<p>Thanks for subscribing! You'll get new case studies, articles, and guides straight to your inbox.</p>`,
        }),
      });
      trackEvent("newsletter_subscribe", { page: "resources", email });
      setSubState("done");
    } catch {
      setSubState("idle");
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <Metadata
        title="Resources — ScaleX"
        description="Case studies, audit walkthroughs, and writing on marketing and design — from inspection to work. Proof of how we think, and what it produces."
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FAFAFA] pt-36 pb-16">
        {/* dot grid */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,0.045) 1.2px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse 80% 65% at 48% 40%, black 15%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 65% at 48% 40%, black 15%, transparent 100%)",
          }}
        />
        <div className="absolute top-[15%] left-[2%] w-[500px] h-[400px] bg-[#00ff81]/[0.07] rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1 max-w-2xl">
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff81]" />
                <span className="text-[11px] font-mono text-[#00ff81] tracking-[0.28em] uppercase">
                  Resources
                </span>
              </motion.div>

              <div className="overflow-hidden mb-3">
                <motion.h1
                  className="font-medium tracking-[-0.030em] leading-[1.0] text-[3.2rem] sm:text-[4rem] md:text-[5rem] text-[#0c0d0e]"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  Resources.
                </motion.h1>
              </div>

              <motion.p
                className="text-black/45 text-sm md:text-base leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                Case studies, audit walkthroughs, and writing on marketing and
                design — from inspection to work. Proof of how we think, and
                what it produces.
              </motion.p>
            </div>

            {/* Floating badge */}
            <motion.div
              className="hidden md:flex items-center justify-center w-32 h-32 lg:w-40 lg:h-40 rounded-full border border-black/10 bg-white shadow-sm shadow-black/5 mt-4 shrink-0 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-[#00ff81]/[0.06] rounded-full" />
              <span className="text-[#0c0d0e] font-semibold tracking-tight text-base lg:text-lg z-10">
                ScaleX
              </span>
            </motion.div>
          </div>

          {/* Filter tabs */}
          <motion.div
            className="flex flex-wrap items-center gap-2 mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[13px] font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#0c0d0e] text-white"
                    : "bg-white border border-black/12 text-black/55 hover:border-black/25 hover:text-black/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <main className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pb-24">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 rounded-full border-2 border-[#00ff81] border-t-transparent animate-spin" />
          </div>
        ) : activeTab === "all" ? (
          <>
            {/* Case studies section */}
            {caseStudies.length > 0 && (
              <section className="mb-20">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-[0.95rem] font-medium text-[#0c0d0e] tracking-[-0.01em]">
                    Case studies
                  </h2>
                  <button
                    onClick={() => setActiveTab("case_study")}
                    className="text-[12px] font-mono text-black/40 hover:text-[#00ff81] tracking-[0.12em] transition-colors duration-200"
                  >
                    See all +
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <AnimatePresence>
                    {caseStudies.map((r, i) => (
                      <ResourceCard
                        key={r.id}
                        resource={r}
                        onClick={() => openResource(r)}
                        index={i}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            )}

            {/* Latest section */}
            {latest.length > 0 && (
              <section>
                <h2 className="text-[0.95rem] font-medium text-[#0c0d0e] tracking-[-0.01em] mb-8">
                  Latest
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <AnimatePresence>
                    {latest.map((r, i) => (
                      <ResourceCard
                        key={r.id}
                        resource={r}
                        onClick={() => openResource(r)}
                        index={i}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            )}

            {caseStudies.length === 0 && latest.length === 0 && (
              <EmptyState label="resources" />
            )}
          </>
        ) : (
          /* Filtered view */
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence>
                {filtered.map((r, i) => (
                  <ResourceCard
                    key={r.id}
                    resource={r}
                    onClick={() => openResource(r)}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            </div>
            {filtered.length === 0 && (
              <EmptyState label={TABS.find((t) => t.id === activeTab)?.label || "resources"} />
            )}
          </section>
        )}
      </main>

      {/* ── NEWSLETTER CTA ───────────────────────────────────────── */}
      <section className="bg-[#0c0d0e] relative overflow-hidden">
        <div
          className="absolute right-0 top-0 w-[500px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(0,255,129,0.06), transparent 65%)",
          }}
        />
        <div
          className="absolute left-0 bottom-0 w-[300px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, rgba(0,255,129,0.04), transparent 65%)",
          }}
        />
        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-24 relative z-10">
          <div className="max-w-xl">
            <motion.p
              className="text-[11px] font-mono text-white/25 tracking-[0.22em] uppercase mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Stay in the loop
            </motion.p>
            <motion.h2
              className="font-medium tracking-[-0.025em] leading-[1.08] text-3xl md:text-4xl text-white mb-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              Get new resources in your inbox.
            </motion.h2>
            <motion.p
              className="text-white/38 text-sm leading-relaxed mb-8 max-w-sm"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              A monthly digest of new case studies, videos, and writing. No
              sequences, no upsells. Unsubscribe in one click.
            </motion.p>

            <motion.form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              {subState === "done" ? (
                <div className="flex items-center gap-2 text-[#00ff81] text-sm font-medium py-3">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff81]" />
                  You&apos;re subscribed. Welcome aboard.
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="flex-1 bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/28 text-sm px-4 py-3 rounded-full focus:outline-none focus:border-[#00ff81]/60 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={subState === "loading"}
                    className="bg-[#00ff81] text-[#0c0d0e] text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#00e872] transition-colors duration-200 disabled:opacity-60 shrink-0"
                  >
                    {subState === "loading" ? "Subscribing…" : "Subscribe"}
                  </button>
                </>
              )}
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff81] inline-block" />
      </div>
      <p className="text-[#0c0d0e]/40 text-sm">
        No {label} yet. Check back soon.
      </p>
    </div>
  );
}
