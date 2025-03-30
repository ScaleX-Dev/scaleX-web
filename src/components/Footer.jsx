import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa"; // Import Font Awesome icons
import Icon from "../assets/icon.png"; 

const Footer = () => {
  return (
    <footer className="text-white relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-50 -z-10"></div>

      <div className="mx-auto z-20">
        {/* Top Section: "Ready to work with us?" */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-12 px-6 md:px-20">
          <h2 className="text-[50px] md:text-[80px] text-black font-semibold mb-4 text-center lg:text-left">
            Ready to work with us?
          </h2>
          <a href="/appointments" target="_blank">
            <button className="bg-black text-[15px] lg:text-[20px] text-primary-green py-5 px-5 md:px-12 rounded-full hover:bg-green-400 hover:text-black transition">
              Book A Free Call →
            </button>
          </a>
        </div>
        <div className="bg-black">
          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 px-6 md:px-20">
            {/* ScaleX Column */}
            <div>
              <img
                src={Icon}
                alt="ScaleX Logo"
                className="w-15 mb-4"
              />
              <p className="text-gray-300 mb-4">
                Address
                <br />
                Street Dahlia Number 06, Malang, Indonesia, 64182
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaTwitter />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-lg font-bold mb-4">Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="/" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="/projects" className="hover:text-white">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white">
                    Blogs
                  </a>
                </li>
              </ul>
            </div>

            {/* Help Center Column */}
            <div>
              <h3 className="text-lg font-bold mb-4">Help Center</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/appointments" className="hover:text-white">
                    Schedule a Meeting
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
