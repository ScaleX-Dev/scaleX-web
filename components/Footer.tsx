'use client'
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa"; // Import Font Awesome icons
import Link from "next/link";
import Image from "next/image";

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
          <Link href="/appointments" target="_blank">
            <button className="bg-black text-[15px] lg:text-[20px] text-primary-green py-5 px-5 md:px-12 rounded-full hover:bg-green-400 hover:text-black transition">
              Book A Free Call →
            </button>
          </Link>
        </div>
        <div className="bg-black">
          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 px-6 md:px-20">
            {/* ScaleX Column */}
            <div>
              <Image
                src="/favicon.ico"
                alt="ScaleX Logo"
                width={80}
                height={80}
                className="w-15 mb-4"
              />
              <p className="text-gray-300 mb-4">
                Address
                <br />
                Level 35, WTC Colombo, Sri Lanka
                <br />
                hello@scalex.global
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-300 hover:text-white">
                  <FaFacebookF />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white">
                  <FaTwitter />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white">
                  <FaLinkedinIn />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white">
                  <FaInstagram />
                </Link>
              </div>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-lg font-bold mb-4">Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-white">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help Center Column */}
            <div>
              <h3 className="text-lg font-bold mb-4">Help Center</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/appointments" className="hover:text-white">
                    Schedule a Meeting
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
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
