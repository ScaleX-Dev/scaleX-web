'use client'
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

const STATS = [
  { value: "5×", label: "Average ROAS delivered" },
  { value: "30+", label: "Brands scaled globally" },
  { value: "92%", label: "Client retention rate" },
];

const SERVICES = [
  {
    tag: "BRAND & CONTENT",
    headline: "Brand storytelling that makes people choose you.",
    body: "Most businesses sell features. We build the story that makes a customer decide before they've compared a price. Shot, directed, and edited to carry the brand across every channel.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1000&h=800&fit=crop&auto=format&q=80",
    imageAlt: "Brand storytelling and creative direction",
    imageLeft: false,
  },
  {
    tag: "WEB",
    headline: "A website that turns your brand into enquiries.",
    body: "Not a portfolio piece. A conversion system built around how your customer actually decides. Every page earns its place by moving the visitor forward.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=800&fit=crop&auto=format&q=80",
    imageAlt: "Web analytics and conversion",
    imageLeft: true,
  },
  {
    tag: "PAID MEDIA",
    headline: "Paid reach, measured to the enquiry.",
    body: "Ads that speak to the right people with the right message at the right moment. Budgets tracked to outcomes — not impressions, not clicks. Enquiries.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=800&fit=crop&auto=format&q=80",
    imageAlt: "Performance marketing data and analytics",
    imageLeft: false,
  },
  {
    tag: "PERFORMANCE & CRM",
    headline: "A path from first touch to close, with nothing leaking.",
    body: "Most businesses lose the lead after the first contact. We map the entire journey — from ad to booked call — and close the gaps where revenue disappears.",
    image: null,
    imageAlt: "",
    imageLeft: true,
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Discover",
    body: "We audit your current brand, funnel, and audience to find where money is being left on the table.",
  },
  {
    num: "02",
    title: "Position",
    body: "We clarify your market position, craft the story, and build the foundation every channel runs on.",
  },
  {
    num: "03",
    title: "Build",
    body: "Website, creative, campaigns — executed by seniors who've done it hundreds of times.",
  },
  {
    num: "04",
    title: "Scale",
    body: "We track every signal, tighten every channel, and reinvest into what works until growth is predictable.",
  },
];

function ServiceImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
}

function ServicePattern({ tag }: { tag: string }) {
  return (
    <div className="w-full aspect-[4/3] rounded-2xl bg-[#111213] border border-white/[0.07] relative overflow-hidden flex flex-col items-end justify-end p-6">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#00ff81]/[0.06] rounded-full blur-[60px]" />
      <span className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase relative z-10">
        {tag}
      </span>
    </div>
  );
}

export default function MarketingPage() {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", { page: "marketing", title: "Marketing - ScaleX" });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest("button, a");
      if (btn) {
        trackEvent("click", {
          element: btn.tagName.toLowerCase(),
          text: btn.textContent?.trim() || "",
          href: btn.getAttribute("href"),
          page: "marketing",
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
          trackEvent("scroll_depth", { depth: m, page: "marketing" });
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

  return (
    <div className="bg-[#FAFAFA]">
      <Metadata
        title="Marketing — ScaleX"
        description="Brand-led marketing that makes you the obvious choice. From brand storytelling to paid media and CRM — built to turn attention into enquiries."
      />

      <Navbar />

      {/* HERO (light) */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-[#FAFAFA] min-h-[90vh] flex items-center"
      >
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,0.045) 1.2px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 80% 65% at 48% 40%, black 15%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 48% 40%, black 15%, transparent 100%)",
          }}
        />
        <div className="absolute top-[25%] left-[5%] w-[600px] h-[500px] bg-[#00ff81]/[0.08] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[40%] right-[5%] w-[400px] h-[400px] bg-[#00ff81]/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-44 relative z-10 w-full"
          style={{ y: heroY }}
        >
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff81]" />
            <span className="text-[11px] font-mono text-[#00ff81] tracking-[0.28em] uppercase">
              Marketing
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-medium tracking-[-0.028em] leading-[1.0] text-[2.8rem] sm:text-5xl md:text-[3.8rem] lg:text-[5rem] text-[#0c0d0e]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Brand-led marketing
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              className="font-medium tracking-[-0.028em] leading-[1.0] text-[2.8rem] sm:text-5xl md:text-[3.8rem] lg:text-[5rem] text-[#0c0d0e]/[0.22]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              that makes you the obvious choice.
            </motion.h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-20">
            <motion.p
              className="text-black/50 text-sm md:text-base leading-relaxed max-w-sm"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.42, ease: "easeOut" }}
            >
              It starts with a brand worth choosing — then the web, content, ads,
              and automation that turn attention into real enquiries.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: "easeOut" }}
            >
              <Link
                href="/appointments"
                className="bg-[#0c0d0e] text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-[#00ff81] hover:text-black transition-all duration-300"
              >
                Book a discovery call
              </Link>
              <Link
                href="/projects"
                className="text-[#0c0d0e] text-sm font-medium px-7 py-3.5 rounded-full border border-black/15 hover:border-black/35 hover:bg-black/[0.04] transition-all duration-200"
              >
                See our work
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0c0d0e] pointer-events-none" />
      </section>

      {/* STATS STRIP */}
      <section className="bg-[#0c0d0e] py-16 border-b border-white/[0.06]">
        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center text-center px-2 sm:px-6 first:pl-0 last:pr-0"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="text-2xl sm:text-3xl md:text-5xl font-medium text-white tracking-tight mb-1">
                  {stat.value}
                </span>
                <span className="text-[9px] sm:text-[11px] font-mono text-white/30 tracking-[0.06em] sm:tracking-[0.15em] uppercase leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="bg-[#0c0d0e] py-32 relative overflow-hidden">
        <div
          className="absolute right-0 top-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(0,255,129,0.05), transparent 65%)" }}
        />
        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            <div>
              <motion.p
                className="text-[11px] font-mono text-white/25 tracking-[0.22em] uppercase mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                The approach
              </motion.p>
              <motion.h2
                className="font-medium tracking-[-0.025em] leading-[1.08] text-4xl md:text-5xl text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
              >
                Brand first.{" "}
                <span className="text-white/[0.22]">Everything else amplifies it.</span>
              </motion.h2>
              <motion.p
                className="text-white/45 text-sm md:text-base leading-relaxed mb-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.12 }}
              >
                Most agencies start with tactics — a new website, some ads, a
                posting schedule — and wonder why nothing compounds. We start
                with the brand: the story, the positioning, the identity that
                makes a customer choose you before they&apos;ve compared a price.
              </motion.p>
              <motion.p
                className="text-white/45 text-sm md:text-base leading-relaxed"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                Then every channel — web, content, ads, CRM — amplifies that
                brand instead of competing with it. That&apos;s how attention becomes
                enquiries, and enquiries become predictable revenue.
              </motion.p>
            </div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              {[
                { step: "01", label: "Awareness" },
                { step: "02", label: "Trust" },
                { step: "03", label: "Enquiry" },
                { step: "04", label: "Conversion" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`bg-white/[0.03] border rounded-2xl p-6 flex flex-col gap-3 ${
                    i === 3 ? "border-[#00ff81]/20 bg-[#00ff81]/[0.03]" : "border-white/[0.06]"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${i === 3 ? "border-[#00ff81]/40 bg-[#00ff81]/10" : "border-white/10"}`}>
                    <span className={`text-xs font-mono ${i === 3 ? "text-[#00ff81]" : "text-white/30"}`}>
                      {item.step}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${i === 3 ? "text-white" : "text-white/50"}`}>
                    {item.label}
                  </span>
                  {i < 3 && (
                    <div className="flex items-center gap-1.5 mt-auto">
                      <div className="h-px flex-1 bg-white/[0.08]" />
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/20 flex-shrink-0">
                        <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#111416]">
        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pt-16 pb-4">
          <motion.p
            className="text-[11px] font-mono text-white/20 tracking-[0.22em] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What we do
          </motion.p>
        </div>

        {SERVICES.map((svc, i) => (
          <motion.div
            key={svc.tag}
            className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 border-t border-white/[0.06]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center py-20 ${i === SERVICES.length - 1 ? "pb-28" : ""}`}>
              <div className={svc.imageLeft ? "md:order-2" : ""}>
                <span className="text-[10px] font-mono text-[#00ff81]/50 tracking-[0.22em] uppercase mb-5 block">
                  {svc.tag}
                </span>
                <h3 className="font-medium tracking-[-0.02em] leading-[1.15] text-2xl md:text-3xl text-white mb-5">
                  {svc.headline}
                </h3>
                <p className="text-white/40 text-sm md:text-base leading-relaxed mb-8">
                  {svc.body}
                </p>
                <Link
                  href="/appointments"
                  className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#00ff81] transition-colors duration-200 group"
                >
                  <span>Talk to us about this</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
              <div className={svc.imageLeft ? "md:order-1" : ""}>
                {svc.image ? (
                  <ServiceImage src={svc.image} alt={svc.imageAlt} />
                ) : (
                  <ServicePattern tag={svc.tag} />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* PROCESS (light) */}
      <section className="bg-[#FAFAFA] py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,0.03) 1.2px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
          <motion.p
            className="text-[11px] font-mono text-black/30 tracking-[0.22em] uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How it works
          </motion.p>
          <motion.h2
            className="font-medium tracking-[-0.025em] text-3xl md:text-4xl text-[#0c0d0e] mb-20 max-w-sm"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            From discovery to{" "}
            <span className="text-black/25">predictable growth.</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: "easeOut" }}
                className="flex flex-col"
              >
                <span className="text-4xl font-mono text-black/10 mb-5 leading-none">
                  {step.num}
                </span>
                <h3 className="text-lg font-medium text-[#0c0d0e] mb-3">{step.title}</h3>
                <p className="text-black/45 text-sm leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM STRIP (dark) */}
      <section className="bg-[#0c0d0e] py-28 border-t border-white/[0.05] relative overflow-hidden">
        <div
          className="absolute left-0 bottom-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom left, rgba(0,255,129,0.05), transparent 65%)" }}
        />
        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <p className="text-[11px] font-mono text-white/25 tracking-[0.22em] uppercase mb-6">
                Who&apos;s doing the work
              </p>
              <h2 className="font-medium tracking-[-0.025em] leading-[1.1] text-3xl md:text-4xl text-white mb-6">
                A small, senior team.{" "}
                <span className="text-white/[0.22]">Close to the work.</span>
              </h2>
              <p className="text-white/45 text-sm md:text-base leading-relaxed mb-5">
                Where most agencies scale by adding headcount, we scale by
                staying senior. You work with the people who actually do the
                work — no account managers, no relay races, no junior hands on
                senior briefs.
              </p>
              <p className="text-white/30 text-sm leading-relaxed">
                We take a small number of clients at a time, because senior work
                done properly does not stretch to hundreds.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {[
                { label: "Senior-only execution", sub: "No juniors on client briefs" },
                { label: "Small client roster", sub: "Full attention on your business" },
                { label: "No relay races", sub: "One team, end-to-end ownership" },
                { label: "Honest reporting", sub: "We tell you what isn't working" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl"
                >
                  <div className="w-2 h-2 rounded-full bg-[#00ff81] flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-white/35 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0c0d0e] py-32 border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00ff81]/[0.06] rounded-full blur-[140px]" />
        </div>
        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
          <div className="max-w-3xl">
            <motion.p
              className="text-[11px] font-mono text-[#00ff81]/60 tracking-[0.25em] uppercase mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get started
            </motion.p>
            <motion.h2
              className="font-medium tracking-[-0.025em] leading-[1.08] text-4xl md:text-5xl lg:text-6xl text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              Ready to close{" "}
              <span className="text-[#00ff81]">the gap?</span>
            </motion.h2>
            <motion.p
              className="text-white/40 text-sm md:text-base leading-relaxed mb-10 max-w-md"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              Twenty minutes. Tell us where the business is and what&apos;s not
              working, and we&apos;ll tell you honestly whether we&apos;re the right team
              to fix it. No pitch, no obligation.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/appointments"
                className="bg-white text-black text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#00ff81] transition-all duration-300"
              >
                Book a discovery call
              </Link>
              <Link
                href="/blogs"
                className="text-white text-sm font-medium px-8 py-3.5 rounded-full border border-white/15 hover:border-white/35 hover:bg-white/[0.04] transition-all duration-200"
              >
                Read our thinking
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
