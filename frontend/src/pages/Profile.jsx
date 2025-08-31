import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, token, url, setUser, setToken } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.post(
          url + "/api/order/userorders",
          { userId: user.userId },
          { headers: { token } }
        );
        if (res.data.success) setOrders(res.data.data);
      } catch {
        setOrders([]);
      }
    };
    fetchOrders();
  }, [user, token, url]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black px-4">
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 w-full max-w-sm text-center space-y-4">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Please log in to view your profile.
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black font-medium transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center px-4 py-6 mt-16">
     
      {/* Profile Header */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 p-6 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        
        
        <div className="flex items-center gap-4">
          
          
          {/* Avatar Placeholder */}
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-black dark:text-white font-bold text-xl">
            {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
          </div>
          
          
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white">
              {user.name || user.email}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Here you can see all your previous orders</p>
          </div>
        
        
        </div>
        
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md dark:bg-white dark:text-black text-white bg-black"
        >
          Logout
        </button>
      </div>

      {/* Order History */}
      <div className="w-full max-w-2xl mt-6 p-6 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
          Order History
        </h3>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No orders found.
          </p>
        ) : (
          <ul className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
            {orders.map((order) => (
              <li
                key={order._id}
                className="p-4 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-sm text-black dark:text-white"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">Order ID:</span>
                  <span>{order._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Status:</span>
                  <span>{order.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Amount:</span>
                  <span>₹{order.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Date:</span>
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
