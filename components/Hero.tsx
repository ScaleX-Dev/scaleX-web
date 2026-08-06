'use client'
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

const LADDER_LINES = [
  "You tell a story about your customers.",
  "They see themselves in it.",
  "They step inside it.",
  "Then they tell it for you.",
];

const TICKER = [
  "Performance Marketing", "Brand Identity", "Web Design",
  "Growth Strategy", "Motion Design", "Content Strategy",
  "Paid Media", "UI/UX Design", "Lead Generation", "SEO",
  "Email Sequences", "Brand Voice",
];

const BEAT = 1150;

export default function Hero() {
  const linesRef = useRef<(HTMLLIElement | null)[]>([]);
  const footRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      badgeRef.current?.classList.add("hb-in");
      subtitleRef.current?.classList.add("hs-in");
      return;
    }

    const lines = linesRef.current;
    const foot = footRef.current;

    badgeRef.current?.classList.add("hb-in");

    lines.forEach((li, i) => {
      setTimeout(() => {
        li?.classList.add("hl-in");
        if (i > 0) lines[i - 1]?.classList.add("hl-dim");
        if (i === lines.length - 1) {
          li?.classList.add("hl-final");
          subtitleRef.current?.classList.add("hs-in");
          setTimeout(() => foot?.classList.add("hf-in"), 500);
        }
      }, 600 + i * BEAT);
    });
  }, []);

  return (
    <div className="hero-outer relative overflow-hidden flex flex-col z-10" style={{ background: "#0a0a0a" }}>
      <style>{`
        .hero-line {
          list-style: none;
          font-weight: 700;
          font-size: clamp(1.9rem, 4.2vw, 3.8rem);
          line-height: 1.18;
          letter-spacing: -0.03em;
          color: #f5f5f7;
          opacity: 0;
          transform: translateY(0.5em);
          filter: blur(10px);
          transition:
            opacity 1s cubic-bezier(0.16,1,0.3,1),
            transform 1s cubic-bezier(0.16,1,0.3,1),
            filter 1s cubic-bezier(0.16,1,0.3,1),
            color 0.9s ease;
        }
        .hero-line.hl-in  { opacity: 1; transform: translateY(0); filter: blur(0); }
        .hero-line.hl-dim { color: rgba(245,245,247,0.32); }
        .hero-line.hl-final { color: #00FF6D; }

        .hero-foot {
          margin-top: 28px;
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s,
            transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s;
        }
        .hero-foot.hf-in { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .hero-line { transition: none; opacity: 1; transform: none; filter: none; color: rgba(245,245,247,0.32); }
          .hero-line:last-child { color: #00FF6D; }
          .hero-foot { transition: none; opacity: 1; transform: none; }
        }
        .hero-inner {
          padding: 132px 40px 40px;
          justify-content: flex-start;
        }
        .brand-row { display: flex; }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          opacity: 0;
          transition: opacity 0.8s ease 0.1s;
        }
        .hero-badge.hb-in { opacity: 1; }
        .hero-subtitle {
          margin-top: 20px;
          max-width: 480px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .hero-subtitle.hs-in { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .hero-badge, .hero-subtitle { transition: none; opacity: 1; transform: none; }
        }
        .hero-outer { min-height: 100svh; }
        @media (max-width: 640px) {
          .hero-outer { min-height: 100svh; }
          .hero-inner { padding: 88px 24px 48px; justify-content: center; }
          .hero-line { font-size: clamp(1.55rem, 7vw, 2.2rem); line-height: 1.2; }
          .hero-badge { margin-bottom: 22px; }
          .hero-subtitle { margin-top: 18px; }
          .hero-foot { margin-top: 32px; }
          .brand-row { display: none; }
        }
        @keyframes ticker-ltr { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .hero-cta {
          display: inline-block;
          font-weight: 500;
          font-size: 1.05rem;
          letter-spacing: 0.01em;
          color: #0a0a0a;
          background: #f5f5f7;
          padding: 16px 34px;
          border-radius: 999px;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .hero-cta:hover { background: #00FF6D; transform: translateY(-2px); }
        .hero-cta:focus-visible { outline: 2px solid #00FF6D; outline-offset: 4px; }
      `}</style>

      <Navbar />

      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 45%, rgba(255,255,255,0.045), transparent 70%)" }}
      />

      {/* Animated ladder + foot */}
      <div className="hero-inner flex-1 flex flex-col w-full max-w-[1200px] mx-auto relative z-10">
        {/* Top group — badge + ladder + subtitle */}
        <div>
          <div ref={badgeRef} className="hero-badge">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#00FF6D" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#00c85a" }} />
            </span>
            <span style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(245,245,247,0.38)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Est. 2023 · Sri Lanka &amp; UAE
            </span>
          </div>

          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {LADDER_LINES.map((line, i) => (
              <li
                key={i}
                ref={(el) => { linesRef.current[i] = el; }}
                className="hero-line"
              >
                {line}
              </li>
            ))}
          </ol>

          <p ref={subtitleRef} className="hero-subtitle" style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(245,245,247,0.45)" }}>
            A World-Class marketing, branding, and design partner for B2B and B2C
            service businesses across Sri Lanka and the UAE.
          </p>
        </div>

        <div ref={footRef} className="hero-foot">
          <div className="brand-row" style={{ alignItems: "center", gap: 18, marginBottom: 20 }}>
            <Image
              src="/ScaleX Logo No BG.webp"
              alt="ScaleX"
              width={110}
              height={34}
              style={{ height: 34, width: "auto", filter: "brightness(0) invert(1)", flexShrink: 0 }}
              priority
            />
            <p style={{ fontWeight: 300, fontSize: "0.95rem", letterSpacing: "0.01em", color: "rgba(245,245,247,0.55)" }}>
              Building brands people remember.
            </p>
          </div>
          <Link href="/appointments" className="hero-cta">
            Let&apos;s tell yours
          </Link>
        </div>
      </div>

      {/* Service ticker */}
      <div
        className="relative z-10 overflow-hidden select-none"
        style={{ borderTop: "1px solid rgba(245,245,247,0.08)", padding: "16px 0" }}
      >
        <div className="flex whitespace-nowrap" style={{ animation: "ticker-ltr 32s linear infinite" }}>
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 px-5 font-mono uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(245,245,247,0.38)" }}
            >
              {item}
              <span style={{ color: "#00FF6D", fontWeight: 700 }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
