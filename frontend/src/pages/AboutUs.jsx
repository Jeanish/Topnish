import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-br from-white via-blue-50 to-slate-100 py-16 px-4 sm:px-8">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto text-center text-gray-800 shadow-2xl space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide text-gray-900 drop-shadow"
        >
          About Topnish
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg font-light opacity-90 leading-relaxed"
        >
          Welcome to Topnish — where fashion meets affordability without cutting corners on quality.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg font-light opacity-90 leading-relaxed"
        >
          We believe style should be bold, comfortable, and affordable. Our 100% pure cotton garments deliver trend-forward looks without compromising on comfort or quality.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg font-light opacity-90 leading-relaxed"
        >
          From everyday essentials to standout pieces, our mission is to make high-quality fashion accessible to all. And with our premium packaging, every order feels like a gift.
        </motion.p>
      </div>
    </section>
  );
}
