import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address.";
    if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = "Phone number must start with 6/7/8/9 and be 10 digits.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // Simulate API call
    setTimeout(() => {
      alert("Your request has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form
    }, 1000); // Simulating a delay as if the request was sent successfully
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 py-16 px-4 sm:px-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 sm:p-12 max-w-4xl w-full text-gray-800 shadow-xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase mb-4 tracking-wider text-gray-900">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-light text-gray-600">
            Have a question, feedback, or just want to say hello? We're happy to hear from you.
          </p>
          <p className="mt-4 text-sm md:text-base font-medium text-gray-700">📧 contact@topnish.com</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
