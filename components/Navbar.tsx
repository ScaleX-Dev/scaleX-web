'use client'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/branding-design", label: "Branding & Design" },
  { href: "/marketing", label: "Marketing" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]">
      {/* Pill bar */}
      <div className="flex justify-center items-center px-4 pt-4">
        <div className="flex bg-[#FAFAFA]/95 backdrop-blur-md rounded-full py-3 px-5 justify-between items-center w-full max-w-screen-lg border border-black/[0.07] shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
          <Link href="/" className="shrink-0">
            <Image
              src="/ScaleX%20Logo%20No%20BG.png"
              alt="ScaleX"
              width={90}
              height={26}
              style={{ height: "auto" }}
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden 900:flex items-center space-x-7">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-black/60 hover:text-black transition-colors duration-150"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href="/appointments"
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-black/80 transition-colors duration-200 text-sm font-medium hidden sm:inline-flex items-center"
            >
              Book a call
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="900:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/[0.05] transition-colors duration-150 text-black"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`900:hidden mx-4 mt-2 rounded-2xl bg-white/98 backdrop-blur-md border border-black/[0.07] shadow-[0_8px_40px_rgba(0,0,0,0.10)] overflow-hidden transition-all duration-250 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
        style={{ maxWidth: "calc(100% - 2rem)" }}
      >
        <div className="flex flex-col py-2">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className="text-[15px] font-medium text-black/80 hover:text-black hover:bg-black/[0.03] transition-colors duration-150 px-5 py-3.5"
            >
              {l.label}
            </Link>
          ))}
          <div className="px-5 py-3 border-t border-black/[0.06] mt-1">
            <Link
              href="/appointments"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full bg-black text-white text-sm font-medium px-5 py-3 rounded-full hover:bg-black/80 transition-colors duration-200"
            >
              Book a discovery call
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
