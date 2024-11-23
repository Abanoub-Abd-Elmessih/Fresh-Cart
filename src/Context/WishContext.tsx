/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface WishlistApiResponse {
  status: string;
  count: number;
  data: Array<any>;
}

interface WishlistContextType {
  wishlistItems: number;
  wishlistProducts: Array<any>;
  setWishlistItems: (count: number) => void;
  getLoggedUserWishlist: () => Promise<AxiosResponse<WishlistApiResponse>>;
  addProductToWishlist: (productId: string) => Promise<AxiosResponse>;
  removeProductFromWishlist: (productId: string) => Promise<AxiosResponse>;
  isProductInWishlist: (productId: string) => boolean;
}

interface AuthContextType {
  token: string;
}

interface WishlistContextProviderProps {
  children: ReactNode;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export default function WishlistContextProvider({ children }: WishlistContextProviderProps) {
  const { token } = useContext(AuthContext) as AuthContextType;
  const [wishlistItems, setWishlistItems] = useState<number>(0);
  const [wishlistProducts, setWishlistProducts] = useState<Array<any>>([]);

  const headers = {
    token,
  };

  async function getLoggedUserWishlist() {
    const response = await axios.get<WishlistApiResponse>(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { headers }
    );
    if (response.data?.status === "success") {
      setWishlistProducts(response.data.data || []);
      setWishlistItems(response.data.count);
    }
    return response;
  }

  function addProductToWishlist(productId: string) {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers }
    );
  }

  function removeProductFromWishlist(productId: string) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers }
    );
  }

  function isProductInWishlist(productId: string) {
    return wishlistProducts.some((product: any) => product._id === productId);
  }

  async function getInitialWishlist() {
    try {
      if (token) {
        await getLoggedUserWishlist();
      }
    } catch (error) {
      console.error("Error fetching initial wishlist:", error);
    }
  }

  useEffect(() => {
    getInitialWishlist();
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistProducts,
        setWishlistItems,
        getLoggedUserWishlist,
        addProductToWishlist,
        removeProductFromWishlist,
        isProductInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistContextProvider");
  }
  return context;
}