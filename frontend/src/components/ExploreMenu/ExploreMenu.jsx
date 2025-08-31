import React, { forwardRef } from 'react';
import { menu_list } from '../../assets/assets';

const ExploreMenu = forwardRef(({ category, setCategory }, ref) => {
  return (
    <section
    
      ref={ref}
      className="w-full  px-4 lg:px-48 md:px-6 mx-auto transition-colors duration-300 bg-white dark:bg-black pb-24"
    >

      {/* <hr className=" dark:border-gray-700" /> */}

      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-tomato text-center md:text-left dark:text-tomato">
        Explore Our Menu
      </h1>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-base md:text-lg max-w-3xl text-center md:text-left mx-auto md:mx-0">
        Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients — elevate your dining experience, one delicious meal at a time.
      </p>

      {/* Menu Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 place-items-center">
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;

          return (
            <div
              key={index}
              onClick={() =>{
                setCategory((prev) =>
                  prev === item.menu_name ? 'all' : item.menu_name
                )
                console.log(item.menu_name)
                }
              }
              className={`w-full cursor-pointer text-center p-4 rounded-2xl border transition-all duration-200 hover:shadow-md ${
                isActive
                  ? 'bg-tomato text-white border-tomato scale-105'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:border-gray-500'
              }`}
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={`h-16 w-16 mx-auto mb-3 rounded-full object-cover ${
                  isActive ? 'ring-4 ring-white' : ''
                }`}
              />
              <h3 className="font-medium text-sm">{item.menu_name}</h3>
            </div>
          );
        })}
        
      </div>

    </section>
  );
});

export default ExploreMenu;


      // {/* Title */}
      