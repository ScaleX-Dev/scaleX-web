import React, { useState } from "react";

const FAQ = () => {
  // Sample FAQ data (replace with your actual data)
  const faqs = [
    {
      question: "Why is digital marketing important for my business?",
      answer:
        "Digital marketing allows businesses to reach and engage with a wider audience, generate leads, drive website traffic, and increase brand visibility. It provides measurable results, allows for targeted marketing efforts, and enables businesses to adapt and optimize their strategies based on data and insights.",
    },
    {
      question:
        "How can digital marketing help improve my website’s visibility?",
      answer:
        "Through SEO, content marketing, and social media strategies, digital marketing can enhance your website’s visibility on search engines and social platforms, driving more organic traffic and improving user engagement.",
    },
    {
      question:
        "How long does it take to see results from digital marketing efforts?",
      answer:
        "Results can vary, but typically, you may start seeing improvements in 3-6 months, depending on the strategy, industry, and consistency of efforts.",
    },
    {
      question:
        "How do you measure the success of digital marketing campaigns?",
      answer:
        "We measure success through metrics like website traffic, conversion rates, ROI, engagement rates, and lead generation, using tools like Google Analytics and marketing dashboards.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  // Toggle FAQ item open/closed
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto p-20 px-20 flex flex-col md:flex-row justify-between items-start gap-8">
      <div className="md:w-1/2">
        <h2 className="text-[48px] font-medium text-black mb-6">ScaleX FAQs</h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          As a digital marketing agency, we are dedicated to providing
          comprehensive educational resources and answering frequently asked
          questions to help our clients.
        </p>

        <div className="mt-8 flex items-center gap-8">
          <button className="bg-primary-green border-1 border-black text-black px-4 py-2 rounded-full hover:bg-theme-main/90 transition">
            More Questions
          </button>
          <button className="text-black hover:text-theme-main transition underline">
            Contact Us
          </button>
        </div>
      </div>

      <div className="md:w-1/2 space-y-4 mt-8 md:mt-0">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              onClick={() => handleToggle(index)}
              className={`w-full text-left py-4 px-5 flex justify-between items-center text-black text-[24px] font-medium hover:text-theme-main transition ${
                openIndex === index
                  ? "bg-black text-white" // Apply black background and white text if open
                  : ""
              }`}
            >
              <span>{faq.question}</span>
              <span className="text-theme-main">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="py-4 px-5 text-gray-400 bg-black">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
