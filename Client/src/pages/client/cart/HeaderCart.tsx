
export default function HeaderCart() {
  return (
    <header className="bg-red-500">
      <div className="w-[1200px] bg-red-500 mx-auto flex items-center gap-4 justify-center py-2">
        <div className="w-[50px]">
          <img src="./anhhtus-logo 2.png" alt="" />
        </div>
        <div className="flex-1">
          <input
            className="w-full rounded-md border-none outline-none p-2"
            placeholder="Search.."
            type="text"
          />
        </div>
        <div className="text-white ml-16 grid grid-cols-4 gap-3 ">
          <div>
            <p>Gọi mua hàng</p>
            <p>1800.2097 </p>
          </div>
          <div className="flex items-center gap-2">
            <img
              className="w-4.5"
              src="./Layer 1 (1).png"
              alt=""
            />
            <div className="flex flex-col">
              <span>Cửa hàng</span>
              <p>gần bạn</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img className="w-10" src="./Layer 1.png" alt="" />
            <div className="flex flex-col">
              <span>Tra cứu </span>
              <p>Đơn hàng</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img className="w-5" src="./Layer 2.png" alt="" />
            <div className="flex flex-col">
              <span>Giỏ hàng</span>
              <p>gần bạn</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
