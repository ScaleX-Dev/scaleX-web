import React, { useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "I would be thrilled every week to see what new nuggets of wisdom they unearth. Their insights and discoveries never fail to impress, opening my eyes to possibilities I hadn’t even considered. I’m eager to put their ideas into action as soon as possible.",
      author: "Michael Kaizer",
      company: "Forge Fitness Studio",
    },
    {
      quote: "Teaming up with Scalex for our digital strategy was a game-changer. We quickly discovered they had the technical expertise and insights we were after",
      author: "Achintha Isiwara",
      company: "CEO • Magnate Shipping",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const { quote, author, company } = testimonials[currentIndex];

  return (
    <div className="bg-[#F5F7F9] p-6 rounded-lg max-w-full mx-auto h-auto flex flex-col">
      {/* Testimonial Quote */}
      <p className="text-black text-xl sm:text-2xl md:text-[32px] font-medium mb-6 px-4 sm:px-6 text-justify flex-grow">
        {quote}
      </p>

      {/* Footer: Author/Company and Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 gap-4 sm:gap-6">
        {/* Author and Company */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-300 rounded-full" />{" "}
          {/* Placeholder for profile image */}
          <div className="flex flex-col">
            <p className="text-black font-bold text-base sm:text-lg">
              {author}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">{company}</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrev}
            className="rounded-full p-2 px-4 sm:px-6 border border-black hover:bg-gray-100 transition"
            aria-label="Previous Testimonial"
          >
            ←
          </button>
          <span className="text-gray-600 text-sm sm:text-base font-semibold flex items-center">
            0{currentIndex + 1}/
            <span className="text-gray-400">0{testimonials.length}</span>
          </span>
          <button
            onClick={handleNext}
            className="bg-black text-primary-green rounded-full p-2 px-4 sm:px-6 hover:bg-gray-800 transition"
            aria-label="Next Testimonial"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
