import Hero1 from "../assets/Hero1.png";
import Hero2 from "../assets/Hero2.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Title from "../Components/Title";
import CategorySlider from "../Components/CategorySlider";
import NewsLetterBox from "../Components/NewsLetterBox";
import ProductsComp from "../Components/ProductsComp";
import { useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}
      <HeroSection />
      <div className="container p-3 md:p-0">
        {/* New Arrivals */}
        <Title Title1="New" Title2="Arrivals" />
        <ProductsComp limit={5} />
        {/* Our Categories */}
        <Title Title1="Our" Title2="Categories" />
        <CategorySlider />
        <Title Title1="Join" Title2="us" />
        <NewsLetterBox />
      </div>
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="relative min-h-[550px] sm:min-h-[650px] bg-slate-50 flex justify-center items-center mb-10 shadow-md duration-200">
      <div className="absolute bottom-0 left-0 right-0 top-0 md:bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] bg-[radial-gradient(circle_400px_at_100%_200px,#d5c5ff,transparent)]" />
      <div className="container p-5">
        <Slider {...settings}>
          {/* Slide 1 */}
          <div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between md:justify-around">
              {/* Text Section */}
              <div className="">
                <p className="font-bold md:text-6xl text-3xl my-5">
                  Upto 50% off on all <br /> Men's Wear
                </p>
                <p className="tracking-wider font-thin mt-5">
                  Explore our stylish selection of men's clothing, from casual
                  staples to sharp outfits. <br /> Don't miss this limited-time
                  offer!
                </p>
                <button className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white p-2 mt-7 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300" onClick={() => navigate('/products')}>
                  Order Now
                </button>
              </div>
              {/* Image Section */}
              <div className="md:w-1/3">
                <img src={Hero1} alt="Model Photo" className="w-full" />
              </div>
            </div>
          </div>
          {/* Slide 2 */}
          <div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between md:justify-around">
              {/* Text Section */}
              <div className="">
                <p className="font-bold md:text-6xl text-3xl my-5">
                  Upto 30% off on all <br /> Women's Wear
                </p>
                <p className="tracking-wider font-thin mt-5">
                  "Explore our stylish collection of women's fashion, from
                  everyday essentials to elegant outfits. <br /> Don't miss this
                  limited-time offer!
                </p>
                <button className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white p-2 mt-7 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300" onClick={() => navigate('/products')}>
                  Order Now
                </button>
              </div>
              {/* Image Section */}
              <div className="md:w-1/3">
                <img src={Hero2} alt="Model Photo" className="w-full" />
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
