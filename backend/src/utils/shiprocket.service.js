import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL; // Set in .env
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD; // Set in .env

let shiprocketToken = null;

export const authenticateWithShiprocket = async () => {
  try {
    const response = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", {
      email: SHIPROCKET_EMAIL,
      password: SHIPROCKET_PASSWORD,
    });

    shiprocketToken = response.data.token;
    return shiprocketToken;
  } catch (error) {
    console.error("Shiprocket Auth Error:", error.response?.data || error.message);
    throw new Error("Failed to authenticate with Shiprocket");
  }
};

export const getShiprocketToken = async () => {
  if (!shiprocketToken) {
    return await authenticateWithShiprocket();
  }
  return shiprocketToken;
};


export const createShiprocketOrder = async (order, token) => {
  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      {
        order_id: order._id,
        order_date: new Date(order.createdAt).toISOString().slice(0, 10),
        pickup_location: "home",
        billing_customer_name: order.user.name,
        billing_last_name: "",
        billing_address: order.shippingAddress.address,
        billing_city: order.shippingAddress.city,
        billing_pincode: order.shippingAddress.postalCode,
        billing_state: order.shippingAddress.state || "Delhi",
        billing_country: order.shippingAddress.country,
        billing_email: order.user.email,
        billing_phone: order.user.phone || "9999999999", // fallback phone
        shipping_is_billing: true,
        order_items: order.orderItems.map((item) => ({
          name: item.name,
          sku: item.productId,
          units: item.quantity,
          selling_price: item.price,
        })),
        payment_method: order.paymentMethod === "COD" ? "COD" : "Prepaid",
        sub_total: order.totalPrice,
        length: 10,
        breadth: 10,
        height: 10,
        weight: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Shiprocket Order Error:", error.response?.data || error.message);
    throw error;
  }
};
