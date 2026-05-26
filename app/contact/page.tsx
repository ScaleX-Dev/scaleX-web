'use client'
import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Switch } from "@headlessui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

export default function Example() {
  const scrollTrackedRef = useRef<Set<number>>(new Set());
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    companyUrl: "",
    phoneNumber: "",
    message: "",
    goal: "",
    agreed: false,
  });

  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", {
      page: "contact",
      title: "Contact Us - ScaleX"
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) {
        trackEvent("click", {
          element: button.tagName.toLowerCase(),
          text: button.textContent?.trim() || '',
          href: button.getAttribute('href'),
          page: "contact"
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
          trackEvent("scroll_depth", { depth: milestone, page: "contact" });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = () => {
    setFormData(prev => ({
      ...prev,
      agreed: !prev.agreed,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreed) {
      setAlertMessage("You must agree to the policy to submit the form.");
      return;
    }

    try {
      await addDoc(collection(db, "contact"), {
        ...formData,
        createdAt: new Date(),
      });
      setAlertMessage("Form submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      setAlertMessage("Error submitting form.");
    }
  };

  return (
    <div className="bg-[#0c0d0e] min-h-screen relative overflow-hidden">
      <Metadata
        title="Contact Us — ScaleX"
        description="Get in touch with ScaleX for your digital marketing needs."
      />

      {/* Ambient glow */}
      <div className="absolute top-[5%] left-[10%] w-[700px] h-[500px] bg-[#00ff81]/[0.05] rounded-full blur-[150px] pointer-events-none" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1.2px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 70% 50% at 40% 20%, black 10%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 40% 20%, black 10%, transparent 100%)",
        }}
      />

      <Navbar />

      <div className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 pt-44 pb-32 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] font-mono text-[#00ff81]/60 tracking-[0.25em] uppercase mb-6">
            Get in touch
          </p>
          <h1 className="font-medium tracking-[-0.025em] leading-[1.0] text-[2.6rem] sm:text-5xl md:text-[3.5rem] text-white mb-6">
            Want to build something<span className="hidden sm:inline"><br /></span>{" "}
            <span className="text-white/25">great together?</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base max-w-sm leading-relaxed">
            Let&apos;s hop on a free discovery call and explore how we can create real results for your business.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* First Name */}
            <div>
              <label htmlFor="first-name" className="block text-xs font-mono text-white/40 tracking-[0.15em] uppercase mb-2">
                First name <span className="text-[#00ff81]">*</span>
              </label>
              <input
                id="first-name" name="firstName" value={formData.firstName}
                onChange={handleChange} required
                className="block w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00ff81]/50 focus:bg-white/[0.06] transition-all"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last-name" className="block text-xs font-mono text-white/40 tracking-[0.15em] uppercase mb-2">
                Last name <span className="text-[#00ff81]">*</span>
              </label>
              <input
                id="last-name" name="lastName" value={formData.lastName}
                onChange={handleChange} required
                className="block w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00ff81]/50 focus:bg-white/[0.06] transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono text-white/40 tracking-[0.15em] uppercase mb-2">
                Email <span className="text-[#00ff81]">*</span>
              </label>
              <input
                id="email" name="email" type="email" value={formData.email}
                onChange={handleChange} required
                className="block w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00ff81]/50 focus:bg-white/[0.06] transition-all"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-xs font-mono text-white/40 tracking-[0.15em] uppercase mb-2">
                Company <span className="text-[#00ff81]">*</span>
              </label>
              <input
                id="company" name="company" value={formData.company}
                onChange={handleChange} required
                className="block w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00ff81]/50 focus:bg-white/[0.06] transition-all"
              />
            </div>

            {/* Company URL */}
            <div className="sm:col-span-2">
              <label htmlFor="company-url" className="block text-xs font-mono text-white/40 tracking-[0.15em] uppercase mb-2">
                Company URL
              </label>
              <input
                id="company-url" name="companyUrl" type="url" placeholder="https://"
                value={formData.companyUrl} onChange={handleChange}
                className="block w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00ff81]/50 focus:bg-white/[0.06] transition-all"
              />
            </div>

            {/* Phone */}
            <div className="sm:col-span-2">
              <label htmlFor="phone-number" className="block text-xs font-mono text-white/40 tracking-[0.15em] uppercase mb-2">
                Phone number <span className="text-[#00ff81]">*</span>
              </label>
              <input
                id="phone-number" name="phoneNumber" placeholder="123-456-7890"
                value={formData.phoneNumber} onChange={handleChange} required
                className="block w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00ff81]/50 focus:bg-white/[0.06] transition-all"
              />
            </div>

            {/* Goal */}
            <div className="sm:col-span-2">
              <label htmlFor="goal" className="block text-xs font-mono text-white/40 tracking-[0.15em] uppercase mb-2">
                Your goal <span className="text-[#00ff81]">*</span>
              </label>
              <input
                id="goal" name="goal" value={formData.goal}
                onChange={handleChange} required
                className="block w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00ff81]/50 focus:bg-white/[0.06] transition-all"
              />
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-xs font-mono text-white/40 tracking-[0.15em] uppercase mb-2">
                Message
              </label>
              <textarea
                id="message" name="message" rows={4}
                value={formData.message} onChange={handleChange}
                className="block w-full rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00ff81]/50 focus:bg-white/[0.06] transition-all resize-none"
              />
            </div>

            {/* Privacy toggle */}
            <div className="flex items-center gap-x-4 sm:col-span-2">
              <Switch
                checked={formData.agreed}
                onChange={handleSwitchChange}
                className="group relative inline-flex h-6 w-11 rounded-full bg-white/10 ring-1 ring-white/10 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-[#00ff81]"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white ring-1 ring-white/10 transition duration-200 ease-in-out translate-x-1 group-data-[checked]:translate-x-6 mt-1"
                />
              </Switch>
              <span className="text-xs text-white/30 leading-relaxed">
                Your email may be used for marketing purposes. You may opt-out at any time.
              </span>
            </div>
          </div>

          {/* Alert */}
          {alertMessage && (
            <div className={`my-5 text-sm font-mono ${alertMessage.includes("Error") ? "text-red-400" : "text-[#00ff81]"}`}>
              {alertMessage}
            </div>
          )}

          {/* Submit */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-white text-black text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#00ff81] transition-all duration-300"
            >
              Send message
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
