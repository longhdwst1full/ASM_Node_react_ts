import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "flowbite";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ListProduct from "./pages/Admin/products/ListProduct";
import ListUser from "./pages/Admin/user/ListUser";
import Addproduct from "./pages/Admin/products/Addproduct";
import Adduser from "./pages/Admin/user/Adduser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductList from "./pages/client/Product/ProductList";
import Dashboard from "./pages/Admin/Dashboard";
import NotFound from "./pages/client/NotFound";
import MainLayout from "./pages/Admin/layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import LayoutManin from "./pages/client/LayoutManin";
import ListCate from "./pages/Admin/category/ListCate";
import Addcate from "./pages/Admin/category/AddCate";
import DetailProduct from "./pages/client/Product/DetailProduct";
import App from "./App";


function RejectedRoute() {
  const dataLS = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : "";

  return !dataLS ? <Outlet /> : <Navigate to="/" />;
}
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactElement | null => {
  const dataLS = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : "";
  return dataLS && dataLS.user.role === "admin" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutManin />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "category",
        element: <ProductList />,
      },

      {
        path: "products",
        element: <ProductList />,
      },

      {
        path: ":id/product",
        element: <DetailProduct />,
      },
      {
        path: "user",
      },
    ],
  },

  {
    path: "/",
    element: <RejectedRoute />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "products",
        element: <ListProduct />,
      },
      {
        path: "product/add",
        element: <Addproduct />,
      },
      {
        path: "product/:id/edit",
        element: <Addproduct />,
      },
      {
        path: "product/:id",
        element: <Addproduct />,
      },
      {
        path: "users",
        element: <ListUser />,
      },

      {
        path: "users/listuser",
        element: <ListProduct />,
      },
      {
        path: "users/add",
        element: <Adduser />,
      },
      {
        path: "users/:id/edit",
        element: <Adduser />,
      },
      {
        path: "users/:id",
        element: <Adduser />,
      },

      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "category",
        element: <ListCate />,
      },
      {
        path: "category/:id/edit",
        element: <Addcate />,
      },
      {
        path: "category/add",
        element: <Addcate />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>
);
