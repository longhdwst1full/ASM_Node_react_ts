import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { deleteProducts, productList1 } from "../../../Apis/products";
import { Product } from "../../../types";
import { toast } from "react-toastify";

type ProductType = Pick<Product, "_id" | "name" | "image">[];
export default function ListProduct() {
  const [products, setProductList] = useState<ProductType>([]);
  const accessToken = useMemo(() => {
    const dataLS = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : "";
      return dataLS.accessToken
  }, []);
  // delete
  const deleteProductsMutation = useMutation({
    mutationFn: (id: string) => deleteProducts({ id, accessToken }),
    onSuccess: (data, id) => {
      toast.success("Xoa thanh cong");
    },
  });

  const getDataList = useQuery({
    queryKey: ["Products"],
    queryFn: productList1,
    onSuccess: (data) => {
      setProductList(data.data);
    },
  });

  const handleDelete = (id: string) => {
    deleteProductsMutation.mutate(id);
  };
  // console.log(products);
  return (
    <>
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  <Link to="/admin/product/add">Add</Link>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">
                      <img src={product.image} alt={product.name} />
                    </td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
      <Outlet />
    </>
  );
}
