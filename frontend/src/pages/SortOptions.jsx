import React from 'react';
import { useSearchParams } from 'react-router-dom';

function SortOptions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <select
      className="border border-gray-300 p-2 rounded-md focus:outline-none text-sm mb-4"
      onChange={handleSortChange}
      value={searchParams.get("sortBy") || ""}
    >
      <option value="">Sort: Default</option>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
      <option value="popularity">Popularity</option>
    </select>
  );
}

export default SortOptions;
