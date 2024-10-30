import axios from "axios";
import { useQuery } from "react-query";

interface Categories{
    _id:string
    name:string
    image:string
}

async function getAllCategories():Promise<Categories[]>{
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    console.log('All Categories' , response.data);
    return response.data.data
    
}

export function useCategories(){
    return useQuery<Categories[],Error>({
        queryKey:['Categories'],
        queryFn:getAllCategories,
        staleTime:300000,
    })
}