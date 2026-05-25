'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Subtle green glow */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00ff81, transparent 70%)", transform: "translate(-30%, 30%)" }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-16">
        {/* Logo + tagline */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-16">
          <div className="max-w-xs">
            <Image src="/logo.png" alt="ScaleX" width={90} height={25.5} className="brightness-0 invert mb-4" />
            <p className="text-white/40 text-sm leading-relaxed">
              A marketing, branding, and design agency. Galle, Sri Lanka.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            {/* Services */}
            <div>
              <h4 className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">Services</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-white/70 hover:text-white transition-colors">Marketing</Link></li>
                <li><Link href="/" className="text-white/70 hover:text-white transition-colors">Branding &amp; Design</Link></li>
                <li><Link href="/blogs" className="text-white/70 hover:text-white transition-colors">Field Notes</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/appointments" className="text-white/70 hover:text-white transition-colors">Start</Link></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">Connect</h4>
              <ul className="space-y-3">
                <li><Link href="https://instagram.com" target="_blank" className="text-white/70 hover:text-white transition-colors">Instagram</Link></li>
                <li><Link href="https://linkedin.com" target="_blank" className="text-white/70 hover:text-white transition-colors">LinkedIn</Link></li>
                <li><Link href="https://facebook.com" target="_blank" className="text-white/70 hover:text-white transition-colors">Facebook</Link></li>
                <li><a href="mailto:hello@scalex.lk" className="text-white/70 hover:text-white transition-colors">hello@scalex.lk</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/30 text-xs">
            © ScaleX 2026. A marketing, branding, and design agency. Galle, Sri Lanka.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
