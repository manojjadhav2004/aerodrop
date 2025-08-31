import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = React.useCallback(async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.foods);
    } else {
      toast.error(response.data.message);
    }
  }, [url]);

  const removeFood = async(foodId) =>{
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId });
    if (response.data.success) {
      toast.success("Food removed successfully");
      await fetchList(); // Refresh the list after removal
    } else {
      toast.error(response.data.message || "Failed to remove food");
    }
  }
  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="list flex-col">
      <h1 className="list-title">All Foods List</h1>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p>{item.category}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">x</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
