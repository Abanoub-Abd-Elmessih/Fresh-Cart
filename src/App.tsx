import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import { Suspense, lazy } from "react";
import ForgetPassword from "./pages/ForgetPassword";
import ResetCode from "./pages/ResetCode";
import ResetAccount from "./pages/ResetAccount";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Cart from "./pages/Cart";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";

// Lazy load the components
const Categories = lazy(() => import("./pages/Categories"));
const Products = lazy(() => import("./pages/Products"));
const SpecificProduct = lazy(() => import("./pages/SpecificProduct"));
const Brands = lazy(() => import("./pages/Brands"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));

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
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        // {
        //   path: "wishlist",
        //   element: (
        //     <Suspense>
        //       <ProtectedRoute>
        //       <WishList />
        //       </ProtectedRoute>
        //     </Suspense>
        //   ),
        // },
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
        {
          path: "resetcode",
          element: (
            <Suspense>
              <ResetCode />
            </Suspense>
          ),
        },
        {
          path: "resetAccount",
          element: (
            <Suspense>
              <ResetAccount />
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
          <CartContextProvider>
            <Toaster />
            <RouterProvider router={router} />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  );
}
