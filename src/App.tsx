import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import { Suspense, lazy } from "react";
import AuthContextProvider from "./Context/AuthContext";

// Lazy load the components
const Categories = lazy(() => import("./pages/Categories"));
const Products = lazy(() => import("./pages/Products"));
const SpecificProduct = lazy(() => import("./pages/SpecificProduct"));
const Brands = lazy(() => import("./pages/Brands"));
const Cart = lazy(() => import("./pages/Cart"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const ForgetPassword = lazy(() => import("./pages/forgetPassword"));

export default function App() {
  const query = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "Products",
          element: (
            <Suspense>
              <Products />
            </Suspense>
          ),
        },
        {
          path: "Categories",
          element: (
            <Suspense>
              <Categories />
            </Suspense>
          ),
        },
        {
          path: "/Products/specificProduct/:id",
          element: (
            <Suspense>
              <SpecificProduct />
            </Suspense>
          ),
        },
        {
          path: "Brands",
          element: (
            <Suspense>
              <Brands />
            </Suspense>
          ),
        },
        {
          path: "Cart",
          element: (
            <Suspense>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "Signup",
          element: (
            <Suspense>
              <Signup />
            </Suspense>
          ),
        },
        {
          path: "Login",
          element: (
            <Suspense>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "forgetpassword",
          element: (
            <Suspense>
              <ForgetPassword />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <div>
      <QueryClientProvider client={query}>
        <AuthContextProvider>
        <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  );
}
