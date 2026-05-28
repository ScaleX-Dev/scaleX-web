'use client'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 pt-5 justify-center items-center z-[100]">
      <div className="flex justify-center items-center">
        <div className="flex shadow-sm bg-[#FAFAFA]/95 backdrop-blur-sm rounded-full py-3 px-6 justify-between items-center w-full max-w-screen-lg border border-black/5">
          <Link href="/">
            <Image src="/ScaleX%20Logo%20No%20BG.png" alt="ScaleX" width={90} height={25.5} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden 900:flex space-x-7">
            <Link
              href="/marketing"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              Marketing
            </Link>
            <Link
              href="/branding-design"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              Branding &amp; Design
            </Link>
            <Link
              href="/resources"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/about"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              About
            </Link>
          </div>

          {/* CTA Button & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/appointments"
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-black/80 transition text-sm md:px-5 hidden sm:inline"
            >
              Book a discovery call
            </Link>
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="900:hidden text-black p-2 transition-transform duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`900:hidden fixed top-24 left-1/2 z-[100] transform -translate-x-1/2 w-[90%] max-w-[320px] rounded-2xl bg-white shadow-lg border border-black/5 transition-all duration-200 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-6 w-full">
          <Link
            href="/marketing"
            onClick={() => setIsOpen(false)}
            className="text-black text-sm font-medium hover:text-gray-500 transition-colors"
          >
            Marketing
          </Link>
          <Link
            href="/branding-design"
            onClick={() => setIsOpen(false)}
            className="text-black text-sm font-medium hover:text-gray-500 transition-colors"
          >
            Branding &amp; Design
          </Link>
          <Link
            href="/resources"
            onClick={() => setIsOpen(false)}
            className="text-black text-sm font-medium hover:text-gray-500 transition-colors"
          >
            Resources
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="text-black text-sm font-medium hover:text-gray-500 transition-colors"
          >
            About
          </Link>
          <Link
            href="/appointments"
            onClick={() => setIsOpen(false)}
            className="bg-black text-white px-5 py-2 rounded-full hover:bg-black/80 transition text-sm"
          >
            Book a discovery call
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
