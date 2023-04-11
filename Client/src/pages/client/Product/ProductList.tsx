import { useQuery } from "@tanstack/react-query";
import { productList1 } from "../../../Apis/products";
import {   useMemo, useState } from "react";
import Product from "../../../components/Product";
import Pagination from "../../../components/Pagination";
import SortProducts from "../../../components/SortProducts";
import { useSearchParams } from "react-router-dom";
const limit = 10;
export interface ISearch {
  _limit: number;
  _page: number;
  _sort: string;
  _order: string;
}

export default function ProductList() {
  const [keyQuery, setKeyQuery] = useState<ISearch>({
    _limit: limit,
    _page: 1,
    _sort: "createdAt",
    _order: "asc",
  });
  const [searchParams] = useSearchParams();
  // console.log("searchParams: ", );
  const getSearchParam = useMemo(
    () => Object.fromEntries([...searchParams]),
    [Object.fromEntries([...searchParams])]
  );
  const keySearch: ISearch = {
    _limit: Number(getSearchParam._limit) || 10,
    _page: Number(getSearchParam._page) || 1,
    _sort: getSearchParam._sort,
    _order: getSearchParam._order||"asc",
  };
  
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["Products", keySearch],
    queryFn: () => productList1(keySearch),
  });
// console.log(data)
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
      ) : (
        <main className="w-[calc(100%-10%)] m-auto">
          <h1 className="text-3xl font-bold py-2.5">Điện thoại nổi bật </h1>

          {data?.data.docs && (
            <>
              <SortProducts keyQuery={keySearch} />
              <div className="w-[calc(100%-2%)] m-auto grid grid-cols-5 gap-x-6 gap-y-10">
                {data.data.docs.map((product, index) => (
                  <Product product={product} key={index} />
                ))}
              </div>
              <div className="text-center py-3">
                <Pagination
                  setKeyQuery={keySearch}
                  totalPage={data.data.totalPages}
                  controlPage={{
                    hasPrevPage: data.data.hasPrevPage,
                    hasNextPage: data.data.hasNextPage,
                    prevPage: data.data.prevPage,
                    nextPage: data.data.nextPage,
                    page: data.data.page,
                  }}
                />
              </div>
            </>
          )}
        </main>
      )}
    </>
  );
}
