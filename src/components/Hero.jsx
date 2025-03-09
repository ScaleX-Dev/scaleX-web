import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="bg-white relative overflow-hidden">
      {/* Full-width black content container */}
      <div className="w-full bg-black text-white relative">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://res.cloudinary.com/drj8voqyf/video/upload/v1739041553/de1pkql2knh0vfgg0x2g.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-green/10 to-transparent opacity-50 z-10" />

        {/* Side Gradient Overlays with Blur (Vertically Centered) */}
        <div
          className="gradient-overlay left absolute top-1/2 left-0 h-[70vh] w-1/3 rounded-full blur-xl z-20 -ml-64 transform -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle at left, rgba(74, 222, 128, 0.5), transparent)",
          }}
        />
        <div
          className="gradient-overlay right absolute top-1/2 right-0 h-[70vh] w-1/3 rounded-full blur-xl z-20 -mr-64 transform -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle at right, rgba(74, 222, 128, 0.5), transparent)",
          }}
        />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <div className="text-center z-30 px-4 py-16 md:px-16 md:py-48 relative">
          <motion.button
            className="mb-6 md:mb-8 bg-gray-800/50 text-white px-4 py-1 rounded-full border-gray-700 hover:bg-gray-700 transition text-sm md:text-base inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <span className="text-primary-green mr-2">⚡</span> Connect. Engage.
            Grow
          </motion.button>

          <motion.h1
            className="text-4xl font-medium mb-6 md:text-6xl md:mb-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Your Trusted
            <br /> Growth Marketing Catalyst
          </motion.h1>

          <motion.p
            className="text-gray-400 mb-8 max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            ScaleX combines AI-driven insights with expert marketing solutions
            to drive exponential business growth, spanning all stages of
            business from idea to implementation.
          </motion.p>

          <div className="space-x-4 mb-8 md:mb-12">
            <motion.button
              className="bg-primary-green text-black px-4 py-2 rounded-full hover:bg-green-300 transition text-sm md:px-6 md:py-3 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              Schedule Call →
            </motion.button>

            <motion.button
              className="bg-transparent border-primary-green border-1 text-primary-green px-4 py-2 rounded-full hover:bg-primary-green/10 hover:text-black transition text-sm md:px-6 md:py-3 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              View Case Study
            </motion.button>
          </div>

          <motion.div
            className="flex items-center justify-center space-x-2 text-primary-green text-xs md:text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <img
              src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
              alt="dot"
              className="w-7 h-7 rounded-full bg-white"
            />
            <img
              src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
              alt="dot"
              className="w-7 h-7 -ml-4 rounded-full bg-white"
            />
            <img
              src="https://www.shutterstock.com/image-photo/young-handsome-man-beard-wearing-600nw-1768126784.jpg"
              alt="dot"
              className="w-7 h-7 -ml-4 rounded-full bg-white"
            />
            <span>
              ★★★★★ <span className="text-white">(4.9/5 Rating Stars)</span>
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
