'use client'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import Link from "next/link";

const TEAM = [
  { name: "Chirath Hewagamage", role: "Founder" },
  { name: "Vishaka Wijekoon", role: "Social Media Marketing Manager" },
  { name: "Tinura", role: "Growth Partnership Specialist" },
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
      <section className="relative overflow-hidden bg-[#FAFAFA] pt-36 pb-16">
        {/* dot grid */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,0.045) 1.2px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse 80% 65% at 48% 40%, black 15%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 65% at 48% 40%, black 15%, transparent 100%)",
          }}
        />
        <div className="absolute top-[15%] left-[2%] w-[500px] h-[400px] bg-[#00ff81]/[0.07] rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff81]" />
                <span className="text-[11px] font-mono text-[#00ff81] tracking-[0.28em] uppercase">
                  About
                </span>
              </div>
              <div className="overflow-hidden mb-3">
                <h1 className="font-medium tracking-[-0.030em] leading-[1.0] text-[3.2rem] sm:text-[4rem] md:text-[5rem] text-[#0c0d0e]">
                  We make ambitious businesses<br />
                  <span className="font-serif font-medium">the obvious choice.</span>
                </h1>
              </div>
              <p className="text-black/45 text-sm md:text-base leading-relaxed max-w-lg mb-10">
                ScaleX is a group of storytellers, developers, and strategists who met freelancing in university and grouped up around one idea: the best businesses lose every day to worse ones that simply tell a better story. We’re here to make sure that doesn’t happen to yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <main className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pb-24 w-full flex-1">
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-medium text-black mb-3">Your story, told so customers choose you.</h2>
          <p className="text-base text-gray-700 max-w-2xl">
            Most businesses are better than their marketing makes them look. The work is real; the story just isn’t landing. That’s the gap we close. We find what makes you the obvious choice, and we make sure your customers feel it everywhere they meet you. You’re the hero of this story. We’re the ones who make sure it gets told properly.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-serif font-medium text-black mb-3">Our approach.</h2>
          <p className="text-base text-gray-700 max-w-2xl">
            We work as part of your team. Close enough to learn the business the way you know it, so the work comes from real understanding instead of guesswork. We build on what actually makes a customer choose — the psychology of how people decide, and the story that makes them feel you’re the one. And we measure everything we do, because you deserve to see what the work is returning.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-serif font-medium text-black mb-8">The people you'll actually work with.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {TEAM.map((person, idx) => (
              <div key={person.name} className="bg-white rounded-xl border border-black/10 flex flex-col items-center p-8 shadow-sm">
                <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
                  {/* Placeholder for image */}
                  <span className="text-gray-400 text-xs">Portrait: {person.name}</span>
                </div>
                <div className="text-lg font-medium text-black mb-1 text-center">{person.name}</div>
                <div className="text-sm text-gray-500 text-center">{person.role}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#F6F5F2] rounded-2xl py-16 px-8 text-center border border-gray-200">
          <h2 className="text-2xl font-serif font-medium text-black mb-4">Let's make you the obvious choice.</h2>
          <p className="text-base text-gray-700 mb-8">
            The same conversation that starts every engagement starts here — twenty minutes, honest, no pitch.
          </p>
          <Link href="/appointments">
            <button className="bg-[#00ff81] text-[#0c0d0e] px-6 py-3 rounded-full font-medium text-base hover:bg-[#00e872] transition">
              Book a discovery call
            </button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

