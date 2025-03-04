import React from 'react';

const Hero = () => {
  return (
    <div className=" bg-white relative overflow-hidden">
      {/* Full-width black content container */}
      <div className="w-full bg-black text-white relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-green/10 to-transparent opacity-50 z-10" />

        {/* Side Gradient Overlays with Blur (Vertically Centered) */}
        <div
          className="gradient-overlay left absolute top-1/2 left-0 h-[70vh] w-1/3 rounded-full blur-xl z-20 -ml-64 transform -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle at left, rgba(74, 222, 128, 0.5), transparent)',
          }}
        />
        <div
          className="gradient-overlay right absolute top-1/2 right-0 h-[70vh] w-1/3 rounded-full blur-xl z-20 -mr-64 transform -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle at right, rgba(74, 222, 128, 0.5), transparent)',
          }}
        />

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 py-4 px-6 flex justify-between items-center w-full z-30">
          <h1 className="text-primary-green text-2xl font-bold">ScaleX</h1>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-300 text-sm">Homepage</a>
            <a href="#" className="hover:text-gray-300 text-sm">About</a>
            <a href="#" className="hover:text-gray-300 text-sm">Services ▼</a>
            <a href="#" className="hover:text-gray-300 text-sm">Pages ▼</a>
          </div>
          <button className="bg-primary-green text-black px-4 py-2 rounded-full hover:bg-green-300 transition text-sm md:px-6">
            Contact Us
          </button>
          <button className="md:hidden text-white p-2">☰</button>
        </nav>

        {/* Main content */}
        <div className="text-center z-30 px-4 py-16 md:px-16 md:py-48">
          <button className="mb-6 md:mb-8 bg-gray-800/50 text-white px-4 py-1 rounded-full border-gray-700 hover:bg-gray-700 transition text-sm md:text-base">
            <span className="text-primary-green mr-2">⚡</span> Connect. Engage. Grow
          </button>

          <h1 className="text-4xl font-medium mb-6 md:text-6xl md:mb-8 text-white">
            Your Trusted<br />Growth Marketing Catalyst
          </h1>

          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            ScaleX combines AI-driven insights with expert marketing solutions to drive exponential
            business growth, spanning all stages of business from idea to implementation.
          </p>

          <div className="space-x-4 mb-8 md:mb-12">
            <button className="bg-primary-green text-black px-4 py-2 rounded-full hover:bg-green-300 transition text-sm md:px-6 md:py-3">
              Schedule Call →
            </button>
            <button className="bg-transparent border-primary-green border-1 text-primary-green px-4 py-2 rounded-full hover:bg-primary-green/10 hover:text-black transition text-sm md:px-6 md:py-3">
              View Case Study
            </button>
          </div>

          <div className="flex items-center justify-center space-x-2 text-primary-green text-xs md:text-sm">
            <img src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" alt="dot" className="w-7 h-7 rounded-full bg-white" />
            <img src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="dot" className="w-7 h-7 -ml-4 rounded-full bg-white" />
            <img src="https://www.shutterstock.com/image-photo/young-handsome-man-beard-wearing-600nw-1768126784.jpg" alt="dot" className="w-7 h-7 -ml-4 rounded-full bg-white" />
            <span >★★★★★ <span className='text-white'>(4.9/5 Rating Stars)</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;