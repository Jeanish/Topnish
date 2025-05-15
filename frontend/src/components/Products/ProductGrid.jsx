import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductGrid({ products = [], loading, error }) {
  if (loading) {
    return <p className="text-center text-lg font-medium">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 font-medium">Error: {error}</p>;
  }

  if (!Array.isArray(products)) {
    console.warn("⚠️ Expected products to be an array but got:", products);
    return <p className="text-center text-gray-500">No products found</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-6">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="group bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
        >
          <div className="w-full h-48 overflow-hidden rounded-xl mb-4 bg-gray-100">
  <img
    src={product.images?.[0]?.url}
    alt={product.images?.[0]?.altText || product.name}
    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
  />
</div>

          <div className="px-1">
            <h3 className="text-base font-semibold text-gray-800 group-hover:text-black transition">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">₹{product.discountPrice}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductGrid