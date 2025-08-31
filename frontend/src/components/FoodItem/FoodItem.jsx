import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  // Defensive check for missing/invalid props
  if (!id || !name || !price || !description || !image) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg shadow">
        Food item data is missing or invalid.
      </div>
    );
  }

  const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);
  const qty = cartItem[id] || 0;

  return (
    <div className="w-full max-w-xs bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* IMAGE */}
      <div className="relative">
        <img
          src={`${url}/images/${image}`}
          alt={name}
          className="w-full h-48 object-cover"
        />

        {/* Qty Controls */}
        {qty === 0 ? (
          <button
            onClick={() => addToCart(id)}
            className="
              absolute bottom-4 right-4
              bg-black dark:bg-white
              text-white dark:text-black
              px-4 py-2
              rounded-full
              font-medium
              shadow-lg
              hover:bg-gray-800 dark:hover:bg-gray-200
              transition
              flex items-center gap-1
            "
            aria-label="Add to cart"
          >
            <img src={assets.add_icon_white} className="w-5 h-5" alt="+" />
            Add
          </button>
        ) : (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-lg">
            <button onClick={() => removeFromCart(id)} aria-label="Remove">
              <img src={assets.remove_icon_red} className="w-5 h-5" alt="–" />
            </button>
            <span className="font-semibold text-gray-900 dark:text-white">{qty}</span>
            <button onClick={() => addToCart(id)} aria-label="Add">
              <img src={assets.add_icon_white} className="w-5 h-5" alt="+" />
            </button>
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {description}
          </p>
        </div>
        <p className="text-black dark:text-white font-bold text-xl">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
