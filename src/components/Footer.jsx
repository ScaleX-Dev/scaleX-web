import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa"; // Import Font Awesome icons
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent opacity-50 z-10"></div>

      <div className="mx-auto z-20">
        {/* Top Section: "Ready to work with us?" */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-12 px-6 md:px-20">
          <h2 className="text-[50px] md:text-[80px] text-black font-semibold mb-4 text-center lg:text-left">
            Ready to work with us?
          </h2>
            <a href="/schedule" target="_blank" className="bg-black text-[15px] lg:text-[20px] text-primary-green py-5 px-5 md:px-12 rounded-full hover:bg-green-400 hover:text-black transition">
              Book A Free Call →
            </a>
        </div>
        <div className="bg-black">
          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 px-6 md:px-20">
            {/* ScaleX Column */}
            <div>
              <h3 className="text-lg font-bold mb-4">ScaleX</h3>
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
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    SEO Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Marketplace
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Google Analytics
                  </a>
                </li>
              </ul>
            </div>

            {/* Help Center Column */}
            <div>
              <h3 className="text-lg font-bold mb-4">Help Center</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
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
