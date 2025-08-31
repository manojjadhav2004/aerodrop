import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { cartItem } = useContext(StoreContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  const itemCount = cartItem
    ? Object.values(cartItem).reduce((sum, qty) => sum + qty, 0)
    : 0;

  return (
    <nav
      className="
        fixed top-5 left-1/2 -translate-x-1/2
        backdrop-blur-sm
        bg-white/30 dark:bg-gray-900/30
        dark:text-white
        shadow-lg
        rounded-full
        z-50
        px-6 py-2
        flex items-center gap-6
        transition
      "
    >
      {/* Better Placeholder Logo */}
      <Link to="/" aria-label="Home" className="inline-flex items-center gap-2">
        <svg
          className="w-auto h-8"
          viewBox="0 0 180 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Paper plane icon (left) */}
          <path d="M5 20 L35 8 L25 32 L20 22 L10 20 Z" fill="currentColor" />
          {/* Wordmark lines (to mimic a brand text) */}
          <text
            x="40"
            y="26"
            fontSize="22"
            fontWeight="300"
            fill="currentColor"
            fontFamily="sans-serif"
            fontStyle="italic"
          >
            AeroDrop
          </text>
        </svg>
      </Link>

      {/* Links (desktop) */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/myorders" className="hover:underline">Orders</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Cart */}
        <button
          onClick={() => navigate("/cart")}
          className="relative p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
          aria-label="Cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M6 6h15l-1.5 9h-13z" />
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-[10px] rounded-full px-1.5 py-0.5 font-semibold leading-none">
              {itemCount}
            </span>
          )}
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="p-2 md:hidden rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

     {/* Mobile Menu */}
{menuOpen && (
  <div
    className="
      absolute top-full mt-3 left-1/2 -translate-x-1/2 
      w-full
      backdrop-blur-2xl
      bg-white/90 dark:bg-black/90
      text-black dark:text-white
      rounded-2xl shadow-lg
      px-6 py-4 md:hidden
      transition
    "
  >
    <div className="flex flex-col items-center gap-4 text-sm font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">
              Home
            </Link>
            <Link to="/myorders" onClick={() => setMenuOpen(false)} className="hover:underline">
              Orders
            </Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:underline">
              Profile
            </Link>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
