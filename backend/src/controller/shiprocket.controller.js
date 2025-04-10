import { getShiprocketToken } from "../utils/shiprocket.service.js";
import axios from "axios"

export const trackShipment = async (req, res) => {
  const { shipmentId } = req.params;

  try {
    const token = await getShiprocketToken();

    const response = await axios.get(
      `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(200).json({
      success: true,
      trackingData: response.data,
    });
  } catch (error) {
    console.error("Error tracking shipment:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to track shipment",
      error: error.response?.data || error.message,
    });
  }
};
