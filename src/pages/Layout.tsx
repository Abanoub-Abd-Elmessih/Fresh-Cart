import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ScrollToTopBtn from "../Components/ScrollToTopBtn";
import ScrollToTop from "../Components/ScrollToTop";

export default function Layout() {
  return (
    <div>
        <Navbar/>
        <ScrollToTop/>
        <Outlet/>
        <ScrollToTopBtn/>
        <Footer/>
    </div>
  )
}
