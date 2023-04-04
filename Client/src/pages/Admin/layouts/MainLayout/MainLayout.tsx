import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../../../../components/Header";

interface Props {
  children?: React.ReactNode;
}

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="grid min-h-screen grid-cols-4">
        <aside className="col-span-1" aria-label="Sidebar">
          <div className="flex h-full flex-col overflow-y-auto bg-gray-100 py-4 px-3 shadow-lg">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) => {
                    const activeClass = isActive ? "bg-gray-300" : "";
                    return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`;
                  }}
                >
                  {({ isActive }) => (
                    <span className={`ml-3 ${isActive ? "font-bold" : ""}`}>
                      Dashboard
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/category"
                  className={({ isActive }) => {
                    const activeClass = isActive ? "bg-gray-300" : "";
                    return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`;
                  }}
                >
                  {({ isActive }) => (
                    <span className={`ml-3 ${isActive ? "font-bold" : ""}`}>
                      Category
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) => {
                    const activeClass = isActive ? "bg-gray-300" : "";
                    return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`;
                  }}
                >
                  {({ isActive }) => (
                    <span className={`ml-3 ${isActive ? "font-bold" : ""}`}>
                      User
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/products"
                  className={({ isActive }) => {
                    const activeClass = isActive ? "bg-gray-300" : "";
                    return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`;
                  }}
                >
                  {({ isActive }) => (
                    <span className={`ml-3 ${isActive ? "font-bold" : ""}`}>
                      Products
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
            <div className="mt-auto">
              ©️ Copyright{" "}
             
                hoangdinhlong
             
            </div>
          </div>
        </aside>
        <main className="col-span-3 h-full py-4 px-3">
          <Outlet />
        </main>
      </div>
    </>
  );
}
