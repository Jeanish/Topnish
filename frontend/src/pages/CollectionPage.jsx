import React, { useEffect } from "react";
import ProductGrid from "../components/Products/ProductGrid";
import SortOptions from "./SortOptions";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";

function CollectionPage() {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(fetchProducts(queryParams));
  }, [collection, searchParams]);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-grow p-4">
        {/* 🔧 FLEX BOX TO ALIGN HEADING + SORT OPTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 mb-6 px-2 text-center sm:text-left">
          <h2 className="text-2xl uppercase font-semibold">
            {collection ? `${collection} Collection` : "All Collection"}
          </h2>
          <SortOptions />
        </div>

        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default CollectionPage;
