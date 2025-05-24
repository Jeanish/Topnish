import React, { useState } from "react";
import axios from "axios";

function TrackOrder() {
  const [shipmentId, setShipmentId] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    try {
      setError("");
      setTrackingData(null);
      const token = localStorage.getItem("userToken");
      const res = await axios.get(`/api/shiprocket/track/${shipmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrackingData(res.data);
    } catch (err) {
      setError("Unable to fetch tracking info.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter Shipment ID"
        value={shipmentId}
        onChange={(e) => setShipmentId(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={handleTrack}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Track Order
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {trackingData && (
        <div className="mt-6 bg-gray-50 p-4 rounded shadow">
          <h3 className="font-semibold text-lg mb-2">Tracking Info:</h3>
          <p><strong>Status:</strong> {trackingData.current_status}</p>
          <p><strong>Courier:</strong> {trackingData.courier_name}</p>
          <p><strong>AWB:</strong> {trackingData.awb_code}</p>
          <p><strong>Delivered To:</strong> {trackingData.delivered_to || "N/A"}</p>
          <p><strong>Estimated Delivery:</strong> {trackingData.edd || "N/A"}</p>
          <p><strong>Tracking History:</strong></p>
          <ul className="list-disc list-inside text-sm mt-2">
            {trackingData.tracking_data?.shipment_track_activities?.map((activity, index) => (
              <li key={index}>
                <span className="font-medium">{activity.date}</span>: {activity.activity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;
