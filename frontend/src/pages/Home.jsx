import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/bestSeller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch best seller:", error);
      }
    };

    fetchBestSeller(); 
  }, [dispatch]);
  console.log(bestSellerProduct);
  
  return (
    <div>
      <Hero />
      <NewArrivals />
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product ...</p>
      )}

      {/* <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-4">

          </h2>
        </div> */}
    </div>
  );
}

export default Home;
