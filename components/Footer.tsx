'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";

type NavLink = { text: string; href: string; external?: boolean; mail?: boolean };

const NAV: { label: string; links: NavLink[] }[] = [
  {
    label: "Services",
    links: [
      { text: "Marketing", href: "/marketing" },
      { text: "Branding & Design", href: "/branding-design" },
      { text: "Field Notes", href: "/blogs" },
    ],
  },
  {
    label: "Company",
    links: [
      { text: "About", href: "/about" },
      { text: "Start", href: "/appointments" },
    ],
  },
  {
    label: "Connect",
    links: [
      { text: "Instagram", href: "https://instagram.com", external: true },
      { text: "LinkedIn", href: "https://linkedin.com", external: true },
      { text: "Facebook", href: "https://facebook.com", external: true },
      { text: "hello@scalex.lk", href: "mailto:hello@scalex.lk", mail: true },
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

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Top: wordmark strip */}
        

        {/* Middle: logo + nav */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 py-14 border-b border-white/[0.06]">
          {/* Logo + tagline */}
          <div className="max-w-[200px]">
            <Image
              src="/logo.png"
              alt="ScaleX"
              width={88}
              height={25}
              className="brightness-0 invert mb-5 opacity-80"
            />
            <p className="text-white/30 text-sm leading-relaxed">
              A marketing, branding, and design agency.
              <br />
              Galle, Sri Lanka.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            {NAV.map((col) => (
              <div key={col.label}>
                <h4 className="text-white/20 text-[10px] font-mono tracking-[0.22em] uppercase mb-5">
                  {col.label}
                </h4>
                <ul className="space-y-3.5">
                  {col.links.map((link) =>
                    link.mail ? (
                      <li key={link.text}>
                        <a
                          href={link.href}
                          className="text-[#00ff81]/60 hover:text-[#00ff81] transition-colors duration-200"
                        >
                          {link.text}
                        </a>
                      </li>
                    ) : link.external ? (
                      <li key={link.text}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/50 hover:text-white transition-colors duration-200"
                        >
                          {link.text}
                        </a>
                      </li>
                    ) : (
                      <li key={link.text}>
                        <Link
                          href={link.href}
                          className="text-white/50 hover:text-white transition-colors duration-200"
                        >
                          {link.text}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/20 text-xs font-mono tracking-wide">
            © ScaleX 2026
          </p>
          <p className="text-white/15 text-xs font-mono tracking-wide">
            Marketing, Branding & Design · Galle, Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
