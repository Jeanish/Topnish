import React from "react";
import { Link } from "react-router-dom";

function ProductGrid({ products = [], loading, error }) {
  if (loading) {
    return <p className="text-center text-lg font-medium">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 font-medium">Error: {error}</p>
    );
  }

  if (!Array.isArray(products)) {
    console.warn("⚠️ Expected products to be an array but got:", products);
    return <p className="text-center text-gray-500">No products found</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-6">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >
          <div className="w-full aspect-[4/5] bg-gray-100">
            <img
              src={product.images?.[0]?.url}
              alt={product.images?.[0]?.altText || product.name}
              className="w-full h-full object-cover rounded-t-2xl"
              loading="lazy"
              draggable="false"
            />
          </div>

          <div className="p-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 truncate">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600">₹{product.discountPrice}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductGrid;
