import React from "react";
import { Link } from "react-router-dom";
type NavMenu={
  name: string
  path: string
}
export default function Nav() {
  const nav :NavMenu[]= [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Product",
      path: "/products",
    },
    {
      name: "Users",
      path: "/users",
    },
  ];
  return (
    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
      {nav &&
        nav.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
              aria-current="page"
            >
              {item.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}
