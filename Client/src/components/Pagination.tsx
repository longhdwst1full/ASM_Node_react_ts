import { Link } from "react-router-dom";
import { IDataResponseProduct } from "../types/products.type";
interface Props {
  totalPage: IDataResponseProduct | {};
  setKeyQuery: React.Dispatch<React.SetStateAction<{
    _limit: number;
    _page: number;
    _sort: string;
}>>
}
export default function Pagination({ setKeyQuery, totalPage }: Props) {
  // console.log("queryProducts",queryProducts)
  // if(!queryProducts.docs) return null;
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        {Array(totalPage)
          .fill(0)
          .map((_, index) => (
            <li key={index + "df"}>
              <Link
              onClick={()=>setKeyQuery(pre=>({...pre, _page: index+1}))}
                to={`/admin/products?_page=${index + 1}`}
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {index + 1}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
