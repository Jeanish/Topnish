import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/slices/AdminProductSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    countInStock: "",
    category: "",
    sku: "",
    colors: ["Black"],
    sizes: ["M"],
    collections: "",
    tags: ["casual"],
    images: [],
    isFeatured: false,
    isPublished: true,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.dimensions) {
      setFormData({
        ...formData,
        dimensions: {
          ...formData.dimensions,
          [name]: value,
        },
      });
    } else if (["colors", "sizes", "tags"].includes(name)) {
      setFormData({
        ...formData,
        [name]: value.split(",").map((v) => v.trim()),
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/upload`,
        data
      );
      const imageUrl = response.data.imageUrl;

      setFormData({
        ...formData,
        images: [...formData.images, { url: imageUrl, altText: file.name }],
      });

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      discountPrice: Number(formData.discountPrice),
      countInStock: Number(formData.countInStock),
      dimensions: {
        length: Number(formData.dimensions.length),
        width: Number(formData.dimensions.width),
        height: Number(formData.dimensions.height),
      },
    };

    try {
      await dispatch(createProduct(productData)).unwrap();
      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("Create product error:", err);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <input
          type="number"
          name="discountPrice"
          placeholder="Discount Price"
          value={formData.discountPrice}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <input
          type="number"
          name="countInStock"
          placeholder="Count in Stock"
          value={formData.countInStock}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <input
          type="text"
          name="collections"
          placeholder="Collections"
          value={formData.collections}
          onChange={handleChange}
          className="p-2 border"
          required
        />

        {/* Colors */}
        <input
          type="text"
          name="colors"
          placeholder="Colors (comma separated)"
          value={formData.colors.join(", ")}
          onChange={handleChange}
          className="p-2 border"
          required
        />

        {/* Sizes */}
        <input
          type="text"
          name="sizes"
          placeholder="Sizes (comma separated)"
          value={formData.sizes.join(", ")}
          onChange={handleChange}
          className="p-2 border"
          required
        />

        {/* Tags */}
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags.join(", ")}
          onChange={handleChange}
          className="p-2 border"
        />

        {/* Image Upload */}
        <input
          type="file"
          onChange={handleImageUpload}
          className="p-2 border"
          accept="image/*"
        />
        {uploading && <p>Uploading image...</p>}

        {formData.images.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {formData.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText}
                className="w-24 h-24 object-cover border"
              />
            ))}
          </div>
        )}

        {/* Checkboxes */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            Featured
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            Published
          </label>
        </div>

        {/* Dimensions */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="length" className="block font-medium mb-1">
              Length (cm)
            </label>
            <input
              type="number"
              name="length"
              value={formData.dimensions.length}
              onChange={handleChange}
              placeholder="e.g. 30"
              className="p-2 border w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="width" className="block font-medium mb-1">
              Width (cm)
            </label>
            <input
              type="number"
              name="width"
              value={formData.dimensions.width}
              onChange={handleChange}
              placeholder="e.g. 20"
              className="p-2 border w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="height" className="block font-medium mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.dimensions.height}
              onChange={handleChange}
              placeholder="e.g. 15"
              className="p-2 border w-full"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
