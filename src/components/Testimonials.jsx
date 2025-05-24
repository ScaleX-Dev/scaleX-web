import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "I would be thrilled every week to see what new nuggets of wisdom they unearth. Their insights and discoveries never fail to impress, opening my eyes to possibilities I hadn’t even considered. I’m eager to put their ideas into action as soon as possible.",
      author: "Michael Kaizer",
      company: "Forge Fitness Studio",
    },
    {
      quote:
        "Teaming up with Scalex for our digital strategy was a game-changer. We quickly discovered they had the technical expertise and insights we were after",
      author: "Achintha Isiwara",
      company: "CEO • Magnate Shipping",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const { quote, author, company } = testimonials[currentIndex];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      className="bg-[#F5F7F9] p-6 rounded-lg max-w-full mx-auto h-auto flex flex-col"
    >
      {/* Testimonial Quote with animation */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, x: direction >= 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction >= 0 ? -50 : 50 }}
          transition={{ duration: 0.4 }}
          className="text-black text-xl sm:text-2xl md:text-[32px] font-medium mb-6 px-4 sm:px-6 text-justify flex-grow"
        >
          {quote}
        </motion.p>
      </AnimatePresence>

      {/* Footer: Author/Company and Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 gap-4 sm:gap-6">
        {/* Author and Company */}
        <div className="flex items-center space-x-3">
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
    </motion.div>
  );
};

export default Testimonials;