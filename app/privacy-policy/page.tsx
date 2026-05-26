'use client'
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import Link from "next/link";
import { trackEvent } from "@/utils/events";
import { captureUTM } from "@/utils/attribution";

const PrivacyPolicy = () => {
  const scrollTrackedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    captureUTM();
    trackEvent("page_view", {
      page: "privacy-policy",
      title: "Privacy Policy - ScaleX"
    });

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a');
      if (button) {
        trackEvent("click", {
          element: button.tagName.toLowerCase(),
          text: button.textContent?.trim() || '',
          href: button.getAttribute('href'),
          page: "privacy-policy"
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
          trackEvent("scroll_depth", { depth: milestone, page: "privacy-policy" });
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
  <div className="bg-[#FAFAFA] flex flex-col min-h-screen">
      <Metadata
        title="Privacy Policy - ScaleX"
        description="Read ScaleX's Privacy Policy to understand how we collect, use, and protect your personal information when you use our website."
      />
    <Navbar />

    <main className="flex-1 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pt-40 pb-24">
      <p className="text-[11px] font-mono text-[#00ff81]/60 tracking-[0.25em] uppercase mb-5">Legal</p>
      <h1 className="font-medium tracking-[-0.025em] leading-[1.05] text-[2.8rem] text-gray-900 mb-3">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last Updated: Sep 17th, 2025</p>

      <p className="mb-6 text-gray-600 leading-relaxed">
        At <span className="font-semibold text-gray-900">ScaleX Global</span>, your privacy is
        important to us. This Privacy Policy explains how we collect, use, and
        protect your personal information when you visit{" "}
        <Link
          href="https://scalex.global/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00a855] underline hover:opacity-70"
        >
          https://scalex.global/
        </Link>
        , interact with our content, or use our services.
        <br />
        By accessing or using our Website, you agree to the practices described
        in this Privacy Policy.
      </p>

      <section className="space-y-8 text-gray-600 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            1. Information We Collect
          </h2>
          <p className="mb-3">
            We may collect the following types of information:
          </p>
          <ol className="list-[lower-alpha] space-y-4 pl-6">
            <li>
              <span className="font-semibold">
                Information You Provide Directly:
              </span>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Name, email address, phone number, company details, and any
                  information submitted through forms on our Website or through
                  our social media pages (e.g., to download resources or request
                  consultations).
                </li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">
                Information Collected Automatically:
              </span>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Technical data such as IP address, browser type, operating
                  system, and device information.
                </li>
                <li>Website usage data (pages viewed, time spent, clicks).</li>
                <li>
                  Data collected via cookies, tracking pixels, and analytics
                  tools.
                </li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">
                Information from Third Parties:
              </span>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Publicly available professional information (e.g., LinkedIn).
                </li>
                <li>
                  Marketing and advertising platforms where you interact with
                  our campaigns.
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Provide requested resources (e.g., lead magnets, guides,
              playbooks).
            </li>
            <li>
              Communicate with you via email, phone, or messaging platforms.
            </li>
            <li>
              Send marketing updates, insights, and promotional offers (you may
              opt out anytime).
            </li>
            <li>
              Improve our Website, advertising campaigns, and overall user
              experience.
            </li>
            <li>
              Run targeted advertising campaigns using tools such as Meta Ads,
              LinkedIn Ads, and Google Ads.
            </li>
            <li>Conduct analytics and performance measurement.</li>
            <li>Comply with legal requirements.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            3. Cookies and Tracking
          </h2>
          <p>We use cookies, tracking pixels, and similar technologies to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Remember user preferences.</li>
            <li>
              Analyze Website traffic (via Google Analytics and similar tools).
            </li>
            <li>
              Retarget visitors with relevant ads across platforms (Meta,
              LinkedIn, Google).
            </li>
          </ul>
          <p className="mt-2">
            You can manage or disable cookies through your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            4. Sharing of Information
          </h2>
          <p className="mb-2">
            We do not sell your personal data. However, we may share information
            with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Service providers (e.g., email marketing platforms like
              Mailchimp/HubSpot, cloud hosting, CRM systems).
            </li>
            <li>
              Advertising partners (e.g., Meta, LinkedIn, Google) for campaign
              optimization.
            </li>
            <li>
              Legal authorities, if required to comply with applicable law.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            5. Data Storage and Security
          </h2>
          <p>
            Your information is securely stored using industry-standard
            measures. We limit access to your data to authorized personnel only.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary to fulfill
            the purposes outlined in this Privacy Policy, unless a longer
            retention period is required by law.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            7. Your Rights (GDPR &amp; UAE Compliance)
          </h2>
          <p className="mb-2">
            If you are based in the EU, UK, or UAE, you have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access a copy of the personal data we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Restrict or object to certain processing activities.</li>
            <li>Withdraw consent to marketing communications.</li>
            <li>
              Request transfer of your data to another provider (data
              portability).
            </li>
          </ul>
          <p className="mt-2">
            To exercise your rights, please email us at{" "}
            <Link
              href="mailto:hello@scalex.global"
              className="text-[#00a855] underline hover:opacity-70"
            >
              hello@scalex.global
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            8. International Data Transfers
          </h2>
          <p>
            Your information may be transferred and processed outside your
            country of residence, including in the UAE. We ensure adequate
            safeguards are in place in line with GDPR requirements.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Children&apos;s Privacy</h2>
          <p>
            Our Website and services are not directed at individuals under 18.
            We do not knowingly collect data from minors.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            10. Updates to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted on this page with a revised “Last Updated” date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            how your information is handled, please contact us at:
          </p>
          <p className="mt-2">
            <Link
              href="mailto:hello@scalex.global"
              className="text-[#00a855] underline hover:opacity-70"
            >
              hello@scalex.global
            </Link>
            <br />
            <Link
              href="https://scalex.global/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00a855] underline hover:opacity-70"
            >
              https://scalex.global/
            </Link>
          </p>
        </div>
      </section>

      <p className="mt-12 text-sm font-medium text-gray-500">
        ScaleX Global is committed to protecting your privacy while helping you
        scale with confidence.
      </p>
    </main>

    <Footer />
  </div>
  );
};

export default PrivacyPolicy;
