'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";

const NAV = [
  {
    label: "Capabilities",
    links: [
      { text: "Marketing", href: "/marketing" },
      { text: "Branding & Design", href: "/branding-design" },
      { text: "Free Funnel Audit", href: "/free-funnel-audit" },
    ],
  },
  {
    label: "Company",
    links: [
      { text: "About us", href: "/about" },
      { text: "Case Studies", href: "/projects" },
      { text: "Book a Call", href: "/appointments" },
    ],
  },
  {
    label: "Resources",
    links: [
      { text: "Field Notes", href: "/blogs" },
      { text: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Legal",
    links: [
      { text: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0c0d0e] text-white relative overflow-hidden">

      {/* ── ZONE 1: Brand statement ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pt-20 pb-16 border-b border-white/[0.05]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">

          {/* Left: Identity */}
          <div>
            <Image
              src="/logo.png"
              alt="ScaleX"
              width={88}
              height={25}
              className="invert opacity-90 mb-7"
            />
            <p className="text-white/45 text-sm leading-relaxed max-w-[300px] mb-9">
              Brand-led marketing and design that makes you
              the obvious choice for the clients you actually want.
            </p>
          </div>

          {/* Right: Email CTA */}
          <div className="flex flex-col gap-2 md:items-end">
            <p className="text-[10px] font-mono text-white/25 tracking-[0.22em] uppercase mb-1">
              Start a project
            </p>
            <a
              href="mailto:hello@scalex.lk"
              className="group inline-flex items-center gap-3 text-[1.6rem] sm:text-[2rem] md:text-[2.2rem] font-medium text-white hover:text-[#00ff81] transition-colors duration-300 leading-none"
            >
              hello@scalex.lk
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
            <p className="text-white/20 text-xs font-mono tracking-[0.12em] mt-1">
              Colombo &amp; Galle, Sri Lanka
            </p>
          </div>

        </div>
      </div>

      {/* ── ZONE 2: Navigation ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-14 border-b border-white/[0.05]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {NAV.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] font-mono text-[#00ff81]/50 tracking-[0.22em] uppercase mb-5">
                {group.label}
              </p>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 hover:text-white transition-colors duration-200"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── ZONE 3: Wordmark + bottom bar ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pt-6 pb-8 relative">

        {/* Bottom bar — floated over the wordmark space */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 sm:mt-0 sm:absolute sm:bottom-10 sm:left-6 sm:right-6 md:left-16 md:right-16 lg:left-24 lg:right-24">
          <p className="text-[11px] font-mono text-white/20 tracking-wide">
            © 2026 ScaleX Global. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/scalex-global"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/scalex.global"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 hover:text-white transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6 2.762-6 6s2.597 6 6 6 6-2.762 6-6-2.597-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/scalexglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/25 hover:text-white transition-colors duration-200"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h2.72l.4-3H12V6.5c0-.82.4-1.5 1.5-1.5H15V2h-2.5C10.5 2 9 3.5 9 6v2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
