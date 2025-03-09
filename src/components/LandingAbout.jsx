import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import BackgroundImage from "./BackgroundImage";

const LandingAbout = () => {
  const { scrollYProgress } = useScroll(); // Track scroll progress

  // Map scroll position to horizontal movement
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const xTransformR = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  const services = [
    "SEO",
    "Branding",
    "Web Development",
    "Social Media Marketing",
    "A/B Testing",
    "Design",
    "Blogging",
    "PPC",
    "Creatives & Visualization",
    "AI-Driven Marketing Automation",
    "Strategy",
  ];

  const Counter = ({ from, to }) => {
    const [count, setCount] = useState(from);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true }); // Start when in view, only once

    useEffect(() => {
      if (!isInView) return; // Don't start counting until visible

      const duration = 1500; // Total duration in ms
      const stepTime = Math.max(duration / to, 20); // Adjust speed dynamically

      let current = from;
      const interval = setInterval(() => {
        if (current < to) {
          current++;
          setCount(current);
        } else {
          clearInterval(interval);
        }
      }, stepTime);

      return () => clearInterval(interval);
    }, [isInView, from, to]);

    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {count}
      </motion.span>
    );
  };

  return (
    <div className="bg-bg-color relative flex flex-col items-center justify-center text-center w-full">
      {/* Main Heading and Subtext */}
      <div className="mb-12 mt-[60px]">
        <motion.h1
          className="text-4xl md:text-5xl font-regular text-black mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }} // Trigger animation only once when in view
        >
          From strategy to execution
        </motion.h1>

        <motion.p
          className="text-4xl md:text-5xl font-regular text-black flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }} // Trigger animation only once when in view
        >
          We optimize
          <span className="inline-flex items-center justify-center bg-primary-green px-5 py-2 rounded-full mx-2 translate-y-[6px]">
            <SparklesIcon className="w-6 h-6 text-black" />
          </span>
          every touchpoint precisely.
        </motion.p>
      </div>

      {/* Scroll-based Marquee Animation */}
      <div className="w-screen overflow-hidden relative py-4">
        <motion.div
          className="flex text-lg md:text-3xl text-white font-medium w-max bg-black py-2"
          style={{ x: xTransform }} // Moves based on scroll
        >
          {[...services, ...services].map((service, index) => (
            <span key={index} className="whitespace-nowrap">
              {service}
              {index !== services.length * 2 - 1 && (
                <span className="mx-2">•</span>
              )}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="flex text-lg md:text-3xl text-grey font-medium w-[200%] py-2"
          style={{ x: xTransformR }} // Moves in reverse direction
        >
          {[...services, ...services, ...services].map((service, index) => (
            <span key={index} className="whitespace-nowrap text-grey">
              {service}
              {index !== services.length * 3 - 1 && (
                <span className="mx-2">•</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      {/* First Column */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center w-full mt-12 px-4 md:px-16">
        {/* First Column */}
        <div className="flex flex-col items-center text-center">
          <button className="bg-theme-main text-black px-3 py-1 hover:bg-theme-main/90 transition bg-primary-green rounded-full border-1 border-black mb-[-10px]">
            Projects
          </button>
          <h2 className="text-[100px] font-regular text-theme-black mb-[-20px]">
            <Counter from={0} to={100} />+
          </h2>
          <p className="text-gray-600 text-sm">
            Projects have been done all over the world
          </p>
        </div>

        {/* Second Column */}
        <div className="flex flex-col items-center text-center">
          <button className="bg-theme-main text-black px-3 py-1 hover:bg-theme-main/90 transition bg-primary-green rounded-full border-1 border-black mb-[-10px]">
            Job Success
          </button>
          <h2 className="text-[100px] font-regular text-theme-black mb-[-20px]">
            <Counter from={0} to={98} />%
          </h2>
          <p className="text-gray-600 text-sm">Client Satisfaction Rate</p>
        </div>

        {/* Third Column */}
        <div className="flex flex-col items-center text-center">
          <button className="bg-theme-main text-black px-3 py-1 hover:bg-theme-main/90 transition bg-primary-green rounded-full border-1 border-black mb-[-10px]">
            Years Experience
          </button>
          <h2 className="text-[100px] font-regular text-theme-black mb-[-20px]">
            <Counter from={0} to={5} />+
          </h2>
          <p className="text-gray-600 text-sm">
            Remarkable experience in the industry
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button className="mt-12 bg-theme-main text-black px-6 py-3 rounded-full border-black border-1 hover:bg-theme-main/90 transition text-m font-medium bg-primary-green">
        Get to know more about us →
      </button>

      {/* <BackgroundImage /> */}
    </div>
  );
};

export default LandingAbout;
