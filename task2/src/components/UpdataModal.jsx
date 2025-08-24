import React, { useState } from "react";
import { showErrorToast, showSuccessToast } from "./Toast";

const UpdataModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    dateTime: "",
    quantity: 0,
    pillar: "",
    receipt: 0.0,
    price: 0.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { dateTime, quantity, pillar, receipt, price } = formData;

    if (!dateTime || !pillar || quantity <= 0 || receipt <= 0 || price <= 0) {
      showErrorToast("Vui lòng điền đầy đủ và hợp lệ các trường thông tin!");
      console.error("Trường thông tin không hợp lệ khi điền form");
      return;
    }

    console.log("Data:", formData);
    showSuccessToast("Cập nhật giao dịch thành công!");

    setTimeout(() => {
      closeModal();
    }, 4000);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 bg-opacity-50"
        onClick={closeModal}
      ></div>

      <form
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md z-50"
        onSubmit={handleSubmit}
      >
        <div className="p-4 md:p-5 shadow">
          <div className="flex justify-between">
            <button
              type="button"
              className="text-sm font-medium hover:text-red-500
                bg-transparent 
                hover:underline hover:underline-offset-4
                rounded-lg
                h-8 
                inline-flex justify-center items-center gap-x-1
                cursor-pointer
                transition-all duration-200"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              <span>Đóng</span>
            </button>

            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
            >
              Cập nhật
            </button>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-3">
            Nhập giao dịch
          </h3>
        </div>

        <div className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="dateTime"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Thời gian
              </label>
              <input
                type="datetime-local"
                name="dateTime"
                id="dateTime"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Số lượng
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="0.00"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="pillar"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Trụ
              </label>
              <input
                type="text"
                name="pillar"
                id="pillar"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="receipt"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Doanh thu
              </label>
              <input
                type="number"
                name="receipt"
                id="receipt"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Đơn giá
              </label>
              <input
                type="number"
                name="price"
                id="price"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdataModal;
