import { useQuery } from "@tanstack/react-query";
import { productList1 } from "../../../Apis/products";
import { useState } from "react";
import Product from "../../../components/Product";
const limit = 10;
export default function ProductList() {
  const [keyQuery, setKeyQuery] = useState({
    _limit: limit,
    _page: 1,
    _sort: "createdAt",
    _order: "asc",
  });
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["Products", keyQuery],
    queryFn: () => productList1(keyQuery),
  });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
      ) : (
        <main className="w-[calc(100%-10%)] m-auto">
          <h1 className="text-3xl font-bold py-2.5">Điện thoại nổi bật </h1>
          <div className="w-[calc(100%-2%)] m-auto grid grid-cols-6 gap-x-6 gap-y-10">
            {data?.data.docs &&
              data.data.docs.map((product, index) => (
                <Product product={product} key={index} />
              ))}
          </div>
        </main>
      )}
    </>
  );
}
