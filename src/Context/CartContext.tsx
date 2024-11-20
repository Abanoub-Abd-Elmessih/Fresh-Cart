/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface CartApiResponse {
  status: string;
  numOfCartItems: number;
  data: {
    products: Array<any>;
    totalCartPrice: number;
  };
}

interface CartContextType {
  cartItems: number;
  cartProducts: Array<any>; // Add cartProducts here
  setCartItems: (count: number) => void;
  getLoggedUserCart: () => Promise<AxiosResponse<CartApiResponse>>;
  addProductToCart: (productId: string) => Promise<AxiosResponse>;
  updateCartItemCount: (productId: string, count: number) => Promise<AxiosResponse>;
  deleteProductItem: (productId: string) => Promise<AxiosResponse>;
  clearCart: () => Promise<AxiosResponse>;
}

interface AuthContextType {
  token: string;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const { token } = useContext(AuthContext) as AuthContextType;
  const [cartItems, setCartItems] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<Array<any>>([]); // State for cart products

  const headers = {
    token,
  };

  async function getLoggedUserCart() {
    const response = await axios.get<CartApiResponse>(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers }
    );
    if (response.data?.status === "success") {
      setCartProducts(response.data.data.products || []); // Update cartProducts
    }
    return response;
  }

  function addProductToCart(productId: string) {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      { headers }
    );
  }

  function updateCartItemCount(productId: string, count: number) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers }
    );
  }

  function deleteProductItem(productId: string) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers }
    );
  }

  function clearCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
      headers,
    });
  }

  async function getInitialCart() {
    try {
      const response = await getLoggedUserCart();
      if (response.data?.status === "success") {
        setCartItems(response.data.numOfCartItems);
      }
    } catch (error) {
      console.error("Error fetching initial cart:", error);
    }
  }

  useEffect(() => {
    if (token) {
      getInitialCart();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartProducts, // Include cartProducts in context values
        setCartItems,
        getLoggedUserCart,
        addProductToCart,
        updateCartItemCount,
        deleteProductItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
}
