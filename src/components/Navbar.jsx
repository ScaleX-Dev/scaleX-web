import { useState } from "react";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 pt-5 justify-center items-center z-100">
      <div className="flex justify-center items-center z-100">
        <div className="flex shadow-2xl bg-[#FAFAFA] rounded-full py-3 px-6 justify-between items-center w-7/10 max-w-screen-lg">
          <a href="/">
            <img src={Logo} alt="Logo" className="w-20" />
            {/* <h1 className="text-primary-green text-2xl font-bold bg-black rounded-full px-4">
            </h1> */}
          </a>

          {/* Desktop Nav */}
          <div className="hidden 900:flex space-x-6">
            <a
              href="/"
              className="hover:text-gray-300 text-sm font-regular text-black"
            >
              Home
            </a>
            <a
              href="/about"
              className="hover:text-gray-300 text-sm font-regular text-black"
            >
              Who We Are?
            </a>
            <a
              href="/projects"
              className="hover:text-gray-300 text-sm font-regular text-black"
            >
              Projects
            </a>
            <a
              href="/blogs"
              className="hover:text-gray-300 text-sm font-regular text-black"
            >
              Blogs
            </a>
          </div>

          {/* Contact Button & Mobile Menu Button */}
          <div>
            <a
              href="/contact"
              className="bg-primary-green text-black px-4 py-2 rounded-full hover:bg-green-300 transition text-sm md:px-6 hidden sm:inline"
            >
              Contact Us
            </a>
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="900:hidden text-black p-2 transition-transform duration-300"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Slide & Fade Effect */}
      <div
        className={`md:hidden fixed top-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[320px] rounded-4xl bg-white shadow-md transition-all duration-200 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-4 w-full bg-white rounded-lg">
          <a
            href="/"
            className="text-black text-sm font-medium hover:text-gray-500"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-black text-sm font-medium hover:text-gray-500"
          >
            Who We Are?
          </a>
          <a
            href="/projects"
            className="text-black text-sm font-medium hover:text-gray-500"
          >
            Projects
          </a>
          <a
            href="/blogs"
            className="text-black text-sm font-medium hover:text-gray-500"
          >
            Blogs
          </a>
          <a
            href="/contact"
            className="bg-primary-green text-black px-4 py-2 rounded-full hover:bg-green-300 transition text-sm"
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
