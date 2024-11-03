import { useState } from "react";
import ProductsComp from "../Components/ProductsComp";
import Title from "../Components/Title";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="container overflow-hidden">
      <Title Title1="Our" Title2="Products" />
      <div className="p-3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
        />
      </div>
      <ProductsComp searchTerm={searchTerm} />
    </div>
  );
}
