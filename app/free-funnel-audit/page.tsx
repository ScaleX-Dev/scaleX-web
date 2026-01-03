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
    <main className=" text-gray-300 font-sans">
        <Metadata
            title="Free Funnel Audit - ScaleX"
            description="Get a free audit of your sales funnel to optimize conversions and maximize revenue with ScaleX."
        />
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#646464] to-[#00ff81] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
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
    <div className="container mx-auto px-6 py-24 md:pt-28 md:pb-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-[var(--color-primary-green)] bg-[#0e0e0e] rounded-full px-3 py-1 w-max">
            <Rocket className="w-5 h-5" />
            <span className="font-semibold tracking-wide uppercase">
              Free Funnel Audit
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
            Turn More Traffic into UAE Real Estate Transactions.
          </h1>
          <p className="text-lg text-gray-400">
            You already understand the buyer journey has changed — your funnel
            should too. Fix what’s quietly leaking your sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/appointments"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-black bg-[var(--color-primary-green)] rounded-lg shadow-lg hover:bg-black hover:text-white transition-colors"
            >
              Book My Free Funnel Audit
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#process"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-black bg-transparent border border-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              See the Process
            </a>
          </div>
        </div>

        {/* Right: Funnel Charts */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <FunnelChart
            title="Before Funnel"
            description="High Traffic, Low Conversion"
            leads={30}
            qualified={5}
            conversions={2}
          />
          <FunnelChart
            title="After Audit"
            description="Optimized Flow, High Conversion"
            leads={20}
            qualified={15}
            conversions={8}
          />
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
    <div className="bg-[#111111] py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Here’s the reality most UAE real estate agents ignore...
            </h2>
            <div className="flex flex-col gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-[#313131] rounded-lg"
                >
                  <stat.icon className="w-8 h-8 text-[var(--color-primary-green)] flex-shrink-0" />
                  <p className="text-lg font-medium text-gray-300">
                    {stat.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-5xl font-bold text-[var(--color-primary-green)]">
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
    <div className="container mx-auto px-6 py-16 pb-20">
      <div className="text-center max-w-3xl mx-auto">
        <Lightbulb className="w-12 h-12 text-[var(--color-primary-green)] mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          What You’ll Discover
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          This isn’t a surface-level review. It’s a strategic and sales
          conversion audit — a full diagnosis of your marketing funnel with
          actionable recommendations to help you scale.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 bg-[#313131] rounded-lg"
          >
            <feature.icon className="w-6 h-6 text-[var(--color-primary-green)] flex-shrink-0" />
            <span className="text-gray-300">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. "Why This Audit Matters" Section
function WhyAuditSection() {
  return (
    <div className="bg-[#111111] py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Search className="w-12 h-12 text-[var(--color-primary-green)] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
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
    <div className="container mx-auto px-6 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          What Others Are Saying
        </h2>
        <p className="text-gray-600 mb-12">
          We've helped agents and marketing teams get clarity on their sales
          funnel. Here's what they have to say.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-[#313131] p-8 rounded-lg shadow-xl">
            <p className="text-gray-300 italic text-lg mb-6">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full mr-4 bg-gray-700 flex items-center justify-center font-bold text-white">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.title}</p>
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
      num: "1️⃣",
      title: "Discovery Call",
      desc: "We’ll understand your goals, audience, and current funnel setup.",
    },
    {
      num: "2️⃣",
      title: "Access & Analysis",
      desc: "We review your website, ad accounts, lead forms, automation tools, and social presence.",
    },
    {
      num: "3️⃣",
      title: "Personalized Report",
      desc: "You’ll receive a detailed audit with insights, benchmarks, and actionable steps.",
    },
  ];

  return (
    <div id="process" className="bg-[#111111] py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            🔍 What the Process Looks Like
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-5xl mb-4">{step.num}</div>
              <h3 className="text-xl font-bold text-white mb-2">
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
    <div className="container mx-auto px-6 py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          📈 Who This Is For
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          This audit is ideal for professionals serious about scaling their
          impact in the UAE real estate market.
        </p>
      </div>
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {targets.map((target, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 bg-[#333333] rounded-lg"
          >
            <target.icon className="w-8 h-8 text-[var(--color-primary-green)] flex-shrink-0" />
            <span className="text-lg text-gray-300">{target.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 9. Final Call to Action Section
function CtaSection() {
  return (
    <div id="cta" className="bg-[#111111] py-20">
      <div className="container mx-auto px-6">
        <div className="bg-[#222222] shadow-2xl rounded-lg p-10 md:p-16 text-center max-w-4xl mx-auto">
          <Clock className="w-12 h-12 text-[var(--color-primary-green)] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Limited Complimentary Slots
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            We conduct only a few audits each month to ensure every client
            receives a deep, data-driven review. Book your free session today
            and discover exactly what’s holding your funnel back.
          </p>
          <a
            href="/appointments"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-lg text-black bg-[var(--color-primary-green)] rounded-lg shadow-lg hover:bg-black hover:text-white transition-colors"
          >
            Book My Free Funnel Audit
          </a>
          <p className="text-sm text-gray-500 mt-6">
            🔒 100% Confidential | No Obligations | Real Insights
          </p>
        </div>
      </div>
    </div>
  );
}

// New wrapper component: prefer external library, fallback to OldFunnelChart
function FunnelChart(props: {
    title: string;
    description: string;
    leads: number;
    qualified: number;
    conversions: number;
}) {
  const {
    leads = 0,
    qualified = 0,
    conversions = 0,
    title,
    description,
  } = props;

  // Data shape for react-funnel-chart
  const data = [
    { label: "Leads", value: Math.max(0, Number(leads)) },
    { label: "Qualified", value: Math.max(0, Number(qualified)) },
    { label: "Conversions", value: Math.max(0, Number(conversions)) },
  ];

  // Render a maintained Recharts-based funnel visualization.
  const colors = ["#F97316", "#EF4444", "#10B981"];

  return (
    <div className="flex flex-col items-center p-4 bg-[#101010] rounded-lg shadow-xl w-full max-w-[250px]">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>

      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsFunnelChart>
            <RechartsFunnel
              dataKey="value"
              data={data}
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
              <LabelList dataKey="value" position="inside" />
            </RechartsFunnel>
            <RechartsTooltip />
          </RechartsFunnelChart>
        </ResponsiveContainer>
      </div>

      {/* Legend / Stats (kept for parity with old UI) */}
      <div className="mt-4 w-full text-left">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-3 h-3 rounded-full bg-orange-400`}></div>
          <span className="text-sm text-gray-300">{leads} Leads</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-3 h-3 rounded-full bg-red-500`}></div>
          <span className="text-sm text-gray-300">{qualified} Qualified</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full bg-green-500`}></div>
          <span className="text-sm text-gray-300">
            {conversions} Conversions
          </span>
        </div>
      </div>
    </div>
  );
}
