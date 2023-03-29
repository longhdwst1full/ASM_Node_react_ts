import React, { useEffect, useState } from "react";
import { getAccountAdmin } from "./auth";
import intace from "./https";
import { DataAuthResponse, User } from "../types";
type Props = {
  children: React.ReactNode;
};

export default function CheckPermistion() {
  
  const accessToken: string = localStorage.getItem("accessToken") || "";
  const [isAdmin, setIsAdmin] = useState<DataAuthResponse | {}>({});
  useEffect(() => {
    intace
      .get<DataAuthResponse>("/admin", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setIsAdmin(data.data);
        localStorage.setItem("id", (isAdmin as DataAuthResponse).data._id);
        localStorage.setItem("accessToken", (isAdmin as DataAuthResponse).accessToken);
      });
  }, []);
 return (isAdmin as DataAuthResponse).data
}
