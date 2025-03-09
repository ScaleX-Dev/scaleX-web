import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#646464] to-[#00ff81] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <Navbar />
      <div className="text-gray-900 mt-20">
        {/* Introduction Section */}
        <section className="pt-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-semibold mb-4">
              We Love playing with Data & Creativity
            </h2>
            <p className="text-lg max-w-5xl mx-auto">
              At Scalex, our journey began with a group of college freelancers.
              Since then, we've grown our business, expanded our team, and
              diversified our portfolio. Central to our evolution has been our
              unwavering passion for data and creativity, empowering us to solve
              problems for our clients in our sleep.
            </p>
          </div>
        </section>
      </div>

      {/* Features */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="aspect-w-16 aspect-h-7">
          <img
            className="w-full object-cover rounded-xl h-60"
            src="https://images.unsplash.com/photo-1624571409412-1f253e1ecc89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            alt="Features Image"
          />
        </div>

        {/* Grid */}
        <div className="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <h2 className="font-bold text-2xl md:text-3xl text-gray-800">
              We conquer the marketing hurdles start-ups face
            </h2>
            <p className="mt-2 md:mt-4 text-gray-500">
              Beyond partnering with start-ups to boost their digital presence,
              we’ve crafted innovative solutions for common marketing challenges
              we’ve encountered across diverse campaigns and projects.
            </p>
          </div>
          {/* End Col */}

          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
              {/* Icon Block */}
              <div className="flex gap-x-5">
                <svg
                  className="shrink-0 mt-1 size-6 text-primary-green"
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
                  <rect width="18" height="10" x="3" y="11" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4" />
                  <line x1="8" x2="8" y1="16" y2="16" />
                  <line x1="16" x2="16" y1="16" y2="16" />
                </svg>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Strategic visionaries
                  </h3>
                  <p className="mt-1 text-gray-600">
                    We handpick our teams with precision. Our experts are the
                    driving force behind breakthrough marketing success.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}

              {/* Icon Block */}
              <div className="flex gap-x-5">
                <svg
                  className="shrink-0 mt-1 size-6 text-primary-green"
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
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Cost-effective and seamless
                  </h3>
                  <p className="mt-1 text-gray-600">
                    From ad campaigns to social media tools, there’s virtually
                    no marketing need you can’t manage with ease using our
                    services at MarketPulse.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}

              {/* Icon Block */}
              <div className="flex gap-x-5">
                <svg
                  className="shrink-0 mt-1 size-6 text-primary-green"
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
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Cutting-edge marketing insights
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Our comprehensive guides and robust resource kits provide
                    everything a business needs to launch and optimize a
                    powerful digital strategy.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}

              {/* Icon Block */}
              <div className="flex gap-x-5">
                <svg
                  className="shrink-0 mt-1 size-6 text-primary-green"
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Crafting user-centric campaigns
                  </h3>
                  <p className="mt-1 text-gray-600">
                    We relentlessly pursue the perfect harmony between
                    data-driven results and creative design, delivering engaging
                    and impactful marketing experiences.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Features */}

      {/* Team */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            Our leadership
          </h2>
        </div>
        {/* End Title */}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center">
            <img
              className="rounded-xl sm:size-48 lg:size-60 mx-auto"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
              alt="Avatar"
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg">
                David Forren
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                Founder / CEO
              </p>
            </div>
          </div>
          {/* End Col */}

          <div className="text-center">
            <img
              className="rounded-xl sm:size-48 lg:size-60 mx-auto"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
              alt="Avatar"
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg">
                Amil Evara
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                UI/UX Designer
              </p>
            </div>
          </div>
          {/* End Col */}

          <div className="text-center">
            <img
              className="rounded-xl sm:size-48 lg:size-60 mx-auto"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
              alt="Avatar"
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg">
                Ebele Egbuna
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                Support Consultant
              </p>
            </div>
          </div>
          {/* End Col */}

          <div className="text-center">
            <img
              className="rounded-xl sm:size-48 lg:size-60 mx-auto"
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
              alt="Avatar"
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg">
                Maria Powers
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                Director of sales
              </p>
            </div>
          </div>
          {/* End Col */}

          <div className="text-center">
            <img
              className="rounded-xl sm:size-48 lg:size-60 mx-auto"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
              alt="Avatar"
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg">
                Delia Pawelke
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                Front-end Developer
              </p>
            </div>
          </div>
          {/* End Col */}

          <div className="text-center">
            <img
              className="rounded-xl sm:size-48 lg:size-60 mx-auto"
              src="https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
              alt="Avatar"
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg">
                Tom Lowry
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
                UI/UX Designer
              </p>
            </div>
          </div>
        </div>
        {/* End Grid */}
      </div>
      {/* End Team */}

      <Footer />
    </div>
  );
};

export default AboutUs;
