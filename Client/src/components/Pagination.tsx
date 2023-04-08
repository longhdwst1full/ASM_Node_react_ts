import { Link } from "react-router-dom";
import { IDataResponseProduct } from "../types/products.type";
interface Props {
  controlPage: {
    hasPrevPage: Boolean;
    hasNextPage: Boolean;
    prevPage: number | null;
    nextPage: number | null;
    page: number;
  };
  totalPage: IDataResponseProduct | {};
  setKeyQuery: React.Dispatch<
    React.SetStateAction<{
      _limit: number;
    _page: number;
    _sort: string;
    _order: string;
    }>
  >;
}
export default function Pagination({
  setKeyQuery,
  totalPage,
  controlPage,
}: Props) {
  console.log("queryProducts");
  // if(!queryProducts.docs) return null;
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <Link
            to="/admin/products"
            onClick={() => {
              if (controlPage.hasPrevPage && controlPage.prevPage) {
                let number_page = controlPage.prevPage;
                setKeyQuery((pre) => ({ ...pre, _page: number_page }));
              }
            }}
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
                  onClick={() =>
                    setKeyQuery((pre) => ({ ...pre, _page: index + 1 }))
                  }
                  to={`/admin/products?_page=${index + 1}`}
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
            onClick={() => {
              if (controlPage.hasNextPage && controlPage.nextPage) {
                let number_page = controlPage.nextPage;
                setKeyQuery((pre) => ({ ...pre, _page: number_page }));
              }
            }}
            to="/admin/products"
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
