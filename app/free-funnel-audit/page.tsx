'use client'
import { useEffect, useRef } from "react";
import {
  CheckCircle,
  Rocket,
  Lightbulb,
  MapPin,
  PieChart,
  Repeat,
  MessageSquare,
  Users,
  TrendingUp,
  Star,
  Search,
  BarChart,
  Briefcase,
  Building,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import Image from "next/image";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";
// Use Recharts (maintained) for the funnel visualization.
import {
  ResponsiveContainer,
  FunnelChart as RechartsFunnelChart,
  Funnel as RechartsFunnel,
  Tooltip as RechartsTooltip,
  LabelList,
  Cell,
} from "recharts";

// Main Page Component
export default function FunnelAuditPage() {
  const scrollTrackedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", {
      page: "free-funnel-audit",
      title: "Free Funnel Audit - ScaleX"
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) {
        trackEvent("click", {
          element: button.tagName.toLowerCase(),
          text: button.textContent?.trim() || '',
          href: button.getAttribute('href'),
          page: "free-funnel-audit"
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
          trackEvent("scroll_depth", { depth: milestone, page: "free-funnel-audit" });
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
    <main className="bg-[#0c0d0e] text-gray-300 font-sans">
        <Metadata
            title="Free Funnel Audit - ScaleX"
            description="Get a free audit of your sales funnel to optimize conversions and maximize revenue with ScaleX."
        />
      <Navbar />
      <HeroSection />
      <FunnelStatsSection />
      <DiscoverSection />
      <WhyAuditSection />
      <TestimonialsSection />
      <ProcessSection />
      <WhoIsForSection />
      <CtaSection />
      <Footer />
    </main>
  );
}

// 1. Hero Section
function HeroSection() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pt-44 pb-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-[#00ff81] bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5 w-max">
            <Rocket className="w-4 h-4" />
            <span className="text-xs font-mono tracking-[0.18em] uppercase">
              Free Funnel Audit
            </span>
          </div>
          <h1 className="font-medium tracking-[-0.025em] leading-[1.05] text-[2.4rem] md:text-[3rem] text-white">
            Turn More Traffic into UAE Real Estate Transactions.
          </h1>
          <p className="text-white/40 text-sm md:text-base leading-relaxed">
            You already understand the buyer journey has changed — your funnel
            should too. Fix what&apos;s quietly leaking your sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/appointments"
              className="inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-medium px-7 py-3.5 rounded-full hover:bg-[#00ff81] transition-all duration-300"
            >
              Book My Free Funnel Audit
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#process"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white/60 text-sm border border-white/10 px-7 py-3.5 rounded-full hover:border-white/30 hover:text-white transition-all duration-300"
            >
              See the Process
            </a>
          </div>
        </div>

        {/* Right: Funnel Charts */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-start">
          {/* Before Funnel Image */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            <div className="relative w-full max-w-[280px] h-auto">
              <Image
                src="/CurrentSalesFunnel.jpg"
                alt="Before Funnel - High Traffic, Low Conversion"
                width={280}
                height={400}
                className="rounded-lg shadow-xl object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-white">Before Funnel</h3>
              <p className="text-sm text-white/40">High Traffic, Low Conversion</p>
            </div>
          </div>
          
          {/* After Funnel Image */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            <div className="relative w-full max-w-[280px] h-auto">
              <Image
                src="/AfterFunnelAudit.jpg"
                alt="After Audit - Optimized Flow, High Conversion"
                width={280}
                height={400}
                className="rounded-lg shadow-xl object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-white">After Audit</h3>
              <p className="text-sm text-white/40">Optimized Flow, High Conversion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Funnel Stats Section (Custom for this content)
function FunnelStatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      text: "70% of agents lose leads before the CTA.",
    },
    {
      icon: Clock,
      text: "92% of buyers research 2+ months before closing.",
    },
    {
      icon: Users,
      text: "Top 1% agencies act fast and dominate the funnel.",
    },
  ];

  return (
    <div className="bg-[#111416] py-16 border-t border-white/[0.05]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-medium text-white mb-6 tracking-tight">
              Here’s the reality most UAE real estate agents ignore...
            </h2>
            <div className="flex flex-col gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/[0.04] border border-white/[0.06] rounded-xl"
                >
                  <stat.icon className="w-7 h-7 text-[#00ff81] flex-shrink-0" />
                  <p className="text-sm font-medium text-white/70">
                    {stat.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-5xl font-bold text-[#00ff81]">
              27 Months
            </h3>
            <p className="text-xl text-gray-300 mt-2">
              ...is how long today's buyers take to decide.
            </p>
            <p className="text-lg text-gray-400 mt-4">
              Your funnel isn’t just ads and landing pages — it’s the silent
              system that turns awareness into trust, and trust into deals. If
              it's not aligned with how buyers think, you're losing sales you
              never even knew existed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. "What You'll Discover" Section
function DiscoverSection() {
  const features = [
    { icon: Users, text: "Attract more qualified leads" },
    { icon: MapPin, text: "Pinpoint where leads are slipping away" },
    {
      icon: PieChart,
      text: "Evaluate ad-to-landing page consistency and offer flow",
    },
    {
      icon: Repeat,
      text: "Review automation, nurturing, and retargeting setup",
    },
    {
      icon: MessageSquare,
      text: "Assess messaging alignment with the 2025 UAE Buyer Journey",
    },
    {
      icon: BarChart,
      text: "Benchmark performance against top-performing real estate funnels",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-20">
      <div className="text-center max-w-3xl mx-auto">
        <Lightbulb className="w-10 h-10 text-[#00ff81] mx-auto mb-4" />
        <h2 className="font-medium tracking-tight text-3xl md:text-4xl text-white mb-4">
          What You’ll Discover
        </h2>
        <p className="text-white/40 text-sm mb-12 leading-relaxed">
          This isn&apos;t a surface-level review. It&apos;s a strategic and sales
          conversion audit — a full diagnosis of your marketing funnel with
          actionable recommendations to help you scale.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 bg-white/[0.04] border border-white/[0.06] rounded-xl"
          >
            <feature.icon className="w-5 h-5 text-[#00ff81] flex-shrink-0" />
            <span className="text-white/60 text-sm">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. "Why This Audit Matters" Section
function WhyAuditSection() {
  return (
    <div className="bg-[#111416] py-20 border-t border-white/[0.05]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <Search className="w-10 h-10 text-[#00ff81] mx-auto mb-4" />
          <h2 className="font-medium tracking-tight text-3xl md:text-4xl text-white mb-4">
            Why This Audit Matters
          </h2>
          <p className="text-lg text-gray-400">
            Today’s buyers take up to 27 months to decide — and most agents lose
            them long before they’re ready. Your funnel is the silent system
            that turns awareness into trust and trust into deals. If it's not
            aligned with how today’s buyers think, browse, and decide… you’re
            losing sales you never even knew existed.
          </p>
        </div>
      </div>
    </div>
  );
}

// 6. Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Jaffer Farooq",
      title: "Real Estate Consultant",
      quote:
        "The UAE Buyer Journey Blueprint was incredibly helpful. It gave me a clearer perspective on how to gauge and understand clients more effectively... I appreciate how practical the breakdown was.",
      image: "https://via.placeholder.com/100", // Replace with actual image path
    },
    {
      name: "Fatima Khan",
      title: "Marketing Manager, Real Estate Brokerage",
      quote:
        "I was surprised by how accurate the audit insights were. They identified gaps we didn’t even know existed in our automation and retargeting flow. The recommendations gave us clarity on where to focus.",
      image: "https://via.placeholder.com/100", // Replace with actual image path
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-medium tracking-tight text-3xl md:text-4xl text-white mb-4">
          What Others Are Saying
        </h2>
        <p className="text-white/40 text-sm mb-12 leading-relaxed">
          We&apos;ve helped agents and marketing teams get clarity on their sales
          funnel. Here&apos;s what they have to say.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white/[0.04] border border-white/[0.06] p-8 rounded-2xl">
            <p className="text-white/50 italic text-sm mb-6">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full mr-4 bg-white/10 flex items-center justify-center font-mono text-sm text-[#00ff81]">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-white text-sm">{testimonial.name}</p>
                <p className="text-xs text-white/30">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 7. "How It Works" Process Section
function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discovery Call",
      desc: "We'll understand your goals, audience, and current funnel setup.",
    },
    {
      num: "02",
      title: "Access & Analysis",
      desc: "We review your website, ad accounts, lead forms, automation tools, and social presence.",
    },
    {
      num: "03",
      title: "Personalized Report",
      desc: "You’ll receive a detailed audit with insights, benchmarks, and actionable steps.",
    },
  ];

  return (
    <div id="process" className="bg-[#111416] py-20 border-t border-white/[0.05]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-medium tracking-tight text-3xl md:text-4xl text-white mb-12">
            What the Process Looks Like
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-4xl font-mono text-[#00ff81]/30 mb-4">{step.num}</div>
              <h3 className="text-lg font-medium text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 8. "Who This Is For" Section
function WhoIsForSection() {
  const targets = [
    {
      icon: Building,
      text: "Real estate consultants and brokerages targeting investors in the UAE",
    },
    {
      icon: Briefcase,
      text: "Agencies managing high-value property campaigns",
    },
    {
      icon: BarChart,
      text: "Teams driving traffic but not seeing proportional sales results",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-medium tracking-tight text-3xl md:text-4xl text-white mb-4">
          Who This Is For
        </h2>
        <p className="text-white/40 text-sm mb-12 leading-relaxed">
          This audit is ideal for professionals serious about scaling their
          impact in the UAE real estate market.
        </p>
      </div>
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {targets.map((target, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 bg-white/[0.04] border border-white/[0.06] rounded-xl"
          >
            <target.icon className="w-6 h-6 text-[#00ff81] flex-shrink-0" />
            <span className="text-white/60 text-sm">{target.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 9. Final Call to Action Section
function CtaSection() {
  return (
    <div id="cta" className="bg-[#111416] py-24 border-t border-white/[0.05]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto">
          <Clock className="w-10 h-10 text-[#00ff81] mx-auto mb-4" />
          <h2 className="font-medium tracking-tight text-3xl md:text-4xl text-white mb-4">
            Limited Complimentary Slots
          </h2>
          <p className="text-white/40 text-sm mb-8 leading-relaxed max-w-lg mx-auto">
            We conduct only a few audits each month to ensure every client
            receives a deep, data-driven review. Book your free session today
            and discover exactly what&apos;s holding your funnel back.
          </p>
          <a
            href="/appointments"
            className="inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#00ff81] transition-all duration-300"
          >
            Book My Free Funnel Audit
          </a>
          <p className="text-xs text-white/20 font-mono mt-6">
            100% Confidential &nbsp;|&nbsp; No Obligations &nbsp;|&nbsp; Real Insights
          </p>
        </div>
      </div>
    </div>
  );
}

// FunnelChart component removed - now using static images
