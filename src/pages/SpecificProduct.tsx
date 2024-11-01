import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Card from "../Components/Card";
import { useState, useEffect } from "react"; // Import useEffect

interface Brand {
  image: string;
  name: string;
}

interface Product {
  _id: string;
  imageCover: string;
  images?: string[];
  title: string;
  description?: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage?: number;
  brand: Brand;
  category: {
    _id: string;
  };
}

interface RelatedProduct {
  _id: string;
  imageCover: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
}

export default function SpecificProduct() {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState<string>(''); // Initialize with an empty string

  async function getSpecificProduct() {
    const response = await axios.get<{ data: Product }>(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    return response.data.data;
  }

  async function getRelatedProducts(categoryId: string) {
    const response = await axios.get<{ data: RelatedProduct[] }>(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&limit=6`
    );
    return response.data.data;
  }

  const { isLoading, isError, data: specificProduct } = useQuery<Product, Error>({
    queryKey: ['specificProduct', id],
    queryFn: getSpecificProduct,
    enabled: !!id,
  });

  const { data: relatedProducts } = useQuery<RelatedProduct[], Error>({
    queryKey: ['relatedProducts', specificProduct?.category._id],
    queryFn: async () => {
      if (!specificProduct?.category._id) {
        throw new Error("Category ID is unavailable for related products.");
      }
      return await getRelatedProducts(specificProduct.category._id);
    },
    enabled: Boolean(specificProduct?.category._id),
  });

  // Set the main image when specificProduct is available
  useEffect(() => {
    if (specificProduct) {
      setMainImage(specificProduct.imageCover); // Set the main image to imageCover initially
    }
  }, [specificProduct]);

  if (isLoading) {
    document.body.style.overflow = 'hidden';
    return (
      <div className="loader-overlay">
        <div className="loader" />
      </div>
    );
  } else {
    document.body.style.overflow = 'auto';
  }

  if (isError) {
    return <h1>Error loading product details.</h1>;
  }

  return (
    <div className="p-4 font-inter border-y">
      <img src={mainImage} alt={specificProduct?.title} className="border-2 border-gray-400 shadow-lg rounded-xl" />
      <div className="grid grid-cols-4 gap-3 my-5">
        {specificProduct?.images?.map((image, index) => (
          <img
            src={image}
            key={index}
            className="w-full border-2 border-gray-400 shadow-lg rounded-lg cursor-pointer" // Add cursor-pointer for interactivity
            alt="product image"
            onClick={() => setMainImage(image)} // Update main image on click
          />
        ))}
      </div>
      <h3 className="text-3xl font-bold my-4">{specificProduct?.title}</h3>

      <div className="flex items-center my-2">
        <img src={specificProduct?.brand.image} alt={specificProduct?.brand.name} className="w-10 h-10 mr-2" />
        <span className="text-lg font-medium">{specificProduct?.brand.name}</span>
      </div>

      {specificProduct?.priceAfterDiscount ? (
        <>
          <span className="line-through me-2">${specificProduct?.price}</span>
          <span className="font-bold text-xl">${specificProduct?.priceAfterDiscount}</span>
        </>
      ) : (
        <p className="font-bold text-xl">${specificProduct?.price}</p>
      )}
      <p className="font-semibold my-2 flex items-center gap-2 border-y-2 border-gray-500 py-3">
        Product Rating: <span className="font-bold">{specificProduct?.ratingsAverage}</span><FaStar className="text-gray-600" />
      </p>
      <p className="font-bold my-3">Description:</p>
      <p>{specificProduct?.description}</p>
      <button className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white p-2 mt-7 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
        Add To Cart
      </button>

      {/* Render related products */}
      <h2 className="text-2xl font-bold my-5">Related Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {relatedProducts?.map((product) => (
          <Card
            ProductImage={product.imageCover}
            ProductName={product.title}
            ProductPrice={product.price}
            Discount={product.priceAfterDiscount}
            id={product._id}
            key={product._id}
          />
        ))}
      </div>
    </div>
  );
}
