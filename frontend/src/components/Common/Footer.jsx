import React from 'react';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXFill } from 'react-icons/ri';
import { TbBrandMeta } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { FiMail } from "react-icons/fi";

function Footer() {
  return (
    <footer className="border-t py-12 bg-gray-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 lg:px-0">
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h3>
          <p className="text-gray-600 mb-3">
            Be the first to hear about new products, exclusive events, and online offers.
          </p>
          <p className="font-medium text-sm text-gray-700 mb-6">
            Sign up and get <span className="text-red-500 font-bold">10% OFF</span> your first order.
          </p>

          <form className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-5 text-sm font-semibold hover:bg-gray-700 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Products</h3>
          <ul className="space-y-3 text-gray-700">
            <li><Link to="#" className="hover:text-gray-900 transition-colors">New Arrivals</Link></li>
            <li><Link to="#" className="hover:text-gray-900 transition-colors">Best Sellers</Link></li>
          </ul>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shop</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              <Link to="#" className="hover:text-gray-900 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-900 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-900 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-900 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-5 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-all text-2xl"
            >
              <TbBrandMeta />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-pink-500 transition-all text-2xl"
            >
              <IoLogoInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-all text-2xl"
            >
              <RiTwitterXFill />
            </a>
          </div>
          <p className="text-gray-600 font-medium">Support Mail</p>
          <p className="text-gray-800 font-semibold text-lg flex items-center mt-2">
            <FiMail className="mr-2" /> support@topnish.com
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 px-6 lg:px-0 border-t border-gray-200 pt-6 text-center">
        <p className="text-gray-600 text-sm tracking-tighter">
          © 2025, <span className="font-semibold">Topnish</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
