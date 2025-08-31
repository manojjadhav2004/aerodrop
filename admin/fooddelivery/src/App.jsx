import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/side/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Orders from './pages/Orders/Orders'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Users from './pages/Users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "https://aero-drop.onrender.com";// "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/users" element={<Users url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

