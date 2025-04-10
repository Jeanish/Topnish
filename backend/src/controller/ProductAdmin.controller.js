import express from "express"
import { Product } from "../models/product.model.js"
import { verifyJWT,admin } from "../middleware/auth.middleware.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// @route GET /api/admin/products
// @desc Get all products (Adminn only)

// Example for getAllProducts controller
const getAllProducts = async (req, res, next) => {
    try {
      const { sortBy, ...filters } = req.query;
  
      // Optional: build filters for category, brand, etc.
      let query = {};
  
      // Add any custom filtering logic here based on filters (e.g., category, price range, etc.)
      // Example: if (filters.category) query.category = filters.category;
  
      // Sorting logic
      let sortOption = {};
  
      if (sortBy === "priceAsc") {
        sortOption.price = 1;
      } else if (sortBy === "priceDesc") {
        sortOption.price = -1;
      } else if (sortBy === "popularity") {
        sortOption.sales = -1; // Replace `sales` with whatever metric you track popularity with
      }
  
      const products = await Product.find(query).sort(sortOption);
  
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };
  

export { getAllProducts}