// Products.tsx
import axios from "axios";
import { useQuery } from "react-query";
import Card from "./Card";

// Define the Product interface based on your API response structure
interface Product {
  _id: string;
  imageCover: string;
  title: string;
  price: number;
  priceAfterDiscount: number;
}

// Define the response structure from the API
interface ProductsResponse {
  data: Product[];
}

interface ProductsProps{
  limit?:number
}

export default function ProductsComp({limit}:ProductsProps) {
  // Function to fetch all products
  async function getAllProducts(): Promise<Product[]> {
    const response = await axios.get<ProductsResponse>('https://ecommerce.routemisr.com/api/v1/products');
    console.log('Products List', response.data.data);
    return response.data.data; // Return the products data
  }

  // Use the useQuery hook from React Query
  const { isError, isLoading, data: products } = useQuery<Product[], Error>({
    queryKey: ['Products'],
    queryFn: getAllProducts,
    staleTime:300000,
  });

  // Render loading state
  if (isLoading) {
    return <div className="flex justify-center items-center mt-10">
        <span className="loader"></span>
    </div>;
  }

  // Render error state
  if (isError) {
    return <span>Error loading products</span>;
  }

  const displayedProducts = limit? products?.slice(0,limit):products;

  // Render the list of products
  return (
    <div className="grid grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {displayedProducts?.map((product) => (
        <Card 
          key={product._id} 
          ProductImage={product.imageCover} 
          ProductName={product.title}
          Discount={product.priceAfterDiscount}
          ProductPrice={product.price} 
        />
      ))}
    </div>
  );
}
