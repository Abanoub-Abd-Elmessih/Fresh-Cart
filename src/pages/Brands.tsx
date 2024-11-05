import axios from "axios";
import Title from "../Components/Title";
import { useQuery } from "react-query";


interface brandType{
    name:string;
    _id:string;
    image:string;
}
export default function Brands() {
    async function getAllBrands():Promise<brandType[]>{
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        console.log('brands',response.data);
        return response.data.data;
    }

    const {isLoading , isError , data:brands} = useQuery<brandType[]>({
        queryKey:['brands'],
        queryFn:getAllBrands
    })

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
    <div className="container">
        <Title Title1="Our" Title2="Brands" />
        <div className="grid md:grid-cols-5">
        {
            brands?.map((brand)=>(
                <div className="flex flex-col items-center border-4 shadow-lg border-gray-600 m-5 rounded-md p-2" key={brand._id}>
                    <img src={brand.image} alt={`${brand.name} image`} loading="lazy" />
                    <p className="font-bold font-inter tracking-widest">{brand.name}</p>
                </div>
            ))
        }
        </div>
    </div>
  )
}
