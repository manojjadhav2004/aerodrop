import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 min-h-[60vh] mt-16 bg-white dark:bg-black">
      <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
        My Orders
      </h2>

      <div className="grid gap-6">
        {data.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start gap-4 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6"
          >
            {/* Icon */}
            <img
              src={assets.parcel_icon}
              alt=""
              className="h-12 w-12 object-contain"
            />

            {/* Order Info */}
            <div className="flex-1 space-y-2">
              {/* Items */}
              <p className="text-sm md:text-base text-black dark:text-white">
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              {/* Details */}
              <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                <span>₹{order.amount.toFixed(2)}</span>
                <span>Items: {order.items.length}</span>
                <span
                  className={
                    order.status === "Delivered"
                      ? "text-green-600 dark:text-green-500"
                      : "text-yellow-600 dark:text-yellow-400"
                  }
                >
                  ● <b>{order.status}</b>
                </span>

                {/* OTP Badge */}
                {order.payment && order.otp && (
                  <span className="ml-auto text-black dark:text-white bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded text-xs">
                    OTP: {order.otp}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
