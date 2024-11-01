// Products.tsx
import axios from "axios";
import { useQuery } from "react-query";
import Card from "../Components/Card";

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

interface ProductsProps {
  limit?: number;
}

export default function Products({ limit }: ProductsProps) {
  // Function to fetch all products
  async function getAllProducts(): Promise<Product[]> {
    const response = await axios.get<ProductsResponse>(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    console.log("Products List", response.data.data);
    return response.data.data; // Return the products data
  }

  // Use the useQuery hook from React Query
  const {
    isError,
    isLoading,
    data: products,
  } = useQuery<Product[], Error>({
    queryKey: ["Products"],
    queryFn: getAllProducts,
    staleTime: 300000,
  });

  // Render loading state
  if (isLoading) {
    document.body.style.overflow = "hidden";
    return (
      <div className="loader-overlay">
        <div className="loader" />
      </div>
    );
  } else {
    document.body.style.overflow = "auto";
  }

  // Render error state
  if (isError) {
    return <span>Error loading products</span>;
  }

  const displayedProducts = limit ? products?.slice(0, limit) : products;

  // Render the list of products
  return (
    <div className="grid  p-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {displayedProducts?.map((product) => (
        <Card
          id={product._id}
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
