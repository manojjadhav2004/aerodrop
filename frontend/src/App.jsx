import React, { useState, useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import Profile from './pages/Profile';
import About from './pages/About/About';
import { StoreContext } from './context/StoreContext';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user, loading } = useContext(StoreContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="spinner border-4 border-gray-200 border-t-gray-700 rounded-full w-10 h-10 animate-spin" />
      </div>
    );
  }

  // If not logged in, always show login popup and block app
  if (!user) {
    return <LoginPopUp setShowLogin={setShowLogin} />;
  }

  return (
    <>
      <div className='bg-white dark:bg-black'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myorders' element={<MyOrders/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/about' element={<About/>} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App

