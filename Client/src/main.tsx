
import 'react-toastify/dist/ReactToastify.css';import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
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
import ProductDetail from "./pages/Product/ProductDetail";
import ProductList from "./pages/Product/ProductList";
import Dashboard from "./pages/Admin/pages/Dashboard";
import Students from "./pages/Admin/pages/Students";
import NotFound from "./pages/Admin/pages/NotFound";
import AddStudent from "./pages/Admin/pages/AddStudent";
import MainLayout from "./pages/Admin/layouts/MainLayout";
import { ToastContainer } from "react-toastify";

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
    element: <App />,
    children: [
      {
        path: "",
      },
    ],
  },
  {
    path: "/product",
    element: <ProductList />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
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
        children: [
          {
            path: "listuser",
            element: <ListProduct />,
          },
          {
            path: "add",
            element: <Adduser />,
          },
          {
            path: "edit/:id",
            element: <Adduser />,
          },
          {
            path: ":id",
            element: <Adduser />,
          },
        ],
      },
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "students/:id",
        element: <AddStudent />,
      },
      {
        path: "students/add",
        element: <AddStudent />,
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
