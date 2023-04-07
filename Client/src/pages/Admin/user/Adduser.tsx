import { useMutation, useQuery } from "@tanstack/react-query";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUser } from "../../../Apis/auth";

const validateForm = yup.object({
  email: yup
    .string()
    .email("Khong dung dinh dang email")
    .required("khong duoc de trong"),
  name: yup.string(),
  password: yup
    .string()
    .min(6, "Mat khau lon hon 6 ki tu")
    .required("khong duoc de trong"),
});

const initiaFormState = {
  name: "",
  email: "",
  password: "",
};

type FormData = yup.InferType<typeof validateForm>;

export default function Adduser() {
  const { id } = useParams();
  const idParams = id as string;
  const isEdeting = useMatch("/admin/users/add");
  const isModel = Boolean(isEdeting);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: initiaFormState,
    resolver: yupResolver(validateForm),
  });

  const addProductMutation = useMutation({
    mutationKey: ["adduser"],
    mutationFn: (body: FormData) => addUser(body),
    onError(error: any, variables, context) {
      toast.error(error);
      console.log(variables, "variables");
    },
    onSuccess(data, variables, context) {
      reset();
      toast.success("them thanh cong");
      navigate("/admin/users");
    },
  });

  // const updateProductMutation = useMutation({
  //   mutationFn: (body: Omit<IProduct, "_id">) => {
  //     console.log("check id , authe", id, authentication, body);
  //     return udpateProducts({
  //       body,
  //       id: idParams,
  //       accessToken: authentication,
  //     });
  //   },
  //   onError(error, variables, context) {
  //     console.log(error);
  //     console.log(variables, "variables");
  //   },
  //   onSuccess(data, variables, context) {
  //     // console.log(data, "data mutation");
  //     reset();
  //     toast.success("Sua thanh cong");
  //     navigate("/admin/products");
  //   },
  // });
  // const editQuery = useQuery({
  //   queryKey: ["products", id],
  //   queryFn: () => getOneProduct(id as string),
  //   enabled: id !== undefined,
  //   onSuccess({ data }) {
  //     console.log(data);
  //     setValue("name", data.name);
  //     setValue("email", data.email);

  //   },
  // });

  const handleSubmitForm = async (data: FormData) => {
    try {
      if (isModel) {
        const dataRes = await addProductMutation.mutateAsync(data);
        console.log("data: ", dataRes);
      } else {
        console.log("check mutaition :", data);
        // updateProductMutation.mutate(data as Omit<IProduct, "_id">);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="space-y-12">
        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              {...register("name")}
              type="text"
              id="last-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
            <p className="text-red-500 my-1">{errors.name?.message}</p>
          </div>
        </div>
        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...register("email")}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
            />
            <p className="text-red-500 my-1">{errors.email?.message}</p>
          </div>
        </div>
        {isModel && (
          <div className="sm:col-span-4">
            <label
              htmlFor="pasword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="pasword"
                {...register("password")}
                type="pasword"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
              <p className="text-red-500 my-1">{errors.password?.message}</p>
            </div>
          </div>
        )}
        <div className="mt-10">
          {isModel ? (
            <button
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
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
                className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800"
              >
                <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
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
      </div>
    </form>
  );
}
