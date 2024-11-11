import axios from "axios";
import Title from "../Components/Title";
import { useQuery } from "react-query";
import { useEffect } from "react";

interface brandType {
  name: string;
  _id: string;
  image: string;
}

export default function Brands() {
  async function getAllBrands(): Promise<brandType[]> {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    console.log('brands', response.data);
    return response.data.data;
  }

  const { isLoading, isError, data: brands, error } = useQuery<brandType[]>({
    queryKey: ['brands'],
    queryFn: getAllBrands
  });

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Reset on component unmount
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="loader-overlay">
        <div className="loader" />
      </div>
    );
  }

  if (isError) {
    console.error("Error loading brands:", error);
    return <h1>Error loading product details.</h1>;
  }

  return (
    <div className="container">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]" />
      </div>
      <Title Title1="Our" Title2="Brands" />
      <div className="grid md:grid-cols-5">
        {brands?.map((brand) => (
          <div className="flex flex-col items-center border-4 shadow-lg border-gray-600 m-5 rounded-md p-2" key={brand._id}>
            <img src={brand.image} alt={`${brand.name} image`} loading="lazy" />
            <p className="font-bold font-inter tracking-widest">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
