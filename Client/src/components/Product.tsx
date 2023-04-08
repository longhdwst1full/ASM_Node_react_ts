
import { Link } from "react-router-dom";
import { IProduct } from "../types/products.type";

interface Props {
  product: IProduct;
}
export default function Product({ product }: Props) {
  // console.log("check ",product)
  return (
    <div className="flex flex-col w-full shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
      <div className="relative w-full pt-[100%]">
        <Link to={`/${product._id}/product`}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 h-full w-full bg-white object-cover"
          />
        </Link>
      </div>

      <div className="overflow-hidden p-2">
        <Link to={`/${product._id}/product`}>
          <p className="pb-2.5  px-1 pt-2 text-base min-h-[4rem]  line-clamp-2 ">
            {product.name}
          </p>
        </Link>
        <div className="px-1 flex items-center mb-3">
          <span className="text-red-500 mr-4">
            {product.price}
            <span className="ml-0.5">đ</span>
          </span>
          <span className="text-gray-500">
            {product.price}
            <span className="ml-0.5">đ</span>
          </span>
        </div>
        <div className="px-1 flex items-center">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <img
                key={index}
                className="w-3  h-3.5"
                src="./Vector.png"
                alt={`${index} 1`}
              />
            ))}
          <span className="ml-4">1 danh gia</span>
        </div>
      </div>
    </div>
  );
}
