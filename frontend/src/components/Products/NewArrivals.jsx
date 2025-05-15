import React, { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

function NewArrivals() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/products/new-arrivals`);
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-8 select-none">
  <div className="container mx-auto text-center mb-10 relative">
    <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
    <p className="text-lg text-gray-600 mb-8">
      Discover the latest styles straight off the runway, freshly added to keep your wardrobe on point.
    </p>

    {/* Scroll buttons */}
    <div className="relative mb-4 sm:mb-0">
      <div className="absolute right-2 top-[-29px] sm:top-1/2 sm:-translate-y-1/2 flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2 z-10">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`p-3 rounded-full bg-white/60 backdrop-blur-md shadow-md border border-gray-200 hover:bg-white hover:shadow-lg transition active:scale-95 ${
            !canScrollLeft ? "opacity-30 cursor-not-allowed" : "opacity-100"
          }`}
        >
          <FiChevronLeft className="text-2xl text-gray-700" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`p-3 rounded-full bg-white/60 backdrop-blur-md shadow-md border border-gray-200 hover:bg-white hover:shadow-lg transition active:scale-95 ${
            !canScrollRight ? "opacity-30 cursor-not-allowed" : "opacity-100"
          }`}
        >
          <FiChevronRight className="text-2xl text-gray-700" />
        </button>
      </div>
    </div>
  </div>

  {/* Scrollable Product Cards */}
  <div
    ref={scrollRef}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUpOrLeave}
    onMouseLeave={handleMouseUpOrLeave}
    className={`container mx-auto flex overflow-x-auto space-x-6 px-2 lg:px-0 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
  >
    {newArrivals.map((product) => (
      <div
        key={product._id}
        className="min-w-[260px] sm:min-w-[300px] lg:min-w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden relative group transition hover:shadow-xl"
      >
        {/* Updated Image */}
        <img
          src={product.images[0]?.url}
          alt={product.images[0]?.altText || product.name}
          className="w-full h-[300px] sm:h-[350px] object-cover group-hover:scale-105 transition-transform duration-300"
          draggable="false"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white px-4 py-3 backdrop-blur-sm">
          <Link to={`/product/${product._id}`}>
            <h4 className="text-lg font-semibold group-hover:underline">{product.name}</h4>
            <p className="text-sm mt-1">₹{product.discountPrice}</p>
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>

  );
}

export default NewArrivals;
