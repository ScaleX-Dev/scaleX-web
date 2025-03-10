import React from "react";

const BlogSection = () => {
  return (
    <section className="py-16 px-8 md:px-20 bg-gradient-to-b from-white to-green-100">
      <div className="mx-auto text-left">
        <div className="flex flex-col lg:flex-row">
          <div>
            <h2 className="lg:text-[48px] text-[35px] font-medium mb-4 text-black">
              Digital Marketing & SEO Services That Grow Traffic & Increase
              Revenue
            </h2>
          </div>
          <div>
            <p className="text-gray-500 mt-3 mb-8">
              We are the top digital marketing agency for branding corp. We
              offer a full range of services to help clients improve their
              search engine rankings and drive more traffic to their websites.
            </p>
            <button className="bg-primary-green text-black px-6 py-2 rounded-full hover:bg-green-300 transition border-1 border-black">
              See more
            </button>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Card 1 */}
          <div className="bg-black rounded-2xl p-6 relative overflow-hidden">
            {/* Top section for the dot and text */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-primary-green w-3 h-3 rounded-full mr-2"></div>
                <p className="text-gray-400 text-sm">5 min read</p>
              </div>
            </div>

            {/* Main title */}
            <h3 className="text-[26px] font-medium mb-4 text-white">
              How a Digital Marketing Agency Can Boost Your Business
            </h3>

            {/* Content and button */}
            <div className="flex flex-col md:flex-row items-end justify-between mb-4">
              {/* Paragraph with 70% width */}
              <p className="text-gray-400 w-full md:w-[70%]">
                We are the top digital marketing agency for branding corp. We
                offer a full range of services to help improve search engine
                rankings...
              </p>

              {/* Button with 30% width */}
              <button className="bg-white text-black px-4 py-3 border-black border-1 rounded-full hover:bg-gray-200 transition w-[20%] mt-4 md:mt-0">
                →
              </button>
            </div>
          </div>

          {/* Card 2 (Applying first card styles) */}
          <div className="bg-gray-100 rounded-2xl p-6 relative overflow-hidden">
            {/* Top section for the dot and text */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-primary-green w-3 h-3 rounded-full mr-2"></div>
                <p className="text-gray-400 text-sm">5 min read</p>
              </div>
            </div>

            {/* Main title */}
            <h3 className="text-[26px] font-medium mb-4 text-black">
              The Latest Trends and Strategies with a Digital Marketing Agency
            </h3>

            {/* Content and button */}
            <div className="flex flex-col md:flex-row items-end justify-between mb-4">
              {/* Paragraph with 70% width */}
              <p className="text-black w-full md:w-[70%]">
                Working with this digital marketing agency has been a true
                partnership. They have taken our online presence to the next
                level...
              </p>

              {/* Button with 30% width */}
              <button className="bg-white text-black px-4 py-3 border-black border-1 rounded-full hover:bg-gray-200 transition w-[20%] mt-4 md:mt-0">
                →
              </button>
            </div>
          </div>

          {/* Card 3 (Applying first card styles) */}
          <div className="bg-black rounded-2xl p-6 relative overflow-hidden">
            {/* Top section for the dot and text */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-primary-green w-3 h-3 rounded-full mr-2"></div>
                <p className="text-gray-400 text-sm">5 min read</p>
              </div>
            </div>

            {/* Main title */}
            <h3 className="text-[26px] font-medium mb-4 text-white">
              Maximizing ROI with the Expertise of a Digital Marketing Agency
            </h3>

            {/* Content and button */}
            <div className="flex flex-col md:flex-row items-end justify-between mb-4">
              {/* Paragraph with 70% width */}
              <p className="text-gray-300 w-full md:w-[70%]">
                What sets this digital marketing agency apart is their
                commitment to transparency and delivering measurable results...
              </p>

              {/* Button with 30% width */}
              <button className="bg-primary-green text-black px-4 py-3 border-black border-1 rounded-full hover:bg-green-300 transition w-[20%] mt-4 md:mt-0">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
