'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";

type FooterLink = { text: string; href: string; external?: boolean };

const GROUPS = [
  {
    category: "Capabilities",
    links: [
      { text: "Marketing", href: "/marketing" },
      { text: "Branding & Design", href: "/branding-design" },
      { text: "Free Funnel Audit", href: "/free-funnel-audit" },
    ],
  },
  {
    category: "Company",
    links: [
      { text: "About us", href: "/about" },
      { text: "Case Studies", href: "/projects" },
      { text: "Book Call", href: "/appointments" },
    ],
  },
  {
    category: "Resources",
    links: [
      { text: "Field Notes", href: "/blogs" },
      { text: "Contact us", href: "/contact" },
    ],
  },
  {
    category: "Legal",
    links: [
      { text: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0c0d0e] text-white relative overflow-hidden">
      {/* Decorative green base glow */}
      <div
        className="absolute bottom-0 left-0 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(0,255,129,0.06), transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pt-16 pb-8">
        
        {/* Top brand line */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12">
          <div>
            <Image
              src="/logo.png"
              alt="ScaleX"
              width={88}
              height={25}
              className="invert mb-3 opacity-90"
            />
            <p className="text-white/30 text-xs font-mono tracking-wide">
              Marketing, Branding & Design · Colombo & Galle, Sri Lanka.
            </p>
          </div>
          <div className="text-right">
            <a
              href="mailto:hello@scalex.lk"
              className="text-sm font-mono text-[#00ff81]/80 hover:text-[#00ff81] transition-colors duration-200"
            >
              hello@scalex.lk
            </a>
          </div>
        </div>

        {/* Surge styled row-based directory list */}
        <div className="border-t border-white/[0.06] mb-12">
          {GROUPS.map((group) => (
            <div
              key={group.category}
              className="py-6 md:py-8 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* Left side: Category Name */}
              <h3 className="text-base text-white/90 font-medium">
                {group.category}
              </h3>

              {/* Right side: Row of links */}
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {group.links.map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar with copyright and social links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 text-xs text-white/20 font-mono tracking-wide pt-2">
          <p>© Copyright 2026 ScaleX. All Rights Reserved.</p>
          
          {/* Socials row matching icons layout style */}
          <div className="flex items-center gap-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h2.72l.4-3H12V6.5c0-.82.4-1.5 1.5-1.5H15V2h-2.5C10.5 2 9 3.5 9 6v2z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-4 2.239-4 5v14c0 2.761 1.239 5 4 5h14c2.762 0 4-2.239 4-5v-14c0-2.761-1.238-5-4-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6 2.762-6 6s2.597 6 6 6 6-2.762 6-6-2.597-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
