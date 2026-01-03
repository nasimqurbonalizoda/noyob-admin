import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/login";
import Layout from "./layout/layout";
import Orders from "./pages/orders/orders";
import Brand from "./pages/brands/brand";
import Product from "./pages/products/product";
import Dashboard from "./pages/dashBoard/dashboard";
import Categories from "./pages/categories/category";
import Colors from "./pages/colors/colors";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Orders /> },
      { path: "orders", element: <Orders /> },
      { path: "brands", element: <Brand /> },
      { path: "product", element: <Product /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "category", element: <Categories /> },
      { path: "colors", element: <Colors /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;