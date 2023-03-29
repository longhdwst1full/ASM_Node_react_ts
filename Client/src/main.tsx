import React from "react";
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
import LayoutAdmin from "./pages/Admin/LayoutAdmin";

function RejectedRoute() {
  const dataLS = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : "";

  return !dataLS  ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactElement | null => {
  const dataLS = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : "";
  return dataLS && dataLS.user.role=== "admin" ? <>{children}</> : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RejectedRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <LayoutAdmin />
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
    ],
  },
  {
    path: "/products",
    element: <ListProduct />,
  },
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
