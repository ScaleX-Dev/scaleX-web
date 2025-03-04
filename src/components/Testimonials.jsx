import React, { useState } from 'react';

const Testimonials = () => {
  // Sample testimonials data (replace with your actual data)
  const testimonials = [
    {
      quote: "I would be thrilled every week to see what new nuggets of wisdom they unearth. Their insights and discoveries never fail to impress, opening my eyes to possibilities I hadn’t even considered. I’m eager to put their ideas into action as soon as possible.",
      author: "Michael Kaizer",
      company: "Forge Fitness Studio",
    },
    // Add more testimonials as needed
    {
      quote: "Another great testimonial about ScaleX’s amazing service.",
      author: "Jane Doe",
      company: "Tech Innovations",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle sliding to next testimonial
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Handle sliding to previous testimonial
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const { quote, author, company } = testimonials[currentIndex];

  return (
    <div className="bg-[#F5F7F9] p-6 rounded-lg max-w-full mx-auto relative h-76 flex flex-col justify-between ">
      {/* Testimonial Quote */}
      <p className="text-black text-[32px] font-medium mb-4 px-15 text-justify">{quote}</p>

      {/* Author and Company */}
      <div className="flex items-center space-x-3 mt-[auto] px-15">
        <div className="w-15 h-15 bg-gray-300 rounded-full" /> {/* Placeholder for profile image */}
        <div>
          <p className="text-black font-bold">{author}</p>
          <p className="text-gray-600 text-sm">{company}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 right-4 flex space-x-2 px-15">
        <button
          onClick={handlePrev}
          className=" rounded-full p-2 px-6 border-black border-1 hover:bg-gray-100 transition"
          aria-label="Previous Testimonial"
        >
          ←
        </button>
        <span className="text-gray-600 text-sm font-semibold flex items-center">0{currentIndex + 1}/<span className='text-grey'>0{testimonials.length}</span></span>
        <button
          onClick={handleNext}
          className="bg-black text-primary-green rounded-full p-2 px-6 hover:bg-gray-100 transition"
          aria-label="Next Testimonial"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
