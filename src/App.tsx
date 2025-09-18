import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProductsPage from "./pages/Products/Products.tsx";
import Customers from "./pages/Customers.tsx";
import { productsLoader } from "./pages/Products/productsLoader.ts";

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
      {
        path: "/customers",
        element: <Customers />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
