import { IDataResponseProduct, IProduct } from "../types/products.type";
import intace from "./https";

const createProducts = ({
  data,
  authentication,
}: {
  data: Omit<IProduct, "_id" | "updatedAt" | "createdAt">;
  authentication: string;
}) =>
  intace.post("/add-product", data, {
    headers: {
      Authorization: `Bearer ${authentication}`,
      "Content-Type": "application/json",
    },
  });

const productList1 = async (query: {
  _limit: number;
  _page: number;
  _sort: string;
  _order:string;
}) =>
  await intace.get<IDataResponseProduct>(
    `/products?_limit=${query._limit}&_page=${query._page}&_sort=${query._sort}&_order=${query._order}`
  );

const getOneProduct = (id: string) => intace.get<IProduct>("/products/" + id);

const deleteProducts = ({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) =>
  intace.delete("/delete-product/" + id, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });

const udpateProducts = ({
  body,
  id,
  accessToken,
}: {
  body: Omit<IProduct, "_id">;
  id: string;
  accessToken: string;
}) => {
  // console.log(accessToken,id,body," admin");
  return intace.patch(`/edit-product/${id}`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export {
  createProducts,
  productList1,
  udpateProducts,
  getOneProduct,
  deleteProducts,
};
