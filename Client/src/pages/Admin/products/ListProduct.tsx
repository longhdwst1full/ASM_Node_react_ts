import Pagination from "../../../components/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { deleteProducts, productList1 } from "../../../Apis/products";
import { toast } from "react-toastify";
import { cateList } from "../../../Apis/category";
import { IProduct } from "../../../types/products.type";

type ProductType = IProduct[];
export default function ListProduct() {
  const [keyQuery, setKeyQuery] = useState({
    _limit: 10,
    _page: 1,
    _sort: "",
  });
  // get category list
  const { data: categoryList } = useQuery({
    queryKey: ["getCategory"],
    queryFn: cateList,
  });

  const [products, setProductList] = useState<ProductType>([]);
  const accessToken = useMemo(() => {
    const dataLS = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : "";
    return dataLS.accessToken;
  }, []);
  // delete
  // product
  const deleteProductsMutation = useMutation({
    mutationFn: (id: string) => deleteProducts({ id, accessToken }),
    onSuccess: (data, id) => {
      toast.success("Xoa thanh cong");
    },
  });

  const getDataList = useQuery({
    queryKey: ["Products",keyQuery],
    queryFn: ()=>productList1(keyQuery),
    onSuccess: ({ data }) => {
      // console.log(data.docs, "product");
      setProductList(data.docs);
    },
  });
  // console.log("product", getDataList.data?.data);

  const handleDelete = (id: string) => {
    setProductList(products.filter((item) => item._id !== id));
    deleteProductsMutation.mutateAsync(id);
  };
  // console.log(categoryList?.data);

  return (
    <>
      {getDataList.data?.data && products && (
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
                  <th scope="col" colSpan={2} className="px-6 text-center py-3">
                    <Link
                      to="/admin/product/add"
                      className="p-2  text-blue-600"
                    >
                      Add
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.length > 0 &&
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
                        <img
                          className="w-44"
                          src={product.image}
                          alt={product.name}
                        />
                      </td>
                      <td className="px-6 py-4">
                        {categoryList?.data &&
                          categoryList?.data.map((item) => {
                            if (item._id === product.categoryId) {
                              return item.name;
                            }
                          })}
                      </td>
                      <td className="px-6 py-4">
                        {product.price ? product.price : "1000"}
                      </td>
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
          <div className="text-center">
            <Pagination setKeyQuery={setKeyQuery} totalPage={getDataList.data?.data.totalPages} />
          </div>
        </>
      )}
      <Outlet />
    </>
  );
}
