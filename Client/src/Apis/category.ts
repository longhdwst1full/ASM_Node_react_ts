import { Category } from "../types";
import intace from "./https";

const createCate = ({
  data,
  authentication,
}: {
  data: Pick<Category, "name">;
  authentication: string;
}) =>
  intace.post("/categories", data, {
    headers: {
      Authorization: `Bearer ${authentication}`,
      "Content-Type": "application/json",
    },
  });

const cateList = async () => intace.get<Category[]>("/categories");

const getOneCate = (id: string) => intace.get<Category>("/categories/" + id);

const deleteCate = ({ id, accessToken }: { id: string; accessToken: string }) =>
  intace.delete("/categories/" + id, {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });

const udpateCate = ({
  body,
  id,
  accessToken,
}: {
  body: Omit<Category, "_id">;
  id: string;
  accessToken: string;
}) => {
  console.log(accessToken, id, body, " admin");
  return intace.patch(`/categories/${id}`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export { createCate, cateList, udpateCate, getOneCate, deleteCate };
