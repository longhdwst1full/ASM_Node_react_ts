import { useCallback, useEffect, useMemo, useState } from "react";
import { DataAuthResponse } from "../../../types/auth";
import * as yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  createProducts,
  getOneProduct,
  udpateProducts,
} from "../../../Apis/products";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { cateList } from "../../../Apis/category";
import { toast } from "react-toastify";
import { IProduct } from "../../../types/products.type";
import intace from "../../../Apis/https";

const validateForm = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  categoryId: yup.string().required(),
  image: yup.mixed().required("File is required"),
  price: yup.string().required(),
});

type ProductForm = Omit<IProduct, "_id" | "createdAt" | "updatedAt">;
const initiaFormState = {
  name: "",
  description: "",
  image: "",
  price: "",
  categoryId: "",
};
type FormData = yup.InferType<typeof validateForm>;

export default function Addproduct() {
  const { id } = useParams();
  const [fileImage, setFileImage] = useState<File>();
  const idParams = id as string;
  const isEdeting = useMatch("/admin/product/add");
  const isModel = Boolean(isEdeting);
  const navigate = useNavigate();

  const PreviewImage = useMemo(() => {
    return fileImage ? URL.createObjectURL(fileImage) : "";
  }, [fileImage]);

  const authentication = useMemo(() => {
    const dataLS = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : "";
    if (!dataLS) return "";
    const accessToken = (dataLS as Omit<DataAuthResponse, "message">)
      .accessToken;
    return accessToken;
  }, []);

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: initiaFormState,
    resolver: yupResolver(validateForm),
  });
  const avatar = watch("image");

  const uploadImage = useMutation({
    mutationFn: (file) => {
      return intace.post("images/upload", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError(error: any, variables, context) {
      console.log(error, variables);
      toast.error(error.message);
    },
  });
  // upload anh
  const hanleInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileName = e.target.files?.[0];
    if (fileName) {
      // console.log(a);
      setFileImage(fileName);
    }
  };

  const addProductMutation = useMutation({
    mutationFn: (body: ProductForm) =>
      createProducts({ data: body, authentication: authentication }),
    onError(error, variables, context) {
      console.log(error);
      console.log(variables, "variables");
    },
    onSuccess(data, variables, context) {
      // console.log(data, "data mutation");
      reset();
      toast.success("them thanh cong");
      navigate("/admin/products");
    },
  });
  const editQuery = useQuery({
    queryKey: ["products", id],
    queryFn: () => getOneProduct(id as string),
    enabled: id !== undefined,
    onSuccess({ data }) {
      setValue("name", data.name);
      setValue("price", data.price);
      setValue("image", data.image);
      setValue("categoryId", data.categoryId);
      setValue("description", data.description);
    },
  });
  const updateProductMutation = useMutation({
    mutationFn: (body: Omit<IProduct, "_id">) => {
      return udpateProducts({
        body,
        id: idParams,
        accessToken: authentication,
      });
    },
    onError(error, variables, context) {
      console.log(error);
      // console.log(variables, "variables");
    },
    onSuccess(data, variables, context) {
      reset();
      navigate("/admin/products");
      editQuery.refetch();
      toast.success("Sua thanh cong");
    },
  });

  // getCategory

  const { data: categoryList } = useQuery({
    queryKey: ["getCategory"],
    queryFn: cateList,
  });

  const handleSubmitForm = async (data: FormData) => {
    try {
      let imageProducts = avatar;
      if (fileImage) {
        const form = new FormData();
        form.append("images", fileImage);
        const a = await uploadImage.mutateAsync(form as any);
        if (a.data) {
          imageProducts = a.data.urls[0].url as string;
        }
      }
      if (isModel) {
        await addProductMutation.mutateAsync({
          ...data,
          image: imageProducts as string,
        });
      } else {
        updateProductMutation.mutate({
          ...(data as Omit<IProduct, "_id">),
          image: imageProducts as string,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {addProductMutation.isPaused || updateProductMutation.isError ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
      ) : (
        <>
          <p className="text-center mt-3 text-2xl font-semibold">
            {isModel && !id ? "Add products" : "Edit product"}
          </p>
          <form
            className="container m-auto"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
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
                {...register("name")}
              />
              <p className="text-red-500 my-1">{errors.name?.message}</p>
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <fieldset className="w-full space-y-1 dark:text-gray-100">
                  <label htmlFor="price" className="block text-sm font-medium">
                    Price
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      {...register("price")}
                      id="price"
                      placeholder="99 999,99"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-red-500 my-1">{errors.price?.message}</p>
                </fieldset>
              </div>
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>

                <select
                  id="countries"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  {...register("categoryId")}
                >
                  <option defaultChecked>Choose a </option>
                  {categoryList?.data &&
                    categoryList.data.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>
                <p className="text-red-500 my-1">
                  {errors.categoryId?.message}
                </p>
              </div>
            </div>
            <div className="mb-6 grid grid-cols-2">
              <div className="col-span-1 border border-green-400">
                <div className="max-w-20">
                  <img
                    src={
                      PreviewImage ||
                      (avatar ? (avatar as string) : undefined) ||
                      undefined
                    }
                    alt=""
                  />
                </div>
                <input
                  type="file"
                  {...register("image")}
                  onChange={hanleInputFile}
                />
                <p className="text-red-500 my-1">{errors.image?.message}</p>
              </div>
              <div className="col-span-1">
                {/* <label
                htmlFor="featuredImage"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Featured Image
              </label>
              <input
                type="text"
                id="featuredImage"
                {...register("image")}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Url image"
              />
              <p className="text-red-500 my-1">{errors.image?.message}</p> */}
              </div>
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
                  {...register("description")}
                />
                <p className="text-red-500 my-1">
                  {errors.description?.message}
                </p>
              </div>
            </div>

            <div>
              {isModel ? (
                <button
                  disabled={
                    addProductMutation.isLoading || uploadImage.isLoading
                  }
                  className={`group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800 ${
                    addProductMutation.isLoading || uploadImage.isLoading
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                  type="submit"
                >
                  <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                    Create
                  </span>
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={
                      updateProductMutation.isLoading || uploadImage.isLoading
                    }
                    className={`group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300   group-hover:to-lime-300 dark:text-white  dark:hover:text-gray-900 dark:focus:ring-lime-800 ${
                      updateProductMutation.isLoading || uploadImage.isLoading
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <span
                      className=" relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900"
                      aria-disabled={updateProductMutation.isLoading}
                    >
                      Update
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
                </>
              )}
            </div>
          </form>
        </>
      )}
    </>
  );
}
