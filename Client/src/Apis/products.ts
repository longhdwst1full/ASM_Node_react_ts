import { Product } from "../types";
import intace from "./https";

const createProducts = ({
  data,
  authentication,
}: {
  data: Pick<Product, "name" | "image" | "description">;
  authentication: string;
}) =>
  intace.post("/add-product", data, {
    headers: {
      Authorization: `Bearer ${authentication}`,
      "Content-Type": "application/json",
    },
  });

const productList1 = async () => intace.get<Product[]>("/products");

const getOneProduct = (id: string) => intace.get<Product>("/products/" + id);

const deleteProducts = ({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) =>
  intace.delete("/delete-product/" + id, {
    headers: {
      "Authorization": "Bearer " + accessToken,
      "Content-Type": "application/json"
    },
  });

export { createProducts, productList1, getOneProduct, deleteProducts };
