import { useEffect, useState } from "react";
import Title from "../Components/Title";
import toast from "react-hot-toast";
import { useCart } from "../Context/CartContext";

interface CartItem {
  product: {
    id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  count: number;
  price: number;
}

interface CartData {
  products: CartItem[];
  totalCartPrice: number;
}

export default function Cart() {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getLoggedUserCart, updateCartItemCount, deleteProductItem, setCartItems, clearCart } = useCart();

  async function getCart() {
    try {
      setIsLoading(true);
      const response = await getLoggedUserCart();
      console.log('Cart Response:', response); // Debug log
      
      if (response.data?.status === "success") {
        setCartData(response.data.data);
        setCartItems(response.data.numOfCartItems);
      } else {
        setCartData(null);
        toast.error("Failed to load cart data");
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error("Error loading cart");
      setCartData(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateItemCount(productId: string, count: number) {
    if (count < 1) return;
    
    try {
      const response = await updateCartItemCount(productId, count);
      if (response.data?.status === "success") {
        setCartData(response.data.data);
        setCartItems(response.data.numOfCartItems);
        toast.success("Cart updated successfully");
      }
    } catch (error) {
      toast.error("Error updating cart");
      console.error(error);
    }
  }

  async function removeItem(productId: string) {
    try {
      const response = await deleteProductItem(productId);
      if (response.data?.status === "success") {
        setCartData(response.data.data);
        setCartItems(response.data.numOfCartItems);
        toast.success("Item removed from cart");
      }
    } catch (error) {
      toast.error("Error removing item");
      console.error(error);
    }
  }

  
  async function handleClearCart() {
    try {
      const response = await clearCart();
      if (response.data?.message === "success") {
        setCartData(null);
        setCartItems(0);
        toast.success("Cart cleared successfully");
      } else {
        toast.error("Failed to clear cart");
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error("Error clearing cart");
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) {
    return (
      <div className="container py-10">
        <Title Title1="Your" Title2="Cart" />
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!cartData?.products || cartData.products.length === 0) {
    return (
      <div className="container py-10">
        <Title Title1="Your" Title2="Cart" />
        <div className="text-center text-gray-500">Your cart is empty</div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Title Title1="Your" Title2="Cart" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartData.products.map((item) => (
              <tr key={item.product.id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4 ">
                  <img
                    src={item.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={item.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {item.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateItemCount(item.product.id, item.count - 1)}
                      disabled={item.count <= 1}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                      type="button"
                    >
                      <span className="sr-only">Decrease quantity</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <input
                        type="number"
                        value={item.count}
                        onChange={(e) => {
                          const newCount = parseInt(e.target.value);
                          if (newCount >= 1) {
                            updateItemCount(item.product.id, newCount);
                          }
                        }}
                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block px-2.5 py-1"
                      />
                    </div>
                    <button
                      onClick={() => updateItemCount(item.product.id, item.count + 1)}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                      type="button"
                    >
                      <span className="sr-only">Increase quantity</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  ${item.price}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-4 bg-white ">
          <div className="flex justify-between">
            <button onClick={handleClearCart} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Clear</button>
            <div className="text-lg font-semibold text-gray-900">
              Total: ${cartData.totalCartPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}