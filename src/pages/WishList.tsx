/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { CiHeart } from 'react-icons/ci';
import { IoCheckmarkCircleOutline, IoBagHandleOutline } from 'react-icons/io5';
import { useWishlist } from '../Context/WishContext';
import { useCart } from '../Context/CartContext';
import Title from '../Components/Title';

export default function WishlistPage() {
  const { 
    wishlistProducts, 
    getLoggedUserWishlist, 
    removeProductFromWishlist 
  } = useWishlist();
  
  const { addProductToCart, cartProducts } = useCart();
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    try {
      setLoading(true);
      await getLoggedUserWishlist();
    } catch (error) {
      toast.error("Error loading wishlist");
    } finally {
      setLoading(false);
    }
  }

  const isProductInCart = (productId: string) => {
    return cartProducts.some((item: any) => item.product._id === productId);
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  async function handleCartAction(e: React.MouseEvent, productId: string) {
    e.preventDefault(); // Prevent link navigation
    if (isProductInCart(productId)) return;
    
    try {
      setAddingToCart(prev => ({ ...prev, [productId]: true }));
      await addProductToCart(productId);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add product to cart");
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  }

  async function handleRemoveFromWishlist(e: React.MouseEvent, productId: string) {
    e.preventDefault(); // Prevent link navigation
    try {
      await removeProductFromWishlist(productId);
      await getLoggedUserWishlist();
      toast.success("Product removed from wishlist!");
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Your wishlist is empty</h1>
        <p className="text-gray-600">Add items to your wishlist to save them for later!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Title Title1='Your' Title2='Wish List'/>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {wishlistProducts.map((product: any) => (
          <Link
            key={product._id}
            to={`/Products/specificProduct/${product._id}`}
            className="shadow-lg font-inter p-3 text-gray-800 bg-gray-200 my-3 rounded-lg overflow-hidden"
          >
            {/* Product Image and Heart Icon */}
            <div className="relative overflow-hidden">
              <div 
                onClick={(e) => handleRemoveFromWishlist(e, product._id)}
                className="absolute right-2 top-2 border-2 border-opacity-65 rounded-full p-1 text-2xl text-red-500 border-red-500 cursor-pointer duration-300"
              >
                <CiHeart />
              </div>
              <img
                src={product.imageCover}
                alt={product.title}
                className="rounded-xl w-full"
                loading="lazy"
              />
            </div>

            {/* Product Info: Title, Price, and Add to Cart Icon */}
            <div className="flex justify-between mt-2 items-center">
              <div>
                <p>{truncateText(product.title)}</p>
                {product.priceAfterDiscount ? (
                  <>
                    <p className="inline-block me-3 line-through">${product.price}</p>
                    <span className="font-bold">${product.priceAfterDiscount}</span>
                  </>
                ) : (
                  <p className="font-bold inline-block me-3">${product.price}</p>
                )}
              </div>

              <button
                onClick={(e) => handleCartAction(e, product._id)}
                disabled={addingToCart[product._id] || isProductInCart(product._id)}
                className={`border-2 border-opacity-65 ${
                  isProductInCart(product._id)
                    ? 'border-emerald-500 text-emerald-500'
                    : 'border-black hover:text-emerald-500 hover:border-emerald-500'
                } w-fit h-fit p-1 rounded-full text-lg cursor-pointer duration-300 relative ${
                  addingToCart[product._id] ? 'opacity-50' : ''
                }`}
              >
                {addingToCart[product._id] ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-500 border-t-transparent" />
                ) : isProductInCart(product._id) ? (
                  <IoCheckmarkCircleOutline className="text-emerald-500" />
                ) : (
                  <IoBagHandleOutline />
                )}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}