'use client'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const TEAM = [
  {
    name: "Chirath Hewagamage",
    role: "Founder & CEO",
    photo: "/Chirath.jpeg",
    objectPosition: "center",
    bio: "The strategist behind the story. Obsessed with the psychology of why customers choose.",
  },
  {
    name: "Vishaka Wijeykoon",
    role: "Social Media & Content Manager",
    photo: "/Vishaka.jpeg",
    objectPosition: "center",
    bio: "Turns brand voice into scroll-stopping content that actually converts.",
  },
  {
    name: "Tinura Abeysekara",
    role: "Growth Partnerships Specialist",
    photo: "/Tinura.jpeg",
    objectPosition: "center 15%",
    bio: "Builds the relationships and systems that keep growth compounding over time.",
  },
];

export default function AboutUs() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <Metadata
        title="About — ScaleX"
        description="We make ambitious businesses the obvious choice. ScaleX is a group of storytellers, developers, and strategists who help brands close the gap between their story and how it shows up online."
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FAFAFA] pt-32 sm:pt-36 pb-0">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1.4px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* Edge vignette so grid fades at the borders */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 50% 40%, transparent 50%, rgba(250,250,250,0.97) 100%)",
          }}
        />
        {/* Ambient green glow */}
        <div className="absolute top-[5%] left-[-5%] w-[600px] h-[500px] bg-[#00ff81]/[0.06] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 relative z-10 pb-14 md:pb-16">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-2.5 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff81] shrink-0" />
            <span className="text-[11px] font-mono text-[#00ff81] tracking-[0.28em] uppercase">
              About ScaleX
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="font-medium tracking-tight leading-[1.02] text-[2.5rem] sm:text-[3.2rem] md:text-[4.2rem] lg:text-[5rem] text-[#0c0d0e] max-w-3xl mb-7"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
          >
            We make ambitious businesses
            <br />
            <span className="text-[#0c0d0e]/35 italic">the obvious choice.</span>
          </motion.h1>

          {/* Body */}
          <motion.p
            className="text-black/45 text-sm md:text-base leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
          >
            ScaleX is a group of storytellers, developers, and strategists who met
            freelancing in university and grouped up around one idea: the best
            businesses lose every day to worse ones that simply tell a better story.
            We&apos;re here to make sure that doesn&apos;t happen to yours.
          </motion.p>
        </div>

        {/* Bottom fade into content */}
        <div className="h-px bg-black/[0.06] max-w-screen-xl mx-auto" />
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <main className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 w-full flex-1">

        {/* ── YOUR STORY ── */}
        <motion.section
          className="py-12 md:py-14 border-b border-black/[0.06]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[11px] font-mono text-black/25 tracking-[0.22em] uppercase mb-5 block">
            What we do
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0c0d0e] leading-[1.1] tracking-tight">
              Your story, told so customers{" "}
              <span className="text-[#0c0d0e]/30">choose you.</span>
            </h2>
            <p className="text-sm md:text-base text-black/45 leading-relaxed">
              Most businesses are better than their marketing makes them look. The
              work is real; the story just isn&apos;t landing. That&apos;s the gap we close. We
              find what makes you the obvious choice, and we make sure your customers
              feel it everywhere they meet you. You&apos;re the hero of this story.
              We&apos;re the ones who make sure it gets told properly.
            </p>
          </div>
        </motion.section>

        {/* ── OUR APPROACH ── */}
        <motion.section
          className="py-12 md:py-14 border-b border-black/[0.06]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[11px] font-mono text-black/25 tracking-[0.22em] uppercase mb-5 block">
            Our approach
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0c0d0e] leading-[1.1] tracking-tight">
              Close enough to know
              <br />
              <span className="text-[#0c0d0e]/30">the real business.</span>
            </h2>
            <p className="text-sm md:text-base text-black/45 leading-relaxed">
              We work as part of your team. Close enough to learn the business the
              way you know it, so the work comes from real understanding instead of
              guesswork. We build on what actually makes a customer choose — the
              psychology of how people decide, and the story that makes them feel
              you&apos;re the one. And we measure everything we do, because you deserve
              to see what the work is returning.
            </p>
          </div>
        </motion.section>

        {/* ── TEAM ── */}
        <section className="py-12 md:py-14 border-b border-black/[0.06]">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-mono text-black/25 tracking-[0.22em] uppercase mb-5 block">
              The team
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#0c0d0e] leading-[1.1] tracking-tight">
              The people you&apos;ll{" "}
              <span className="text-[#0c0d0e]/30">actually work with.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-black/[0.06] rounded-2xl overflow-hidden border border-black/[0.06]">
            {TEAM.map((person, i) => (
              <motion.div
                key={person.name}
                className="bg-[#FAFAFA] p-7 md:p-8 flex flex-col group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              >
                {/* Portrait */}
                <div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-5 relative">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: person.objectPosition }}
                    unoptimized
                  />
                  {/* subtle green corner accent */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 bg-[#00ff81]/[0.18] rounded-tr-xl" />
                </div>

                {/* Name + status */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-medium text-[#0c0d0e]">{person.name}</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff81] shrink-0" />
                </div>
                <p className="text-[11px] font-mono text-black/35 tracking-[0.12em] uppercase mb-3">
                  {person.role}
                </p>
                <p className="text-sm text-black/40 leading-relaxed group-hover:text-black/60 transition-colors duration-300">
                  {person.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.section
          className="py-12 md:py-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-[#0c0d0e] rounded-2xl px-8 md:px-12 py-12 md:py-14 relative overflow-hidden">
            {/* Glow */}
            <div
              className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,255,129,0.08), transparent 65%)" }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
              {/* Left */}
              <div>
                <span className="text-[11px] font-mono text-[#00ff81]/50 tracking-[0.22em] uppercase mb-5 block">
                  Get started
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-[1.0] tracking-tight">
                  Let&apos;s make you the
                  <br />
                  <span className="text-[#00ff81]">obvious choice.</span>
                </h2>
              </div>
              {/* Right */}
              <div className="lg:max-w-xs shrink-0">
                <p className="text-white/40 text-sm leading-relaxed mb-7">
                  The same conversation that starts every engagement starts here —
                  twenty minutes, honest, no pitch.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/appointments">
                    <button className="bg-[#00ff81] text-black text-sm font-medium px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-200 min-h-[44px]">
                      Book a discovery call
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="text-white text-sm font-medium px-7 py-3.5 rounded-full border border-white/[0.14] hover:border-white/30 transition-colors duration-200 min-h-[44px]">
                      Send us a message &rarr;
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </main>

      <Footer />
    </div>
  );
}
