import { useState } from "react";
import CategoryCard from "../Components/CategoryCard";
import Title from "../Components/Title";
import { useCategories } from "../hooks/useCategories";
import SubCategories from "../Components/subCategories";

export default function Categories() {
  const { isLoading, isError, data: categories } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null); // New state for selected category name

  // Click handler to set selected category ID and name
  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    setSelectedCategoryId(categoryId === selectedCategoryId ? null : categoryId);
    setSelectedCategoryName(categoryId === selectedCategoryId ? null : categoryName); // Update the selected category name
  };

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

  if (isError) {
    return <span>Error loading categories</span>;
  }

  return (
    <div className="container md:p-5">
      <Title Title1="Our" Title2="Categories" />
      <div className="grid p-1 lg:grid-cols-4 gap-y-5 md:gap-5">
        {categories?.map((category) => (
          <div key={category._id}>
            {/* Clickable CategoryCard */}
            <div onClick={() => handleCategoryClick(category._id, category.name)}> {/* Pass category name */}
              <CategoryCard Name={category.name} Image={category.image} />
            </div>
            
            {/* Conditionally render SubCategories if the category is selected */}
            {selectedCategoryId === category._id && (
              <SubCategories categoryId={category._id} categoryName={selectedCategoryName!} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
