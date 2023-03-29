import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { DataAuthResponse, Product } from "../../../types";
import * as yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProducts, getOneProduct } from "../../../Apis/products";
import { useMatch, useParams } from "react-router-dom";

const validateForm = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  image: yup.string(),
});

type ProductForm = Omit<Product, "__v" | "_id">;
const initiaFormState = {
  name: "",
  description: "",
  image: "",
};

export default function Addproduct() {
  const [formData, setFormData] = useState<ProductForm>(initiaFormState);
  const { id } = useParams();
  const isEdeting = Boolean(useMatch("/product/add/"));

  console.log(isEdeting);
  const authentication = useMemo(
    () => localStorage.getItem("accessToken") || "",
    []
  );

  const addProductMutation = useMutation({
    mutationFn: (body: ProductForm) =>
      createProducts({ data: body, authentication: authentication }),
    onError(error, variables, context) {
      console.log(error);
      console.log(variables, "variables");
    },
    onSuccess(data, variables, context) {
      console.log(data, "data mutation");
    },
  });

  const editQuery = useQuery({
    queryKey: ["products", id],
    queryFn: () => getOneProduct(id as string),
    enabled: id !== undefined,
    onSuccess(data) {
      console.log(data.data);
      setFormData(data.data);
    },
  });
  const updateProductMutation = useMutation({
    mutationFn: (body: ProductForm) =>
      createProducts({ data: body, authentication: authentication }),
    onError(error, variables, context) {
      console.log(error);
      console.log(variables, "variables");
    },
    onSuccess(data, variables, context) {
      console.log(data, "data mutation");
    },
  });
  useEffect(() => {
    if (editQuery.data) {
      // console.log(editQuery.data.data);
      setFormData(editQuery.data.data);
    }
  }, [editQuery.data?.data]);

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const dataRes = await addProductMutation.mutateAsync(formData);
      console.log("data: ", dataRes);

      setFormData(initiaFormState);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>

    {isEdeting && !id ? "Add products":"Edit product"}
      <form className="container m-auto" onSubmit={handleSubmitForm}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="title"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder=""
            onChange={(e) =>
              setFormData((pre) => ({ ...pre, name: e.target.value }))
            }
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="featuredImage"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Featured Image
          </label>
          <input
            type="text"
            id="featuredImage"
            onChange={(e) =>
              setFormData((pre) => ({ ...pre, image: e.target.value }))
            }
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Url image"
            required
          />
        </div>
        <div className="mb-6">
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Your description..."
              onChange={(e) =>
                setFormData((pre) => ({ ...pre, description: e.target.value }))
              }
            />
          </div>
        </div>

        <div>
          <button
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
            type="submit"
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              Crate
            </span>
          </button>
          <button
            type="submit"
            className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800"
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              Update Post
            </span>
          </button>
          <button
            type="reset"
            className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400"
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              Cancel
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
