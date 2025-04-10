import express from "express";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";

// @route POST /api/product
// @desc Create a new Product

const addProduct = asyncHandler(async (req, res) => {
  try {
    const {
        name,
        description,
        price,
        discountPrice,  // Fixed key
        countInStock,
        category,
        colors,
        collections,
        images,
        isFeatured,
        isPublished,
        sizes,
        tags,
        dimensions,
        sku,
    } = req.body;

    // Validate required fields
    if (!name || !description || !category || !sku) {
        throw new ApiError(400, "Name, description, category, and SKU are required.");
    }

    if (!price || typeof price !== "number") {
        throw new ApiError(400, "Valid price is required.");
    }

    if (!discountPrice || typeof discountPrice !== "number") {
        throw new ApiError(400, "Valid discountPrice is required.");
    }

    if (!countInStock || typeof countInStock !== "number") {
        throw new ApiError(400, "Valid countInStock is required.");
    }

    if (!Array.isArray(colors) || colors.length === 0) {
        throw new ApiError(400, "At least one color is required.");
    }

    if (!Array.isArray(sizes) || sizes.length === 0) {
        throw new ApiError(400, "At least one size is required.");
    }

    if (!Array.isArray(images) || images.length === 0) {
        throw new ApiError(400, "At least one image is required.");
    }

    if (!collections || typeof collections !== "string") {
        throw new ApiError(400, "Valid collections field is required.");
    }

    if (!tags || !Array.isArray(tags)) {
        throw new ApiError(400, "Tags must be an array.");
    }

    if (!dimensions || typeof dimensions !== "object" || 
        !("length" in dimensions) || !("width" in dimensions) || !("height" in dimensions)) {
        throw new ApiError(400, "Valid dimensions (length, width, height) are required.");
    }

    // Create product
    const product = await Product.create({
        name,
        description,
        price,
        discountPrice,  // Fixed key
        countInStock,
        category,
        colors,
        collections,
        images,
        isFeatured: isFeatured ?? false,  // Default false
        isPublished: isPublished ?? false,  // Default false
        sizes,
        tags,
        dimensions,
        sku,
        users: req.user._id  // Ensure user is attached
    });

    if (!product) {
        throw new ApiError(400, "Failed to create product.");
    }

    res.status(201).json(new ApiResponse(201, product, "Product added successfully."));

} catch (error) {
    console.error("Product creation error:", error);
    res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message || "Server Error"));
}

});

const updateproduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,  // Fixed key
      countInStock,
      category,
      colors,
      collections,
      images,
      isFeatured,
      isPublished,
      sizes,
      tags,
      dimensions,
      sku,
  } = req.body;
  

  // Find the product By ID
  const product = await Product.findById(req.params.id);

  if(product){
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.images = images || product.images;
    product.collections = collections || product.collections;
    product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
    product.discountPrice = discountPrice || product.discountPrice;
    product.countInStock = countInStock || product.countInStock;
    product.tags = tags || product.tags;
    product.sku = sku || product.sku;
    product.dimensions = dimensions || product.dimensions;
  
    const updatedProduct = await product.save();
    res.json(updatedProduct)

  }else{
    res.status(404).json({ message: "Product not found"})
  }} catch (error) {
    console.error(error);
    throw new ApiError(500, "Server Error");
    
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if(product){
      await product.deleteOne();
      res.json({message:"Product removed"})
    }else{
      throw new ApiError(404, "Product is not found");
    }
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Server error");
  }
});

const latestProduct = asyncHandler(async (req, res) => {
 try {  

  const newArrivals = await Product.find().sort({ createdAt:-1 }).limit(8);

  res.json(newArrivals);
  
 } catch (error) {
  console.error(error);
  throw new ApiError(500, "Server Error"); 
 }
});

const similarProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.category) {
      return res.status(404).json({ message: "Product or category not found" });
    }

    console.log("Finding similar for category:", product.category);

    const similar = await Product.find({
      _id: { $ne: product._id },
      category: { $regex: product.category, $options: "i" },
    }).limit(4);

    if (!similar.length) {
      return res.status(200).json([]);
    }

    res.json(similar);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res.status(500).json({ message: "Server error" });
  }
});



const singleProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Server Error");
  }
});


const getPublicProducts = async (req, res) => {
  try {
      const { collection, sort } = req.query;

      let filter = {};
      if (collection) {
          filter.collection = collection;
      }

      let sortOptions = {};
      if (sort === 'price_asc') sortOptions.price = 1;
      if (sort === 'price_desc') sortOptions.price = -1;

      const products = await Product.find(filter).sort(sortOptions);
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get the top-selling product

const getRandomBestSeller = asyncHandler(async (req, res) => {
  console.log("Random bestseller route hit");

  const publishedCount = await Product.countDocuments({ isPublished: true });
  console.log("Published products count:", publishedCount);

  const [randomProduct] = await Product.aggregate([
    { $match: { isPublished: true } },
    { $sample: { size: 1 } }
  ]);

  if (!randomProduct) {
    res.status(404).json({ message: "No published product found" });
    return;
  }

  res.status(200).json(randomProduct);
});






export {singleProductById ,addProduct,updateproduct,deleteProduct,latestProduct, similarProduct, getPublicProducts, getRandomBestSeller}