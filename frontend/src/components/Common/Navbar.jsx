import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import CartDrawer from "../Layout/CartDrawer";
import { useSelector } from "react-redux";
import Logo from "../../assets/TopnishLogoFinal.PNG?url";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div className="pt-16">
        {" "}
        {/* 👈 Add this wrapper div with pt-14 (56px) */}
        <nav className="container mx-auto flex items-center justify-between py-4 px-6 bg-white shadow-md">
          {/* Logo */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition duration-200"
            >
              <img src={Logo} alt="Topnish Logo" className="h-10" />
            </Link>
          </div>

          {/* Desktop Nav */}
          {/* Desktop Nav */}
<div className="hidden md:flex space-x-6">
  <Link
    to="/collections/all"
    className="text-gray-700 hover:text-black text-sm font-medium uppercase transition duration-200"
  >
    All Collections
  </Link>

  <Link
    to="/track-order"
    className="text-gray-700 hover:text-black text-sm font-medium uppercase transition duration-200"
  >
    Track My Order
  </Link>
</div>


          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="block bg-black px-2 rounded text-sm text-white"
              >
                Admin
              </Link>
            )}

            <Link
              to="/profile"
              className="hover:text-black transition duration-200"
            >
              <HiOutlineUser className="h-6 w-6 text-gray-700 hover:scale-110 transition-transform duration-200" />
            </Link>

            <button
              onClick={toggleCartDrawer}
              className="relative hover:text-black transition duration-200"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700 hover:scale-110 transition-transform duration-200" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Nav Toggle */}
            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3BottomRight className="h-6 w-6 text-gray-700 hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </nav>
      </div>
      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleNavDrawer}
            className="hover:text-black transition duration-200"
          >
            <IoMdClose className="h-6 w-6 text-gray-600 hover:scale-110 transition-transform duration-200" />
          </button>
        </div>

        {/* Mobile Navigation Content */}
        {/* Mobile Navigation Content */}
        <div className="p-6 space-y-6">
          {/* Logo and Home */}
          <Link
            to="/"
            onClick={toggleNavDrawer}
            className="flex items-center space-x-3"
          >
            <img src={Logo} alt="Topnish Logo" className="h-8" />
            <span className="text-lg font-bold text-gray-800 hover:text-black">
              Topnish
            </span>
          </Link>

          {/* All Collections */}
          <Link
            to="/collections/all"
            onClick={toggleNavDrawer}
            className="block text-base font-medium text-gray-700 hover:text-black transition"
          >
            All Collections
          </Link>

          {/* Track My Order */}
          <Link
            to="/track-order"
            onClick={toggleNavDrawer}
            className="block text-base font-medium text-gray-700 hover:text-black transition"
          >
            Track My Order
          </Link>

          {/* Conditional: Profile or Login */}
          {user ? (
            <Link
              to="/profile"
              onClick={toggleNavDrawer}
              className="block text-base font-medium text-gray-700 hover:text-black transition"
            >
              My Profile
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={toggleNavDrawer}
              className="block text-base font-medium text-gray-700 hover:text-black transition"
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
