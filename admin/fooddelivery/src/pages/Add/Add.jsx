import React, { useState } from 'react'
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {
  const [img,setImage] = useState(false);
  const [data,setData] = useState({
    name: '',
    description: '',
    category: 'Food',
    price: ''
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name]: value}));
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(!img) {
      alert('Please upload an image');
      return;
    }
    if(!data.name || !data.description || !data.category || !data.price) {
      alert('Please fill all fields');
      return;
    }
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', Number(data.price));
    formData.append('image', img);
    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      setData({
        name: '',
        description: '',
        category: 'Food',
        price: ''
      })
      setImage(false);
      toast.success('Product added successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast.error(response.data.message || 'Failed to add product', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>

        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={img?URL.createObjectURL(img):assets.upload_area} alt="Upload Icon" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter product name' name='name'/>
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea value={data.description} onChange={onChangeHandler}name="description" rows="6" placeholder='Enter product description' required></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Select Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Food">Food</option>
              <option value="Medicine">Medicine</option>
             
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" placeholder='Enter price' name='price' required /> 
          </div>
        </div>
        <button type="submit" className='add-btn'>Add Product</button>
      </form>
    </div>
  )
}

export default Add
