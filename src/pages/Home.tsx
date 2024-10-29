import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero1 from "../assets/Hero1.png";
import Hero2 from "../assets/Hero2.png";
import Title from "../Components/Title";



export default function Home() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
    autoplaySpeed: 3000, 
    };
    
  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-900 dark:text-white duration-200 ">
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
        <div className="container p-5">
          <Slider {...settings}>
          {/* Slide 1 */}
          <div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-around">
              {/* Text Section */}
              <div className="">
                <p className="font-bold md:text-6xl text-3xl my-5">Upto 50% off on all <br /> Men's Wear</p>
                <p className="tracking-wider font-thin mt-5">Explore our stylish selection of men's clothing, from casual staples to sharp outfits. <br /> Don't miss this limited-time offer!</p>
                <button className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white p-2 mt-7 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300">Order Now</button>
                </div>
              {/* Image Section */}
              <div className="md:w-1/3">
                <img src={Hero1} alt="Model Photo" className="w-full" />
              </div>
            </div>
          </div>
          {/* Slide 2 */}
          <div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-around">
              {/* Text Section */}
              <div className="">
                <p className="font-bold md:text-6xl text-3xl my-5">Upto 30% off on all <br /> Women's Wear</p>
                <p className="tracking-wider font-thin mt-5">Explore our latest collection of women's fashion, featuring trendy outfits for every occasion. <br /> Grab this limited-time offer and refresh your wardrobe today!!</p>
                <button className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white p-2 mt-7 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300">Order Now</button>
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
      {/* Best Sellers */}
      <Title Title1="Best" Title2="Sellers"/>
    </div>
  );
}
