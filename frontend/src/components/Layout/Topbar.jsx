import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

function Topbar() {
  return (
    <div className="bg-[#1E3A8A] text-white py-4 text-m">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-3">
          <a href="#" className="hover:text-gray-300 transition duration-200">
            <TbBrandMeta className="h-4 w-4" />
          </a>
          <a href="https://www.instagram.com/topnish.store/?igsh=MXc4OWtodzU1N25jeQ%3D%3D#" target="_blank" className="hover:text-gray-300 transition duration-200">
            <IoLogoInstagram className="h-4 w-4" />
          </a>
          <a href="#" className="hover:text-gray-300 transition duration-200">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>

        {/* Announcement */}
        <div className="text-center flex-grow font-medium tracking-wide">
          <span>We’re also available on 
          <a href="#" className="hover:text-gray-300 transition duration-200">
             {" "}Amazon
          </a> 
            <span> and </span>
            <a href="#" className="hover:text-gray-300 transition duration-200">
             {" "}Flipkart
          </a> 
            !</span>
        </div>

        {/* Contact Number (Hidden on Small Screens) */}
        <div className="hidden md:block">
          <a href="tel:+911234567890" className="hover:text-gray-300 transition duration-200">
            contact@topnish.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
