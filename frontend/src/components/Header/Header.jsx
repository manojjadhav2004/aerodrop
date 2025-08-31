// Header.jsx
import React from 'react'
import heroImage from '../../assets/header_img.jpeg'

const Header = ({ scrollToMenu }) => {
  return (
    <header
    className="relative w-full h-[80vh] bg-no-repeat bg-center bg-cover"
  style={{
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url(${heroImage})`,
  }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text Content */}
      <div className="absolute bottom-12 left-6 md:left-16 max-w-xl text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow">
          Order Your Favourite Food Here
        </h2>
        <p className="text-white/80 text-base md:text-lg mb-6 drop-shadow">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients — elevate your dining experience one delicious meal at a time.
        </p>
        <button
          onClick={scrollToMenu}
          className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition shadow-md"
        >
          View Menu
        </button>
      </div>
    </header>
  )
}

export default Header
