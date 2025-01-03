import { useContext, useState } from "react";
import Logo from "../assets/favicon.png";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken } = useContext(AuthContext);

  return (
    <nav className="bg-white border-gray-200 font-inter shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-emerald-500 text-2xl font-semibold whitespace-nowrap">
            Fresh Cart
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <NavLink
                onClick={() => setIsOpen(false)}
                to={"/"}
                className="duration-300 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-500 md:p-0"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsOpen(false)}
                to={"/Categories"}
                className="duration-300 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-500 md:p-0"
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsOpen(false)}
                to={"/Products"}
                className="duration-300 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-500 md:p-0"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsOpen(false)}
                to={"/Cart"}
                className="duration-300 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-500 md:p-0"
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsOpen(false)}
                to={"/wishlist"}
                className="duration-300 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-500 md:p-0"
              >
                wishlist
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsOpen(false)}
                to={"/Brands"}
                className="duration-300 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-500 md:p-0"
              >
                Brands
              </NavLink>
            </li>
            {token ? (
              <li>
                <NavLink
                  onClick={() => {
                    setIsOpen(false);
                    setToken("");
                  }}
                  to={"/Login"}
                  className="duration-300 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-500 md:p-0"
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to={"/Login"}
                  className="duration-300 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-500 md:p-0"
                >
                  Login or Signup
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
