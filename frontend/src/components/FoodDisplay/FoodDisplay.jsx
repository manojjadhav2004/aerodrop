import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext);
  return (
    <div className=' flex flex-col justify-center items-center sm:p-8 p-2 bg-white dark:bg-black dark:text-white' id='food-display'>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-tomato text-center md:text-left dark:text-tomato">Get It Now</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {food_list.map((item, index) => {
            if(category === 'all' || category === item.category){
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            }
        })}
    
      </div>
    </div>
  )
}

export default FoodDisplay
