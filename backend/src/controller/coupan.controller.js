import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Subscribe } from "../models/newsletter.model.js";

const router = express.Router();

// @route POST /api/coupon/validate
// @desc Validate a coupon code during checkout
// @access Public
const validateCoupan = asyncHandler(async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are required" });
    }

    const subscriber = await Subscribe.findOne({ email, code });

    if (!subscriber) {
      return res.status(404).json({ message: "Invalid coupon or email" });
    }

    if (subscriber.used) {
      return res.status(400).json({ message: "Coupon has already been used" });
    }

    // Mark as used
    subscriber.used = true;
    await subscriber.save();

    return res.status(200).json({
      message: "Coupon applied successfully! You got 10% discount.",
    });
  })

export default validateCoupan;
