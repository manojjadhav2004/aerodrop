import { StoreContext } from "./StoreContext";
import { useEffect, useState } from "react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const url = "https://aero-drop.onrender.com";// "http://localhost:4000";
  const [token,setToken] = useState("");
  const [food_list,setFoodList] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItem){
      if(cartItem[item] > 0){
        let itemInfo = food_list.find((product)=>product._id===item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  }

  const fetchFoodList = async() =>{
    const response = await axios.get(url+'/api/food/list');
    setFoodList(response.data.foods);
  }

  const loadCartDate = async(token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const decoded = jwtDecode(storedToken);
          setUser({
            userId: decoded.id || decoded._id,
            name: decoded.name,
            email: decoded.email
          });
          await loadCartDate(storedToken);
        } catch (e) {
          setUser(null);
          setToken("");
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    }
    loadData();
  }, []);
  
  const contextValue = {
    food_list,
    cartItem,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    user,
    setUser,
    loading
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
