import axios from "axios";
import { useQuery } from "react-query";

interface SpecificCategoryType {
  _id: string;
  name: string;
}

interface SubCategoriesProps {
  categoryId: string;
  categoryName: string;
}

export default function SubCategories({ categoryId, categoryName }: SubCategoriesProps) {
  async function getSpecifics(id: string): Promise<SpecificCategoryType[]> {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    console.log("specific category", response.data);
    return response.data.data;
  }

  const { data: specificCategory, isLoading, error } = useQuery<SpecificCategoryType[]>({
    queryKey: ["specificCategory", categoryId],
    queryFn: () => getSpecifics(categoryId),
    enabled: !!categoryId,
  });

  if (isLoading) return <div className="loader-overlay"><div className="loader" /></div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <>
    <h2 className="text-xl font-bold text-center text-emerald-600 my-3">{categoryName}</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 p-3">
      
      {specificCategory && specificCategory.length > 0 ? (
          specificCategory.map((category) => (
              <div key={category._id} className="border-2 border-gray-700 rounded-lg flex items-center justify-center p-2">
            {category.name}
          </div>
        ))
    ) : (
        <div className="text-center text-red-600 col-span-12">Sorry, there are no subcategories available.</div>
    )}
    </div>
    </>
  );
}
