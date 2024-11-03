import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Card from "../Components/Card";
import { useState, useEffect } from "react"; // Import useEffect
import { CiHeart } from "react-icons/ci";

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
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&limit=5`
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
    <div className="p-4 font-inter border-y container">
      {/* Main Product */}
      <div className="grid md:grid-cols-6 lg:grid-cols-10 md:gap-5 border-b-2 pb-4">
      {/* Images Section */}
      <div className="col-span-12 md:col-span-1 order-2 md:order-1">
          <div className="grid grid-cols-4 gap-3 my-5 md:my-0 md:grid-cols-1">
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
      </div>
        {/* Main Image */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 md:px-5 order-1 md:order-2">
            <img src={mainImage} alt={specificProduct?.title} className="border-2 border-gray-400 shadow-lg rounded-xl" />
          </div>
      {/* Product Details */}
      <div className="col-span-12 md:col-span-5 order-3">
      <h3 className="text-3xl font-bold my-4 md:my-0">{specificProduct?.title}</h3>

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
      <div className="flex items-center justify-between md:justify-normal md:gap-5 mt-7">

      <button className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white p-2 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
        Add To Cart
      </button>
      <span className="border-2 border-opacity-65 border-black rounded-full p-1 text-2xl hover:text-red-500 hover:border-red-500 cursor-pointer duration-300"><CiHeart /></span>
      </div>
      </div>
      </div>

      {/* Render related products */}
      <h2 className="text-2xl font-bold my-5">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
