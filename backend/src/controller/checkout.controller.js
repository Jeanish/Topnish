import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.utils.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { CheckOut } from "../models/checkout.model.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Cart } from "../models/cart.model.js";
import {
  getShiprocketToken,
  createShiprocketOrder,
} from "../utils/shiprocket.service.js";
import axios from "axios";

const checkOutSession = asyncHandler(async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice, phone } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    throw new ApiError(400, "No items in checkout");
  }

  try {
    const newCheckout = await CheckOut.create({
      user: req.user._id,
      checkOutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus:
        paymentMethod === "Cash On Delivery" ? "COD Pending" : "Pending",
      isPaid: paymentMethod === "Cash On Delivery" ? false : true,
      phone: phone,
    });

    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new ApiError(500, "Server error");
  }
});

const finalizeCheckout = asyncHandler(async (req, res) => {
  const checkout = await CheckOut.findById(req.params.id).populate("user");

  if (!checkout) {
    throw new ApiError(404, "Checkout not found");
  }

  const isCOD = checkout.paymentMethod?.toLowerCase() === "cash on delivery";

  if (checkout.isFinalized) {
    throw new ApiError(400, "Checkout already finalized");
  }

  if (!isCOD && !checkout.isPaid) {
    throw new ApiError(400, "Checkout is not paid or invalid payment method");
  }

  const finalOrder = await Order.create({
    user: checkout.user._id,
    orderItems: checkout.checkOutItems,
    shippingAddress: checkout.shippingAddress,
    paymentMethod: checkout.paymentMethod,
    totalPrice: checkout.totalPrice,
    isPaid: isCOD ? false : true,
    paidAt: isCOD ? null : checkout.paidAt,
    isDelivered: false,
    paymentStatus: isCOD ? "COD Pending" : "Paid",
    paymentDetails: checkout.paymentDetails,
  });

  checkout.isFinalized = true;
  checkout.finalizedAt = Date.now();
  await checkout.save();

  // Clear user's cart
  await Cart.findOneAndDelete({ user: checkout.user._id });

  // === Shiprocket Integration Starts ===
  let shiprocketResponse = null;

  try {
    const token = await getShiprocketToken();

    const shipmentPayload = {
      order_id: finalOrder._id.toString(),
      order_date: new Date().toISOString().slice(0, 10),
      pickup_location: "Home", // Must match your Shiprocket dashboard location
      billing_customer_name:
        checkout.shippingAddress.name || checkout.user.name || "Customer",
      billing_last_name: "",
      billing_address: checkout.shippingAddress.address,
      billing_city: checkout.shippingAddress.city,
      billing_pincode: checkout.shippingAddress.postalCode,
      billing_state: "Gujarat",
      billing_country: checkout.shippingAddress.country,
      billing_email: checkout.user.email,
      billing_phone: checkout.shippingAddress.phone || "9081226874",

      shipping_customer_name:
        checkout.shippingAddress.name || checkout.user.name || "Customer",
      shipping_last_name: "",
      shipping_address: checkout.shippingAddress.address,
      shipping_city: checkout.shippingAddress.city,
      shipping_pincode: checkout.shippingAddress.postalCode,
      shipping_state: "Gujarat",
      shipping_country: checkout.shippingAddress.country,
      shipping_email: checkout.user.email,
      shipping_phone: checkout.shippingAddress.phone || "9081226874",

      shipping_is_billing: true,

      order_items: finalOrder.orderItems.map((item) => ({
        name: item.name,
        sku: item.productId.toString(),
        units: item.quantity,
        selling_price: item.price,
        hsn: "640351",
      })),

      payment_method: isCOD ? "COD" : "Prepaid",
      sub_total: finalOrder.totalPrice,
      length: 10,
      breadth: 10,
      height: 10,
      weight: 1,
    };

    const shipmentRes = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      shipmentPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    shiprocketResponse = shipmentRes.data;
    console.log("📦 Shiprocket order created:", shiprocketResponse);
  } catch (shipErr) {
    console.error("❌ Shiprocket Error:", shipErr?.response?.data || shipErr.message);
  }
  // === Shiprocket Integration Ends ===

  res.status(201).json({
    message: "Order finalized successfully",
    order: finalOrder,
    shiprocket: shiprocketResponse || "Shiprocket shipment failed",
  });
});


const payment = asyncHandler(async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await CheckOut.findById(req.params.id);

    if (!checkout) {
      throw new ApiError(404, "Checkout not found");
    }

    if (
      checkout.paymentMethod.toLowerCase() === "cash on delivery" &&
      !checkout.isPaid
    ) {
      checkout.isPaid = false;
      checkout.paymentStatus = "COD Pending";
      checkout.paymentDetails = paymentDetails || {
        method: "Cash On Delivery",
      };

      await checkout.save();

      return res.status(200).json({
        message: "COD initiated successfully",
        checkout,
      });
    }

    throw new ApiError(400, "Invalid payment method or already paid");
  } catch (error) {
    console.error(error);
    throw new ApiError(500, error.message || "Server error");
  }
});

export { checkOutSession, finalizeCheckout, payment };
