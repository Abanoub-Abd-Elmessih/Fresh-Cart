import axios, { AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

// Define the shape of cart item data, assuming it includes a count and productId
interface CartResponse {
    status: string;
    numOfCartItems: number;
    // other response properties as needed
}

interface CartContextType {
    cartItems: number;
    setCartItems: React.Dispatch<React.SetStateAction<number>>;
    getLoggedUserCart: () => Promise<AxiosResponse<CartResponse>>;
    addProductToCart: (productId: string) => Promise<AxiosResponse>;
    updateCartItemCount: (productId: string, count: number) => Promise<AxiosResponse>;
    deleteProductItem: (productId: string) => Promise<AxiosResponse>;
    clearCart: () => Promise<AxiosResponse>;
}

// Initial context values
export const CartContext = createContext<CartContextType | null>(null);

interface CartContextProviderProps {
    children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
    const headers = { token: localStorage.getItem('token') || '' };

    function getLoggedUserCart(): Promise<AxiosResponse<CartResponse>> {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
            .then(response => response)
            .catch(error => error);
    }

    function addProductToCart(productId: string): Promise<AxiosResponse> {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, { headers })
            .then(response => response)
            .catch(error => error);
    }

    function updateCartItemCount(productId: string, count: number): Promise<AxiosResponse> {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
            .then(response => response)
            .catch(error => error);
    }

    function deleteProductItem(productId: string): Promise<AxiosResponse> {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then(response => response)
            .catch(error => error);
    }

    function clearCart(): Promise<AxiosResponse> {
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/', { headers })
            .then(response => response)
            .catch(error => error);
    }

    const [cartItems, setCartItems] = useState<number>(0);

    async function getCart() {
        const response = await getLoggedUserCart();
        if (response.data.status === "success") {
            setCartItems(response.data.numOfCartItems);
        }
    }

    useEffect(() => {
        getCart();
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, getLoggedUserCart, addProductToCart, updateCartItemCount, deleteProductItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
