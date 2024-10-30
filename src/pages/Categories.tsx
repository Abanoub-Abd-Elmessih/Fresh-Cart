import CategoryCard from "../Components/CategoryCard";
import { useCategories } from "../hooks/useCategories";

export default function Categories() {
  const { isLoading, isError, data: categories } = useCategories();

  if (isLoading) {
    return <div className="flex justify-center items-center mt-10">
    <span className="loader"></span>
</div>;
  }

  if (isError) {
    return <span>Error loading categories</span>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {categories?.map((category) => (
            <CategoryCard key={category._id} Name={category.name} Image={category.image}/>
        ))}
      </div>
    </div>
  );
}
