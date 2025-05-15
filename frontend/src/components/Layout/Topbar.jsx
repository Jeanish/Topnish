import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { SiAmazon } from "react-icons/si";
import { SiFlipkart } from "react-icons/si";

function Topbar() {
  return (
    <div className="bg-[#1E3A8A] text-white py-3 text-sm fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 overflow-x-auto whitespace-nowrap">
        
        {/* Social Icons - Only on medium and bigger screens */}
        <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
          <a href="#" className="hover:text-gray-300 transition duration-200">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/topnish.store/?igsh=MXc4OWtodzU1N25jeQ%3D%3D#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition duration-200"
          >
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300 transition duration-200">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>

        {/* Announcement */}
        <div className="flex items-center gap-2 text-center flex-shrink-0">
          <span>We’re also available on</span>
          <a
            href="https://www.amazon.in/l/27943762031?me=A2956HI9CG4PR&ref_=ssf_share"
            target="_blank"
            className="flex items-center gap-1 hover:text-gray-300 transition duration-200"
          >
            <SiAmazon className="h-4 w-4" />
            <span>Amazon</span>
          </a>
          <span>and</span>
          <a
            href="#"
            className="flex items-center gap-1 hover:text-gray-300 transition duration-200"
          >
            <SiFlipkart className="h-4 w-4" />
            <span>Flipkart</span>
          </a>
          <span>!</span>
        </div>

        {/* Contact Mail */}
        <div className="hidden md:block flex-shrink-0">
          <a
            href="mailto:contact@topnish.com"
            className="hover:text-gray-300 transition duration-200"
          >
            contact@topnish.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
