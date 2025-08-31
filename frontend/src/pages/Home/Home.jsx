// Home.jsx
import React, { useContext, useRef } from "react";
import { StoreContext } from "../../context/StoreContext";
import Header from '../../components/Header/Header.jsx'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import AppDownload from '../../components/AppDownload/AppDownload.jsx'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [category, setCategory] = React.useState('all');
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const menuRef = useRef(null); // 👈 Reference for scrolling

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header scrollToMenu={scrollToMenu} /> {/* 👈 Pass scroll function */}
      <ExploreMenu
        ref={menuRef} // 👈 Attach ref here
        category={category}
        setCategory={setCategory}
      />
      <FoodDisplay category={category} />
      <AppDownload />

      {/* Sticky Go to Cart Button */}
      {getTotalCartAmount() > 0 && (
        <button
          onClick={() => navigate('/cart')}
          className="
             fixed bottom-6 right-12 z-50
            bg-black text-white font-semibold
            px-8 py-4 rounded-full shadow-lg
            hover:bg-gray-800 transition-all
          "
        >
          {/* Fading border ring */}
          <span
            className="
              absolute -inset-1 rounded-full border-2 border-white
              opacity-20
              animate-border-fade
            "
          />

          {/* Button content */}
          <span className="relative">Go to Cart</span>
        </button>

              )}
    </div>
  );
};

export default Home;
