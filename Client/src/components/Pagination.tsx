import { Link, useMatch, useNavigate } from "react-router-dom";
import { IDataResponseProduct } from "../types/products.type";
import { ISearch } from "../pages/client/Product/ProductList";
interface Props {
  controlPage: {
    hasPrevPage: Boolean;
    hasNextPage: Boolean;
    prevPage: number | null;
    nextPage: number | null;
    page: number;
  };
  totalPage: IDataResponseProduct | {};
  setKeyQuery: ISearch;
}

export default function Pagination({
  setKeyQuery,
  totalPage,
  controlPage,
}: Props) {
  const adminPage = useMatch("/admin/*");
  const isModel = Boolean(adminPage);
  const navigate = useNavigate();

  const handleSort = (value: string | number) => {
    console.log(value);
    const params = new URLSearchParams();
    params.set("_order", setKeyQuery._order || "");
    params.set("_limit", setKeyQuery._limit.toString());
    params.set("_page", value as string);
    params.set("_sort", setKeyQuery._sort || "");

    navigate({
      pathname: isModel ? "/admin/products" : "/",
      search: params.toString(),
    });
  };
 
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <Link
            to={
              isModel
                ? `/admin/products?_page=${
                    controlPage.hasPrevPage && controlPage.prevPage
                      ? controlPage.prevPage
                      : controlPage.page
                  }`
                : `?_page=${
                    controlPage.hasPrevPage && controlPage.prevPage
                      ? controlPage.prevPage
                      : controlPage.page
                  }`
            }
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
        {Array(totalPage)
          .fill(0)
          .map((_, index) => {
            return (
              <li key={index + "df"}>
                <Link
                  onClick={() => handleSort(index + 1)}
                  to={
                    isModel
                      ? `/admin/products?_page=${index + 1}`
                      : `?_page=${index + 1}`
                  }
                  className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  
                  ${controlPage.page === index + 1 ? "!bg-green-400" : ""}`}
                >
                  {" "}
                  {index + 1}
                </Link>
              </li>
            );
          })}
        <li>
          <Link
            to={
              isModel
                ? `/admin/products?_page=${
                    controlPage.hasNextPage && controlPage.nextPage
                      ? controlPage.nextPage
                      : controlPage.page
                  }`
                : `?_page=${
                    controlPage.hasNextPage && controlPage.nextPage
                      ? controlPage.nextPage
                      : controlPage.page
                  }`
            }
            className={`block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
