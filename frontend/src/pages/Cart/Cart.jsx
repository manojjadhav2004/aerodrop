import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const entries = food_list.filter((it) => cartItem[it._id] > 0);
  const subtotal = getTotalCartAmount();
  const deliveryFee = 0; // keep same as before; change if needed
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-[60vh] mt-28">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">
            Your Cart
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {entries.length} item{entries.length !== 1 ? "s" : ""} — review before checkout
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
          >
            Continue shopping
          </button>
          <button
            onClick={() => navigate("/order")}
            disabled={subtotal === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${subtotal === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"}
            `}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Main layout: items + summary */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6">
        {/* Items list */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-8 text-center">
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Add something tasty to get started.</p>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="px-5 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium"
                >
                  Browse menu
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((item) => {
                const qty = cartItem[item._id] || 0;
                return (
                  <article
                    key={item._id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm"
                  >
                    {/* thumbnail */}
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                      className="h-20 w-20 md:h-24 md:w-24 object-cover rounded-md flex-shrink-0 border border-gray-100 dark:border-neutral-800"
                    />

                    {/* title + meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-sm md:text-base font-medium text-black dark:text-white truncate">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* remove button (desktop) */}
                        <button
                          onClick={() => removeFromCart(item._id)}
                          aria-label={`Remove ${item.name}`}
                          className="hidden md:inline-flex items-center justify-center h-8 px-3 rounded-md text-red-500 hover:text-red-700 transition"
                        >
                          {/* small × svg */}
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* mobile meta row: price / qty / remove */}
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-700 dark:text-gray-300">₹{item.price.toFixed(2)}</div>

                          <div className="inline-flex items-center gap-3 px-2 py-1 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700">
                            <span className="text-xs text-gray-600 dark:text-gray-300">Qty</span>
                            <span className="font-medium text-sm text-black dark:text-white">{qty}</span>
                          </div>
                        </div>

                        <div className="md:hidden">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="inline-flex items-center justify-center h-8 px-3 rounded-md text-red-500 hover:text-red-700 transition"
                            aria-label={`Remove ${item.name}`}
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* prices (desktop) */}
                    <div className="hidden md:flex flex-col items-end gap-2 ml-2">
                      <div className="text-sm text-gray-600 dark:text-gray-300">₹{item.price.toFixed(2)}</div>
                      <div className="text-sm font-semibold text-black dark:text-white">₹{(item.price * qty).toFixed(2)}</div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Summary (sticky on desktop) */}
        <aside className="self-start">
          <div className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 shadow-sm sticky top-28">
            <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-100 dark:border-neutral-800 pt-3 flex justify-between font-semibold text-black dark:text-white">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/order")}
              disabled={subtotal === 0}
              className={`mt-5 w-full rounded-lg py-3 font-medium transition
                ${subtotal === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"}
              `}
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => {
                /* clear action not provided; navigate back */
                navigate("/");
              }}
              className="mt-3 w-full rounded-lg py-2 text-sm border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
            >
              Continue shopping
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
