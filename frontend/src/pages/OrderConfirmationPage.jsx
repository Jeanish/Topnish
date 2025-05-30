import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

function OrderConfirmationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Checkout = useSelector((state) => state.Checkout?.Checkout);

  // Clear the cart when the order is confirmed
  useEffect(() => {
    if (Checkout && Checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [Checkout, dispatch, navigate]);

  const calculateEstimateDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); //add 10 days to the order date
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>

      {Checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            <div className="">
              <h2 className="text-xl font-semibold">
                Order ID: {Checkout._id}
              </h2>
              <p className="text-gray-500">
                Order date:: {new Date(Checkout.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Estimate Delivery */}
            <div className="">
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimateDelivery(Checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Ordered Items */}
          <div className="mb-20">
            {Checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name} </h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}{" "}
                  </p>
                </div>
                <div className="ml-auto text-right ">
                  <p className="text-md">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">Cash On Delivery</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {Checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {Checkout.shippingAddress.city},{" "}
                {Checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmationPage;
