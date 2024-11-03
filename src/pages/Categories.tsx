import { useEffect } from "react";
import CategoryCard from "../Components/CategoryCard";
import Title from "../Components/Title";
import { useCategories } from "../hooks/useCategories";

export default function Categories() {
  const { isLoading, isError, data: categories } = useCategories();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup overflow style on component unmount
    return () => {
      document.body.style.overflow = 'auto';
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
    return <span>Error loading categories</span>;
  }

  return (
    <div className="container md:p-5">
      <Title Title1="Our" Title2="Categories"/>
      <div className="grid p-1 grid-cols-2 lg:grid-cols-4 gap-y-5 md:gap-5">
        {categories?.map((category) => (
          <CategoryCard key={category._id} Name={category.name} Image={category.image}/>
        ))}
      </div>
    </div>
  );
}
