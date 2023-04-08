import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { getOneProduct } from "../../../Apis/products";
import { IProduct } from "../../../types/products.type";

export default function DetailProduct() {
  const { id } = useParams();
  const idParams = id as string;
  const imageRef = useRef<HTMLImageElement>(null);
  // const [watch, setWatch] = useState<Boolean>(false);
  const [getproduct, setProductList] = useState<IProduct>();
  const [buyCount, setBuyCount] = useState(1);
  useEffect(() => {
    try {
      getOneProduct(idParams).then((result) => {
        if (!result.data) {
          return toast.error("Khong tim thay san pham");
        }

        setProductList((pre) => {
          return { ...pre, ...result.data };
        });
      });
    } catch (error: any) {
      toast(error);
    }
  }, []);

  // add to cart
  // const addToCart =  (buyCount: number, idPro: number) => {
  //   addtoCartUser(buyCount, idPro).then((data) => {
  //     console.log(data);
  //     toast.success("Dat hang thanh cong");
  //   });
  // };

  // hover zoom ảnh
  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const image = imageRef.current as HTMLImageElement;
    const { naturalHeight, naturalWidth } = image;

    const offsetX = e.pageX - (rect.x + window.scrollX);
    const offsetY = e.pageY - (rect.y + window.scrollX);

    const top = offsetY * (1 - naturalHeight / rect.height);
    const left = offsetX * (1 - naturalWidth / rect.width);

    image.style.width = naturalWidth + "px";
    image.style.height = naturalHeight + "px";
    image.style.maxWidth = "unset";
    image.style.top = top + "px";
    image.style.left = left + "px";

    // even bubble
  };

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute("style");
  };

  if (!getproduct) return null;
  return (
    <>
      {(getproduct as IProduct) && Object.keys(getproduct).length > 0 && (
        <div className="w-full m-auto">
          <div className="border border-y-[1px] py-2 flex shadow-md">
            <nav className=" w-3/4 m-auto text-[#707070]">
              <Link to="/" className="py-2 pr-3">
                Trang chu
              </Link>
              <Link to="/" className="py-2 pr-3">
                Dien thoai
              </Link>
              <Link to="/" className="py-2 pr-3">
                Sam sung
              </Link>
              <Link to="#" className="py-2 pr-3">
                {getproduct.name}
              </Link>
            </nav>
          </div>
          <div className="py-2.5 border-b-2 border-gray-100">
            <div className="text-lg w-3/4 m-auto">{getproduct.name}</div>
          </div>
          <div className="w-3/4 m-auto grid grid-cols-12 mt-9 gap-10">
            <div className="col-span-5">
              <div
                className="relative  w-full cursor-zoom-in overflow-hidden pt-[100%] shadow"
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  className="absolute top-0 left-0 h-full w-full bg-white object-cover"
                  src={getproduct.image}
                  ref={imageRef}
                  alt={getproduct.name}
                />
              </div>
            </div>

            <div className="col-span-7 flex flex-col pb-2 ">
              <div className=" flex mb-7 items-start-0 flex-col">
                <h2 className="text-2xl font-semibold p-2">
                  {getproduct.name}
                </h2>

                <p className="font-semibold text-3xl p-2 text-red-500">
                  <span>{getproduct.price}</span> đ
                </p>
              </div>
              <div className="flex-1 text-[#444444] ">
                <p className="row-span-1">{getproduct.description}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => {}}
                  type="button"
                  className="px-10 min-w-[200px] mr-10 py-3 font-semibold rounded bg-[#FF3945] text-white"
                >
                  Mua ngay
                </button>
                <div
                  className="flex gap-2 h-auto"
                  onClick={() => {
                    // addToCart(buyCount, getproduct.id);
                  }}
                >
                  <div className="flex-1 cursor-pointer rounded-md flex justify-center items-center border border-[#FF3945]">
                    <i className="fa-solid py-1.5  px-2.5 text-lg block fa-cart-shopping text-[#eb0000]"></i>
                  </div>
                  <div className="w-20 cursor-pointer text-start capitalize text-sm">
                    Them vao gio hang
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* desc */}
          {/* <div className="w-3/4 m-auto mt-10 overflow-hidden">
            <div className=" bg-[#F2F2F2] p-2">
              <h3 className="text-[#D70018] text-lg mb-2 text-center">
                ĐẶC ĐIỂM NỔI BẬT
              </h3>
              <div
                className={`${
                  !watch
                    ? "-webkit-box-orient-vertical  overflow-hidden max-h-[150vh] block p-5"
                    : "h-auto"
                }`}
              >
                <div className="-webkit-line-clamp-3">
                  <div
                    dangerouslySetInnerHTML={{ __html: getproduct.description }}
                  ></div>
                </div>
              </div>
            </div>
           
            <div className="text-center mt-4">
              <button
                type="button"
                className="px-8 text-center py-3 font-semibold border rounded border-gray-800"
                onClick={() => setWatch(!watch)}
              >
                {watch ? "Thu gon" : "Xem them"}
              </button>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}
