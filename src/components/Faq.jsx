import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What services does Scalex offer?",
      answer:
        "ScaleX provides data-driven digital solutions designed for B2B success. Our services include digital strategy, performance marketing, SEO, PPC, marketing automation, AI-driven campaigns, web development, and conversion optimization. We help businesses attract high-quality leads, enhance digital performance, and drive sustainable growth with precision.",
    },
    {
      question: "How is Scalex different from other digital consultancies?",
      answer:
        "Our approach is data-driven, human-led, and agile. We blend AI-powered insights with expert-led execution to deliver measurable growth for our clients with precision.",
    },
    {
      question: "How does the Scale-X process work?",
      answer:
        "We start with a free discovery call to understand your goals and how our experts can help achieve them. From there, we develop a customized strategy tailored to your business needs. Our agile approach ensures execution happens in focused sprints, allowing for flexibility, faster turnaround times, and continuous optimization. This way, we stay aligned with your vision while delivering measurable impact without delays.",
    },
    {
      question: "What industries does Scalex work with?",
      answer:
        "We partner with businesses across technology, finance, e-commerce, real estate, and professional services, delivering tailored digital solutions. Our expertise spans 8 countries across 3 continents, enabling us to drive global impact while adapting to regional market dynamics.",
    },
    {
      question: "How can I get started with Scalex?",
      answer:
        "Simply book a free discovery call, and let’s explore how we can drive growth for your business.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Section */}
        <div className="w-full lg:w-5/12 flex-shrink-0">
          <h2 className="text-4xl sm:text-5xl font-semibold text-black mb-4 sm:mb-6">
            ScaleX FAQs
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
            As a digital marketing agency, we are dedicated to providing
            comprehensive educational resources and answering frequently asked
            questions to help our clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link to="/contact">
              <button className="bg-primary-green border border-black text-black px-4 sm:px-6 py-2 rounded-full hover:bg-theme-main/90 transition text-base sm:text-lg w-full sm:w-auto">
                More Questions? Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section (FAQ List) */}
        <div className="w-full lg:w-7/12 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                onClick={() => handleToggle(index)}
                className={`w-full text-left py-3 sm:py-4 px-4 sm:px-5 flex justify-between items-center text-black text-lg sm:text-xl font-medium hover:text-theme-main transition ${
                  openIndex === index ? "bg-black text-white" : ""
                }`}
              >
                <span>{faq.question}</span>
                <span className="text-theme-main text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1], // a smoother custom bezier easing
                    }}
                    className="overflow-hidden"
                  >
                    <div className="py-3 sm:py-4 px-4 sm:px-5 text-gray-400 bg-black text-sm sm:text-base">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
