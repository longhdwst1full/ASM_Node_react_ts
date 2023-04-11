
import { useMatch, useNavigate } from "react-router-dom";
import { ISearch } from "../pages/client/Product/ProductList";
interface Props {
  keyQuery:ISearch
}
export default function SortProducts({ keyQuery }: Props) {
  const navigate = useNavigate();
  const adminPage = useMatch("/admin/*");
  const isModel = Boolean(adminPage);

  const handleSort = (value :string) => {
    const params = new URLSearchParams();
    params.set('_order', keyQuery._order||"");
    params.set('_limit', keyQuery._limit.toString());
    params.set('_page', keyQuery._page.toString());
    params.set('_sort', value);

    navigate({
      pathname: isModel ? "/admin/products" : "/",
      search: params.toString(),
    });
  };

  const handlePrice = (value: string) => {
    const params = new URLSearchParams();
    params.set('_order', value);
    params.set('_limit', keyQuery._limit.toString());
    params.set('_page', keyQuery._page.toString());
    params.set('_sort', keyQuery._sort);
  
    navigate({
      pathname: isModel ? "/admin/products" : "/",
      search: params.toString(),
    });
  };
  return (
    <div>
      <div className="bg-gray-300/40 py-4 px-3 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex my-2  flex-wrap items-center gap-2">
            <div>Sắp xếp theo</div>
            <button
              className="h-8 px-4 text-center text-sm capitalizebg-orange  hover:bg-orange/80
              bg-white text-black hover:bg-slate-100"
              onClick={() =>
                handleSort("createdAt")
              }
            >
              Phổ biến
            </button>
            <button
              className="h-8 px-4 text-center text-sm capitalize  bg-orange  hover:bg-orange/80 bg-white text-black hover:bg-slate-100"
              onClick={() =>
                handleSort("updatedAt")
              }
            >
              Mới nhất
            </button>
            <button
              className="h-8 px-4 text-center text-sm capitalize  bg-orange    hover:bg-orange/80 bg-white text-black hover:bg-slate-100"
              onClick={() =>handleSort("price")}
            >
              Gia
            </button>
            <select
              className="h-8  px-4 text-left text-sm capitalize  outline-none bg-orange  hover:bg-orange/80 bg-white text-black hover:bg-slate-100"
              onChange={(e) =>handlePrice(e.target.value)}
            >
              <option value="" disabled className="bg-white text-black">
                Giá|| Order
              </option>
              <option value="asc" className="bg-white text-black">
                Giá: Thấp đến cao
              </option>
              <option value="desc" className="bg-white text-black">
                Giá: Cao đến thấp
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
