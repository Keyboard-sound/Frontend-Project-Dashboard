import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import ProductsPage from "./pages/products/Products.tsx";
import Customers from "./pages/Customers.tsx";
import { productsLoader } from "./pages/products/productsLoader.ts";
// import { dashboardLoader } from "./pages/dashboard/dashboardLoader.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        // loader: dashboardLoader,
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
