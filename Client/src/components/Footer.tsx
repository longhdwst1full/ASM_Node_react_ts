import React from "react";

export default function Footer() {
  return (
    <div className="border-t-[1px] mt-14 border-gray-100 ">
      <div className="w-[calc(100%-20%)] m-auto p-2">
        <div className="flex item-title my-8 gap-7 ">
          <div className="flex flex-col">
            <p className="mb-1.5">Tìm cửa hàng</p>
            <p className="mb-1.5">Tìm cửa hàng gần nhất</p>
            <p className="mb-1.5">Mua hàng từ xa</p>
            <p className="mb-1.5 text-red-500">
              Gặp trực tiếp cửa hàng gần nhất (Zalo hoặc gọi điện)
            </p>
            <p className="mb-1.5">Phương thức thanh toán</p>
            <div className=" mt-2 flex flex-wrap gap-3">
              <img className="object-cover w-[20%]" src="./Rectangle (5).png" alt="" />
              <img className="object-cover w-[20%]" src="./Rectangle (5).png" alt="" />
              <img className="object-cover w-[20%]" src="./Rectangle (5).png" alt="" />
              <img className="object-cover w-[20%]" src="./Rectangle (5).png" alt="" />
              <img className="object-cover w-[20%]" src="./Rectangle (5).png" alt="" />
            </div>
          </div>
          <div className="flex- flex-col">
            <p className="mb-1.5">
              Gọi mua hàng: <span>1800.2044 (8h00 - 22h00)</span>
            </p>
            <p className="mb-1.5">
              Gọi khiếu nại: <span>1800.2044 (8h00 - 22h00)</span>
            </p>
            <p className="mb-1.5">
              Gọi bảo hành:<span>1800.2044 (8h00 - 22h00)</span>
            </p>
            <p className="mb-1.5 text-md mt-2.5">Đối tác dịch vụ bảo hành</p>
            <p className="mb-1.5">Điện Thoại - Máy tính</p>
            <p className="mb-1.5 text-md mt-3.5">
              Trung tâm bảo hành uỷ quyền Apple
            </p>
            <img className="h-[40px] mt-2.5 " src="./Rectangle (6).png" alt="" />
          </div>
          <ul>
            <li className="mb-1.5">Mua hàng và thanh toán Online</li>
            <li className="mb-1.5">Mua hàng trả góp Online</li>
            <li className="mb-1.5">Tra thông tin đơn hàng</li>
            <li className="mb-1.5">Tra điểm Smember</li>
            <li className="mb-1.5">Tra thông tin bảo hành</li>
            <li className="mb-1.5">Tra cứu hoá đơn VAT điện tử</li>
            <li className="mb-1.5">Trung tâm bảo hành chính hãng</li>
            <li className="mb-1.5">Quy định về việc sao lưu dữ liệu</li>
            <li className="mb-1.5">Dịch vụ bảo hành điện thoại</li>
          </ul>
          <ul>
            <li className="mb-1.5">Quy chế hoạt động</li>
            <li className="mb-1.5">Chính sách Bảo hành</li>
            <li className="mb-1.5">Liên hệ hợp tác kinh doanh</li>
            <li className="mb-1.5">Khách hàng doanh nghiệp (B2B)</li>
            <li className="mb-1.5">Ưu đãi thanh toán</li>
            <li className="mb-1.5">Tuyển dụng</li>
          </ul>
        </div>
      </div>
      <div className="bg-[#F8F8F8]">
        <div className="w-4/5 py-4 pb-10 m-auto text-[13px]">
          <div className="grid grid-cols-3 gap-6">
            <ul>
              <li className="mb-1.5">
                Điện thoại iPhone 13- Điện thoại iPhone 12-Điện thoại iPhone 11
              </li>
              <li className="mb-1.5">
                Điện thoại iPhone 13- Điện thoại iPhone 12-Điện thoại iPhone 11
              </li>
              <li className="mb-1.5">
                Điện thoại iPhone 13- Điện thoại iPhone 12-Điện thoại iPhone 11
              </li>
            </ul>
            <ul>
              <li className="mb-1.5">
                Điện thoại iPhone 13- Điện thoại iPhone 12-Điện thoại iPhone 11
              </li>
              <li className="mb-1.5">
                Điện thoại iPhone 13- Điện thoại iPhone 12-Điện thoại iPhone 11
              </li>
              <li className="mb-1.5">
                Điện thoại iPhone 13- Điện thoại iPhone 12-Điện thoại iPhone 11
              </li>
            </ul>
            <ul>
              <li className="mb-1.5">
                Điện thoại iPhone 13- Điện thoại iPhone 12-Điện thoại iPhone 11
              </li>
              <li className="mb-1.5">
                Điện thoại iPhone 13- Điện thoại iPhone 12-Điện thoại iPhone 11
              </li>
              <li className="mb-1.5">
                Điện thoại iPhone 13- Điện thoại iPhone 12-Điện thoại iPhone 11
              </li>
            </ul>
          </div>
          <p className="mt-3.5 text-center">
            Công ty TNHH Thương mại và dịch vụ kỹ thuật DIỆU PHÚC - GPĐKKD:
            0316172372 do sở KH & ĐT TP. HCM cấp ngày 02/03/2020. Địa chỉ:
            350-352 Võ Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh,
            Việt Nam. Điện thoại: 028.7108.9666.
          </p>
        </div>
      </div>
    </div>
  );
}
