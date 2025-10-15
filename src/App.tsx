import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import ProductsPage from "./pages/products/Products.tsx";
import { productsLoader } from "./pages/products/productsLoader.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
        loader: productsLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
