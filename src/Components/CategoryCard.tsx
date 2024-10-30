import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Categories {
  Name: string;
  Image: string;
}

export default function CategoryCard({ Image, Name }: Categories) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="rounded-xl p-3 bg-slate-200 font-inter text-gray-800 mx-3 shadow-lg"
    >
      <img
        src={Image}
        alt="Category Image"
        className="w-full h-96 rounded-xl object-cover"
      />
      <p className="mt-3">{Name}</p>
    </div>
  );
}
