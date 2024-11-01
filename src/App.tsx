import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import  { Suspense, lazy } from "react";

// Lazy load the components
const Categories = lazy(() => import("./pages/Categories"));
const Products = lazy(() => import("./pages/Products"));
const SpecificProduct = lazy(() => import("./pages/SpecificProduct"));

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
      ],
    },
  ]);

  return (
    <div>
      <QueryClientProvider client={query}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}
