import React from "react";
import heroImg from "../../assets/Hero-section.webp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

export default function Hero() {
  return (
    <section className="relative w-full">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Topnish"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />

      {/* Overlay with Animated Text */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="text-center text-white p-6 max-w-[90%] md:max-w-2xl">
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-8xl font-extrabold uppercase tracking-wide drop-shadow-md mb-4"
          >
            Vacation <br /> Ready
          </motion.h1>

          {/* Subtitle Text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl font-light tracking-wide opacity-90 mb-6"
          >
            Explore our vacation-ready outfits with fast worldwide shipping.
          </motion.p>

          {/* Animated CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            <Link
              to="/collections/all"
              className="bg-white text-gray-900 px-6 py-3 text-lg font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-gray-200 hover:scale-105"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
