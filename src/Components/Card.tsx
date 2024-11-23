import { useMemo, useState, useEffect, useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import { useWishlist } from "../Context/WishContext";

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
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
  const { addProductToCart, deleteProductItem, cartProducts } = useCart();
  const { isProductInWishlist, addProductToWishlist, removeProductFromWishlist } = useWishlist();
  const { token } = useContext(AuthContext);

  const truncatedName = useMemo(() => getThreeWords(ProductName), [ProductName]);
  const [isInWishlist, setIsInWishlist] = useState(isProductInWishlist(id));

  // Check if the product is in the cart
  useEffect(() => {
    const productInCart = cartProducts.some((product) => product.product.id === id);
    
    if (token) {
      setIsInCart(productInCart);
    }
  }, [cartProducts, id, token ]);

  // Sync the wishlist state
  useEffect(() => {
    setIsInWishlist(isProductInWishlist(id));
  }, [isProductInWishlist, id]);

  const handleCartAction = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the cart icon
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    try {
      if (!isInCart) {
        // Add to cart
        const response = await addProductToCart(id);
        if (response.data?.status === "success") {
          setIsInCart(true);
          toast.success("Added to cart successfully");
        }
      } else {
        // Remove from cart
        const response = await deleteProductItem(id);
        if (response.data?.status === "success") {
          setIsInCart(false);
          toast.success("Removed from cart");
        }
      }
    } catch (error) {
      toast.error(isInCart ? "Failed to remove from cart" : "Failed to add to cart");
      console.error("Cart action error:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistAction = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the wishlist icon
    if (isUpdatingWishlist) return;

    setIsUpdatingWishlist(true);
    try {
      if (!isInWishlist) {
        // Add to wishlist
        const response = await addProductToWishlist(id);
        if (response.data?.status === "success") {
          setIsInWishlist(true);
          toast.success("Added to wishlist successfully");
        }
      } else {
        // Remove from wishlist
        const response = await removeProductFromWishlist(id);
        if (response.data?.status === "success") {
          setIsInWishlist(false);
          toast.success("Removed from wishlist");
        }
      }
    } catch (error) {
      toast.error(isInWishlist ? "Failed to remove from wishlist" : "Failed to add to wishlist");
      console.error("Wishlist action error:", error);
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  return (
    <Link
      to={`/Products/specificProduct/${id}`} // Corrected link
      className="shadow-lg font-inter p-3 text-gray-800 bg-gray-200 my-3 rounded-lg overflow-hidden"
    >
      {/* Product Image and Heart Icon */}
      <div className="relative overflow-hidden">
        <button
          onClick={handleWishlistAction}
          disabled={isUpdatingWishlist}
          className={`absolute right-2 top-2 border-2 rounded-full border-gray-700 p-1 text-2xl cursor-pointer duration-300 ${
            isInWishlist ? "text-red-500 border-red-500" : "hover:text-red-500 hover:border-red-500"
          } ${isUpdatingWishlist ? "opacity-50" : ""}`}
        >
          <CiHeart />
        </button>
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

        <button
          onClick={handleCartAction}
          disabled={isAddingToCart}
          className={`border-2 border-opacity-65 ${
            isInCart
              ? "border-emerald-500 text-emerald-500"
              : "border-black hover:text-emerald-500 hover:border-emerald-500"
          } w-fit h-fit p-1 rounded-full text-lg cursor-pointer duration-300 relative ${
            isAddingToCart ? "opacity-50" : ""
          }`}
        >
          {isAddingToCart ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-500 border-t-transparent" />
          ) : isInCart ? (
            <IoCheckmarkCircleOutline className="text-emerald-500" />
          ) : (
            <IoBagHandleOutline />
          )}
        </button>
      </div>
    </Link>
  );
}
