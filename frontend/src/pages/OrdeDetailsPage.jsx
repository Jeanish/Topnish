import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";
import { trackShipment } from "../api"; // adjust if needed

function OrderDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);
  const [trackingInfo, setTrackingInfo] = useState(null);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (orderDetails?.shiprocket?.shipment_id) {
      trackShipment(orderDetails.shiprocket.shipment_id)
        .then((res) => setTrackingInfo(res.trackingData))
        .catch((err) => console.error("Tracking Error", err));
    }
  }, [orderDetails]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No order details found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-sm font-medium`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
              </span>
            </div>
          </div>

          {/* customer, Payment, shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "UnPaid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method: {orderDetails.paymentMethod}</p>
              <p>
                Address:{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          {/* product list */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Unit Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-blue-500 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </td>

                    <td className="py-2 px-4">{item.price}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🚚 Shipment Tracking Section */}
          {orderDetails.shiprocket?.shipment_id && (
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Shipment Tracking</h4>
              {trackingInfo ? (
                <>
                  <p className="text-sm mb-1">
                    Status:{" "}
                    <span className="font-medium">
                      {trackingInfo[orderDetails.shiprocket.shipment_id]
                        ?.tracking_data?.current_status || "No update yet"}
                    </span>
                  </p>
                  <p className="text-sm  text-gray-600">
                    {
                      trackingInfo[orderDetails.shiprocket.shipment_id]
                        ?.tracking_data?.error
                    }
                  </p>
                </>
              ) : (
                <p>Loading tracking info...</p>
              )}
            </div>
          )}

          {/* Back to orders link */}
          <Link to="/my-orders" className="text-blue-500 mt-6 inline-block">
            ← Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
}

export default OrderDetailsPage;
