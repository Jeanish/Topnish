import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";
import Now from "../assets/Now.png"

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,SetName] = useState("");
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {user, guestId, loading} = useSelector((state) => state.auth);
    const {cart} = useSelector((state) => state.cart);
  
  
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");
  
    useEffect(() => {
      if(user) {
        if(cart?.products.length > 0 && guestId){
          dispatch(mergeCart({ guestId,user})).then(() => {
            navigate(isCheckoutRedirect ? "/checkout" : "/");
          });
        } else{
          navigate(isCheckoutRedirect ? "/checkout" : "/")
        }
      }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch])
  

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({username, email, password}));
        
    }

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit}
          action=""
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm "
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Topnish</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey There! </h2>
          <p className="text-center mb-6">
            Enter your username and password to login
          </p>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="username"
              value={username}
              onChange={(e) => SetName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
           {loading ? "loading" : "Sign Up"}
           </button>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
               Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:flex w-1/2 bg-gray-800 items-center justify-center p-4">
              <img
                src={Now}
                alt="Login to Account"
                className="max-h-[82vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>
    </div>
  );
}

export default Register;
