import React, { useState } from "react";
import Lottie from "react-lottie-player";
import marketingAnimation from "../assets/marketing-5.json"; // Replace with your Lottie JSON file
import designAnimation from "../assets/design2.json"; // Replace with your Lottie JSON file

const Services = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    console.log("Toggling section: ", section);
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="max-w-full py-10 lg:py-14 mx-auto">
      <div className="flex flex-col sm:flex-row">
        {/* Marketing Services Column */}
        <div
          className={`relative transition-all duration-500 ease-in-out px-10 pt-10 border-y-1 border-r-1 border-black overflow-hidden 
          ${
            activeSection === "marketing"
              ? "w-full sm:w-[80%] min-h-100"
              : activeSection === "design"
              ? "w-full sm:w-[20%] bg-primary-green min-h-100"
              : "w-full sm:w-[50%] bg-primary-green min-h-100"
          }`}
        >
          {(activeSection === null) && (
            <Lottie
              loop
              animationData={marketingAnimation}
              play
              className="absolute inset-0 w-full h-full object-cover translate-y-12"
            />
          )}

          <button
            onClick={() => toggleSection("marketing")}
            className="relative w-full flex justify-between items-center text-3xl font-semibold text-gray-800 mb-4 focus:outline-none"
          >
            <span
              className={`transform transition-transform duration-300 ${
                activeSection === "marketing"
                  ? "rotate-0 text-4xl mb-5"
                  : activeSection === "design"
                  ? "sm:w-[20%] sm:h-full sm:flex sm:items-center sm:justify-center sm:writing-mode-vertical-rl sm:transform sm:-rotate-90 text-5xl translate-y-20"
                  : "rotate-0 text-6xl"
              }`}
            >
              Marketing
            </span>
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                activeSection === "marketing" ? "rotate-180" : activeSection === null ? "" : "opacity-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              activeSection === "marketing"
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-wrap justify-center gap-5 mb-15">
              {/* Growth Strategy */}
              <div className="flex flex-col rounded-xl p-6 bg-gradient-to-br from-black/80 to-black w-full sm:w-[calc(50%-1.5rem)]">
                <div className="flex items-center gap-x-4 mb-4">
                  <svg
                    className="size-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3h18v18H3zM21 9H3M21 15H3M9 21V3" />
                  </svg>
                  <h3 className="text-xl font-semibold text-white">
                    Growth Strategy
                  </h3>
                </div>
                <p className="text-gray-300">
                  Unlock your market potential and achieve sustainable growth by
                  navigating both current and future uncertainties with a
                  tailored, actionable strategy.
                </p>
              </div>

              {/* PPC & Lead Generation */}
              <div className="flex flex-col rounded-xl p-6 bg-gradient-to-br from-gray-100 to-gray-200 w-full sm:w-[calc(50%-1.5rem)]">
                <div className="flex items-center gap-x-4 mb-4">
                  <svg
                    className="size-7 text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3h18v18H3zM21 9H3M21 15H3M9 21V3" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800">
                    PPC & Lead Generation
                  </h3>
                </div>
                <p className="text-gray-600">
                  Launch performance-driven campaigns that resonate with your
                  audience, delivering results within your ad budget.
                </p>
              </div>

              {/* SEO & Content */}
              <div className="flex flex-col rounded-xl p-6 bg-gradient-to-br from-black/80 to-black  w-full sm:w-[calc(50%-1.5rem)]">
                <div className="flex items-center gap-x-4 mb-4">
                  <svg
                    className="size-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3h18v18H3zM21 9H3M21 15H3M9 21V3" />
                  </svg>
                  <h3 className="text-xl font-semibold text-white">
                    SEO & Content
                  </h3>
                </div>
                <p className="text-gray-300">
                  Optimize your marketing funnel with content that drives
                  website traffic, boosts awareness, and converts visitors into
                  loyal customers through targeted strategies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Design & Development Services Column */}

        <div
          className={`relative transition-all duration-500 ease-in-out px-10 pt-10 border-y-1 border-r-1 border-black overflow-hidden 
          ${
            activeSection === "design"
              ? "w-full sm:w-[80%] min-h-100"
              : activeSection === "marketing"
              ? "w-full sm:w-[20%] bg-primary-green min-h-100"
              : "w-full sm:w-[50%] min-h-100"
          }`}
        >
          {/* Background Animation */}
          {(activeSection === null) && (
            <Lottie
              loop
              animationData={designAnimation}
              play
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
          )}

          <button
            onClick={() => toggleSection("design")}
            className="relative w-full flex justify-between items-center text-3xl font-semibold text-gray-800 mb-4 focus:outline-none"
          >
            <span
              className={`transform transition-transform duration-300 ${
                activeSection === "design"
                  ? "rotate-0 text-4xl mb-5"
                  : activeSection === "marketing"
                  ? "sm:w-[20%] sm:h-full sm:flex sm:items-center sm:justify-center sm:writing-mode-vertical-rl sm:transform sm:-rotate-90 text-5xl  translate-y-20"
                  : "rotate-0 text-6xl"
              }`}
            >
              Design
            </span>
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                activeSection === "design" ? "rotate-180" : activeSection === null ? "" : "opacity-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              activeSection === "design"
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-wrap justify-center gap-6 mb-15">
              {/* Creative & Motion Design */}
              <div className="flex flex-col rounded-xl p-6 bg-gradient-to-br from-gray-100 to-gray-200 w-full sm:w-[calc(50%-1.5rem)]">
                <div className="flex items-center gap-x-4 mb-4">
                  <svg
                    className="size-7 text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3h18v18H3zM21 9H3M21 15H3M9 21V3" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Creative & Motion Design
                  </h3>
                </div>
                <p className="text-gray-600">
                  Create engaging content and stories that connect with your
                  audience, seamlessly adapting across formats and platforms.
                </p>
              </div>

              {/* Web Design & Development */}
              <div className="flex flex-col rounded-xl p-6 bg-gradient-to-br  from-black/80 to-black w-full sm:w-[calc(50%-1.5rem)]">
                <div className="flex items-center gap-x-4 mb-4">
                  <svg
                    className="size-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3h18v18H3zM21 9H3M21 15H3M9 21V3" />
                  </svg>
                  <h3 className="text-xl font-semibold text-white">
                    Web Design & Development
                  </h3>
                </div>
                <p className="text-gray-300">
                  Design, test, and launch websites and landing pages that
                  convert visitors to customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
