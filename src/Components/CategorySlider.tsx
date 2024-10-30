import Slider from "react-slick";
import { useCategories } from "../hooks/useCategories";
import CategoryCard from "./CategoryCard";

export default function CategorySlider() {
  const { data: categories } = useCategories();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 550,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
  };

  return (
    <div className="my-10">
      <Slider {...settings}>
        {
            categories?.map((category)=>(
                <CategoryCard Name={category.name} key={category._id} Image={category.image}/>
            ))
        }
      </Slider>
    </div>
  );
}
