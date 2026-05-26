'use client'
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Metadata from "@/components/Metadata";
import { motion } from "framer-motion";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

const PILLARS = [
  {
    label: "Co-Create",
    title: "Meaningful digital experiences",
    body: "Through agile collaboration, we design websites, content, and campaigns that inspire action and create measurable impact.",
  },
  {
    label: "Scale",
    title: "With precision and performance",
    body: "Every solution is performance-driven and scalable — ensuring brands grow faster, smarter, and sustainably.",
  },
  {
    label: "Agility",
    title: "At our core",
    body: "We thrive on change, offering innovative marketing and digital solutions that evolve with trends and drive continuous growth.",
  },
  {
    label: "Craft",
    title: "Brands for the next era",
    body: "From standout websites to conversion-driven campaigns, we build digital ecosystems that position brands to lead.",
  },
];

const TEAM = [
  {
    name: "Chirath Hewagamage",
    role: "Founder / CEO",
    img: "https://media.licdn.com/dms/image/v2/D4E03AQHr-ip2u_SAxQ/profile-displayphoto-shrink_800_800/B4EZPv9bQ8HkAg-/0/1734897678363?e=1750291200&v=beta&t=2RMdpOlCFujwJtPSY2iDWiPZvADq4qWzvz6lm1RswPY",
  },
  {
    name: "Vishaka Wijekoon",
    role: "Customer Relations",
    img: "https://media.licdn.com/dms/image/v2/D5603AQG3FsxUguvAGA/profile-displayphoto-shrink_800_800/B56ZWunqGHGUAg-/0/1742391388216?e=1750291200&v=beta&t=5uJeZaCAqZU_WmfKklblc-W_hPkFI8H1TPu3vNWg1Ms",
  },
  {
    name: "Rachitha Nanayakkarawasam",
    role: "Senior Marketing Analyst",
    img: "https://media.licdn.com/dms/image/v2/D5603AQH2IWt3CSTyxQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718214160407?e=1750291200&v=beta&t=jeM5mcpK4MKNlgJ5QCE2RktDHMYT_J_YAMCaF6DS6qQ",
  },
  {
    name: "Yasiru Lakintha",
    role: "UI / UX Designer",
    img: "https://media.licdn.com/dms/image/v2/D5603AQFUu7EeY4iZQQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718273426409?e=1750291200&v=beta&t=q7l6pvy_nfk8FNZlUEzqIwf2oxVFooWgMnhEYcMf3fs",
  },
];

const AboutUs = () => {
  const scrollTrackedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", { page: "about", title: "About Us - ScaleX" });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) {
        trackEvent("click", {
          element: button.tagName.toLowerCase(),
          text: button.textContent?.trim() || '',
          href: button.getAttribute('href'),
          page: "about",
        });
      }
    };

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercentage >= milestone && !scrollTrackedRef.current.has(milestone)) {
          scrollTrackedRef.current.add(milestone);
          trackEvent("scroll_depth", { depth: milestone, page: "about" });
        }
      });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <Metadata
        title="About Us — ScaleX"
        description="At ScaleX, our journey began with a group of college freelancers. Since then we've grown into a full-service marketing, branding, and design agency."
      />

      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#FAFAFA]">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,0.035) 1.2px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 72% 58% at 50% 42%, black 15%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 72% 58% at 50% 42%, black 15%, transparent 100%)",
          }}
        />
        {/* Green glow */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-[#00ff81]/[0.09] rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pt-44 pb-24 relative z-10">
          <motion.p
            className="text-[11px] font-mono text-[#00ff81] tracking-[0.25em] uppercase mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Est. 2023 · Galle &amp; Colombo, Sri Lanka
          </motion.p>

          <div className="overflow-hidden mb-5">
            <motion.h1
              className="font-medium tracking-[-0.025em] leading-[1.0] text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[4.25rem] text-[#0c0d0e]"
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.88, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              We love playing with
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h1
              className="font-medium tracking-[-0.025em] leading-[1.0] text-[2.6rem] sm:text-5xl md:text-[3.5rem] lg:text-[4.25rem] text-[#0c0d0e]/25"
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.88, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              data &amp; creativity.
            </motion.h1>
          </div>

          <motion.p
            className="text-black/55 max-w-md text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: "easeOut" }}
          >
            Our journey began with a group of college freelancers. Since then we&apos;ve
            grown our business, expanded our team, and diversified our portfolio —
            always driven by an unwavering passion for results.
          </motion.p>
        </div>
      </section>

      {/* ── DARK PILLARS ── */}
      <section className="bg-[#0c0d0e] w-full py-28 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom right, rgba(0,255,129,0.05), transparent 65%)" }} />

        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24">
          <p className="text-[11px] font-mono text-white/25 tracking-[0.22em] uppercase mb-16">
            How we work
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
                className="border border-white/[0.06] rounded-2xl p-6 bg-white/[0.02]"
              >
                <span className="text-[10px] font-mono text-[#00ff81]/70 tracking-[0.22em] uppercase mb-4 block">
                  {p.label}
                </span>
                <h3 className="text-white font-medium text-lg leading-snug mb-3">
                  {p.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-[#FAFAFA] py-28 w-full">
        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24">
          <p className="text-[11px] font-mono text-black/30 tracking-[0.22em] uppercase mb-4">
            The team
          </p>
          <h2 className="font-medium tracking-[-0.02em] text-3xl md:text-4xl text-[#0c0d0e] mb-16">
            The people behind the work.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex flex-col"
              >
                <div className="aspect-square w-full mb-4 rounded-2xl overflow-hidden bg-black/5">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[#0c0d0e] font-medium text-sm">{member.name}</p>
                <p className="text-black/40 text-xs mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0c0d0e] py-28 w-full">
        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-[11px] font-mono text-white/25 tracking-[0.22em] uppercase mb-6">
              Ready to start?
            </p>
            <h2 className="font-medium tracking-[-0.02em] text-3xl md:text-4xl text-white leading-tight">
              Let&apos;s build something              <span className="text-white/25">worth talking about.</span>
            </h2>
          </div>
          <Link href="/appointments">
            <button className="bg-white text-black text-sm font-medium px-7 py-3.5 rounded-full hover:bg-[#00ff81] transition-all duration-300 shrink-0">
              Book a discovery call
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;

