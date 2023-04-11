import { useEffect, useMemo, useState } from "react";
import { ICartList } from "../../type/carrt.type";
import { Link } from "react-router-dom";
import { deleteCart, descCount, getCartList } from "../../api/cart";
import { toast } from "react-toastify";

export default function CartList() {
  const [count, setCount] = useState<number>(1);
  const [cartList, setCatList] = useState<ICartList[] | []>([]);
  const totalPrice = useMemo(() => cartList, [cartList]);

  const totalCurrentPurchasePrice = useMemo(
    () =>
      (totalPrice as ICartList[]).reduce((result, current) => {
        return result + current.count * Number(current.product.price);
      }, 0),
    [totalPrice]
  );
  console.log("total", totalCurrentPurchasePrice);

  useEffect(() => {
    getCartList().then(({ data }) => setCatList(data));
  }, []);

  const handleDeleteCart = (id: number) => {
    const ab = confirm("Are you sure you want to delete");
    if (ab) {
      setCatList(cartList.filter((item) => item.id !== id));
      deleteCart(id).then((data) => {
        console.log(data);
        toast.success("Xoas thanfh coong");
      });
    }
  };
  const handleDescByCout = (id: number) => {
    if (count === 1) {
      toast.error("Khong the giam so luong");
      return;
    }
    setCount((pre) => pre + 1);
    descCount(count, id).then((data) => {
      // toast.success("")
      console.log(data);
    });
  };
  const handleOnchangInput = (value: number | string, id: number) => {
    // console.log(e.target.value);
    // // if (typeof(value) == "string") {
    //   toast.error("Moi ban nhap vao so");
    //   return
    // }

    setCount(value as number);
    descCount(count, id).then((data) => {
      // toast.success("")
      console.log(data);
    });
  };
  const handleAscByCout = () => {
    console.log();
  };
  return (
    <div className="bg-[#E5E5E5]">
      <div className="w-1/2  m-auto pb-10">
        <div className="py-3.5 text-[#D70018]  grid grid-cols-2 mb-4">
          <Link to="/" className=" px-1 cursor-pointer">
            <i className="mr-1 text-black fa-solid fa-chevron-left"></i>Trở về
          </Link>
          <p className="text-lg font-semibold">Giỏ hàng</p>
        </div>
        <div className="flex flex-col gap-5">
          {cartList &&
            cartList.length > 0 &&
            cartList.map((cart) => (
              <div
                key={cart.id + "as"}
                className="grid p-2.5 grid-cols-3 border shadow-lg relative rounded-2xl bg-white"
              >
                <i
                  onClick={() => handleDeleteCart(cart.id)}
                  className="absolute cursor-pointer top-2 text-ellipsis p-1 right-3.5 fa-solid fa-xmark"
                ></i>

                <div className="col-span-1  w-[193px] m-auto">
                  <img
                    className="w-full object-cover"
                    src={cart.product.images[0].base_url}
                    alt=""
                  />
                </div>
                <div className="col-span-2">
                  <h2>{cart.product.name}</h2>
                  <div className=" flex mt-1 mb-2 justify-content items-center">
                    {/* price */}
                    <p className="font-semibold text-base text-red-500">
                      <span>{cart.product.price}</span>d
                    </p>
                    <p className="ml-4 text-[#707070] text-sm">
                      <span className="">{cart.product.original_price}</span>d
                    </p>
                    <div className=" ml-2.5 px-1 py-1 font-normal text-xs rounded bg-[#D70018] text-white">
                      Giảm 27%
                    </div>
                  </div>
                  {/* quantity */}

                  <div className="flex gap-2 items-center">
                    Chọn số lượng:
                    <label htmlFor="Quantity" className="sr-only">
                      Quantity
                    </label>
                    <div className="flex items-center rounded border justify-center border-gray-200 max-h-8">
                      <button
                        type="button"
                        className="w-6 leading-10 text-gray-600 transition hover:opacity-75"
                        onClick={handleAscByCout}
                      >
                        −
                      </button>

                      <input
                        type="number"
                        id="Quantity"
                        value={count}
                        className="h-6 w-10 border-y-0 border-x-[1px] border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                        onChange={(e) => setCount(cart.count)}
                        onBlur={(e) => {
                          setCount(cart.count);
                          handleOnchangInput(e.target.value, cart.id);
                        }}
                      />

                      <button
                        type="button"
                        className=" w-6 leading-10 text-gray-600 transition hover:opacity-75"
                        onClick={() => handleDescByCout(cart.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* desc */}
                  <div className="bg-[#F6F6F6] mt-2 p-1">
                    <p>- Chương trình khuyến mại:</p>
                    <ul className="pl-4 ml-3">
                      <li className="mb-1">
                        Dịch vụ phòng chờ hạng thương gia tại sân bay
                      </li>
                      <li className="mb-1">
                        Ưu đãi Galaxy gift lên đến 1.700.000đ (VieON VIP HBO GO,
                        Zing MP3, Phúc Long, Galaxy Play)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className=" mt-10 rounded-xl flex flex-col gap-2 bg-white/90 shadow-2xl p-2">
          <p className="flex justify-between items-center my-2">
            <span>Tổng tiền tạm tính:</span>
            <span className="text-red-500">
              {totalCurrentPurchasePrice ? totalCurrentPurchasePrice : 0}₫
            </span>
          </p>
          <button
            type="button"
            className="flex-1 py-3 rounded bg-[#DC3545] text-white"
          >
            Tiến hành đặt hàng
          </button>
          <Link
            to="/"
            className="flex-1 text-center py-3 rounded mt-2 border border-[#DC3545] text-[#DC3545] mb-4 bg-white"
          >
            Chọn thêm sản phẩm khác
          </Link>
        </div>
      </div>
    </div>
  );
}
