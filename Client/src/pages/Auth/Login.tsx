import axios from "axios";
import { useForm } from "react-hook-form";
import { UserLogin } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import intace from "../../Apis/https";
import { loginSubmit } from "../../Apis/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Khong dung dinh dang email")
    .required("khong duoc de trong"),
  password: yup.string().required("khong duoc de trong"),
});
type FormData = yup.InferType<typeof validationSchema>;

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const [form, setForm] = useState({ email: "", password: "" });
  const navigation = useNavigate();
  const handleSubmitForm = async (data: FormData) => {
    try {
      const res = await loginSubmit(data as UserLogin);
      console.log(res);
      if (res) {
        console.log(res.data);

        // const user= ;
        alert("Dang nhap thanh cong");
        console.log(res);
        localStorage.setItem(
          "user",
          JSON.stringify({ user: res.data, accessToken: res.accessToken })
        );

        navigation("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  onChange={(e) =>
                    setForm((pre) => ({ ...pre, email: e.target.value }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                />
                <p className="text-red-500 my-1">{errors.email?.message}</p>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <p className="my-1 text-red-500">{errors.password?.message}</p>
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
