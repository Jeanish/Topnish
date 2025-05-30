import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";
import { removeFromCart } from "../../redux/slices/cartSlice";
function Checkout() {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);

  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
  const token = localStorage.getItem("userToken");
  if (!user || !token) {
    navigate("/login");
  }
}, [user, navigate]);


  // Ensure cart s loaded before procedding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    const token = localStorage.getItem("userToken");
  if (!token) {
    navigate("/login");
    return;
  }
    e.preventDefault();
    console.log("Checkout Items:", cart.products);
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Cash On Delivery",
          totalPrice: cart.totalPrice,
          phone: shippingAddress.phone
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async () => {
    const token = localStorage.getItem("userToken");
  if (!token) {
    navigate("/login");
    return;
  }
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/checkout/${checkoutId}/pay`,
        {
          paymentDetails: { method: "Cash On Delivery" }
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
  
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };
  

  

  const handleFinalizeCheckout = async(checkoutId) => {
    const token = localStorage.getItem("userToken");
  if (!token) {
    navigate("/login");
    return;
  }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          }
        }
      );
        navigate("/order-confirmation");
        dispatch(removeFromCart())
    } catch (error) {
      console.error(error);
    }
  };

  if(loading){
    return <p>Loading cart ...</p>
  }
  if(error){
      return <p>Error : {error}</p>
  }

  if(!cart || !cart.products || cart.products.length === 0){
    return <p>Your cart is empty</p>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">CheckOut</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user? user.email : ""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          {/* Delivery Details */}
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstname}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstname: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastname}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastname: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Payment Options */}
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                {/* <h3 className="text-lg mb-4">Cash On Delivery</h3> */}
                <button
                  type="button"
                  onClick={() => handlePaymentSuccess({ method: "Cash On Delivery" })}
                  className="w-full bg-green-500 text-white py-3 rounded"
                >
                  Cash On Delivery
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              className="flex items-start justify-between py-2 border-b"
              key={index}
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>{cart.totalPrice.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>{cart.totalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
