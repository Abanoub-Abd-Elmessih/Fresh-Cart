import { useMemo } from "react";
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

interface CardTypes {
  ProductName: string;
  id: string;
  ProductImage: string;
  ProductPrice: number;
  Discount?: number;
}

// Function to limit product name to 3 words
function getThreeWords(name: string) {
  return name.split(" ").slice(0, 3).join(" ");
}

export default function Card({
  id,
  ProductImage,
  ProductName,
  ProductPrice,
  Discount,
}: CardTypes) {
  
  const truncatedName = useMemo(() => getThreeWords(ProductName), [ProductName]);

  return (
    <Link to={`/Products/specificProduct/${id}`} // Corrected link
      className="shadow-lg font-inter p-3 text-gray-800 bg-gray-200 my-3 rounded-lg overflow-hidden"
    >
      {/* Product Image and Heart Icon */}
      <div className="relative overflow-hidden">
        <div className="absolute right-2 top-2 border-2 border-opacity-65 border-black rounded-full p-1 text-2xl hover:text-red-500 hover:border-red-500 cursor-pointer duration-300">
          <CiHeart />
        </div>
        <img
          src={ProductImage}
          alt="Product Image"
          className="rounded-xl w-full"
          loading="lazy"
        />
      </div>

      {/* Product Info: Title, Price, and Add to Cart Icon */}
      <div className="flex justify-between mt-2 items-center">
        <div>
          <p>{truncatedName}</p>
          {Discount ? (
            <>
              <p className="inline-block me-3 line-through">${ProductPrice}</p>
              <span className="font-bold">${Discount}</span>
            </>
          ) : (
            <p className="font-bold inline-block me-3">${ProductPrice}</p>
          )}
        </div>

        <div className="border-2 border-opacity-65 border-black w-fit h-fit p-1 rounded-full text-lg cursor-pointer hover:text-emerald-500 hover:border-emerald-500 duration-300">
          <IoBagHandleOutline />
        </div>
      </div>
    </Link>
  );
}
