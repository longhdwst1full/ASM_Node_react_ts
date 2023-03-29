import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ListProduct from "./products/ListProduct";

export default function LayoutAdmin() {
  return (
    <div>
      <Header />
      <Outlet/>
    </div>
  );
}
