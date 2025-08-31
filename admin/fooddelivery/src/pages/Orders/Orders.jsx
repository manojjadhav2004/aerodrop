import React, { useEffect, useState } from 'react'
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({url}) => {

  const [orders,setOrders] = useState([]);
  const fetchAllOrders = async() => {
    const response = await axios.get(url+'/api/order/list');
    console.log(response.data);
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else{
      console.log("error");
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + '/api/order/status', {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  const deleteOrder = async (orderId) => {
    if(window.confirm('Are you sure you want to delete this order?')) {
      const response = await axios.post(url + '/api/order/delete', { orderId });
      if(response.data.success) {
        toast.success('Order deleted');
        await fetchAllOrders();
      } else {
        toast.error('Failed to delete order');
      }
    }
  };
  useEffect(()=>{fetchAllOrders()},[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.name + ' x ' + item.quatity;
                  }
                  else{
                    return item.name + ' x ' + item.quatity + ', '
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state+", "+order.address.country+", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
              {order.payment && order.otp && (
                <p style={{marginTop: '6px'}}><span style={{fontWeight:'bold'}}>OTP:</span> {order.otp}</p>
              )}
              {order.location && order.location.lat && order.location.lng && (
                <div style={{marginTop: '5px'}}>
                  <span style={{fontWeight: 'bold'}}>GPS: </span>
                  <span>{order.location.lat.toFixed(6)}, {order.location.lng.toFixed(6)}</span>
                  <a
                    href={`https://maps.google.com/?q=${order.location.lat},${order.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{marginLeft: '10px', color: 'tomato', textDecoration: 'underline'}}
                  >
                    View in Maps
                  </a>
                </div>
              )}
            </div>
            <p>Items : {order.items.length}</p>
            <p>₹{order.amount}</p>
            <button style={{background:'#fff',color:'tomato',border:'1px solid tomato',borderRadius:'6px',padding:'6px 12px',marginTop:'8px',cursor:'pointer'}} onClick={()=>deleteOrder(order._id)}>Delete</button>
            <select onChange={(event) => statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
