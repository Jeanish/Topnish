import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { ApiError } from "../utils/apiError.utils.js";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      console.log("➡️ Uploading file of size:", req.file.size);
      console.log("➡️ Uploading file type:", req.file.mimetype);
  
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          resource_type: "image",
          use_filename: true,
          unique_filename: false,
          overwrite: true,
          transformation: [
            { quality: "auto", fetch_format: "auto" } // 🔥 Optimize quality and format
          ]
        }
      );
      
      console.log("✅ File uploaded successfully:", result);
  
      res.json({ imageUrl: result.secure_url });
    } catch (error) {
      console.error("❌ Error during upload:", error);
      // ⛔️ Don't throw, just respond
      res.status(500).json({
        message: error.message || "Image upload failed",
        success: false,
      });
    }
  });
  

export default router;
