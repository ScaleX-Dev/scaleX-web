import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => (
  <div className="flex flex-col min-h-screen">
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
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

    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="italic text-gray-600 mb-6">Last Updated: Sep 17th, 2025</p>

      <p className="mb-6">
        At <span className="font-semibold">ScaleX Global</span>, your privacy is
        important to us. This Privacy Policy explains how we collect, use, and
        protect your personal information when you visit{" "}
        <a
          href="https://scalex.global/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          https://scalex.global/
        </a>
        , interact with our content, or use our services.
        <br />
        By accessing or using our Website, you agree to the practices described
        in this Privacy Policy.
      </p>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-3">
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
          <h2 className="text-2xl font-semibold mb-3">
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
          <h2 className="text-2xl font-semibold mb-3">
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
          <h2 className="text-2xl font-semibold mb-3">
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
          <h2 className="text-2xl font-semibold mb-3">
            5. Data Storage and Security
          </h2>
          <p>
            Your information is securely stored using industry-standard
            measures. We limit access to your data to authorized personnel only.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary to fulfill
            the purposes outlined in this Privacy Policy, unless a longer
            retention period is required by law.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
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
            <a
              href="mailto:hello@scalex.global"
              className="text-blue-600 underline hover:text-blue-800"
            >
              hello@scalex.global
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            8. International Data Transfers
          </h2>
          <p>
            Your information may be transferred and processed outside your
            country of residence, including in the UAE. We ensure adequate
            safeguards are in place in line with GDPR requirements.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">9. Children’s Privacy</h2>
          <p>
            Our Website and services are not directed at individuals under 18.
            We do not knowingly collect data from minors.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            10. Updates to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be
            posted on this page with a revised “Last Updated” date.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            how your information is handled, please contact us at:
          </p>
          <p className="mt-2">
            📧{" "}
            <a
              href="mailto:hello@scalex.global"
              className="text-blue-600 underline hover:text-blue-800"
            >
              hello@scalex.global
            </a>
            <br />
            🌐{" "}
            <a
              href="https://scalex.global/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              https://scalex.global/
            </a>
          </p>
        </div>
      </section>

      <p className="mt-12 font-semibold">
        ScaleX Global is committed to protecting your privacy while helping you
        scale with confidence.
      </p>
    </main>

    <Footer />
  </div>
);

export default PrivacyPolicy;
