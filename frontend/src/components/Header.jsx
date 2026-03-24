import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTotalQuantity } from '../store/cartSlice'


 export default function Header (){
  const totalQuantity = useSelector(selectTotalQuantity)

  return (
    <header className="bg-gray-600/30 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    
    {/* Logo */}
    <Link to="/" className="no-underline">
      <h1 className="text-2xl font-extrabold bg-black bg-clip-text text-transparent tracking-wide">
        🛒 ShoppyGlobe
      </h1>
    </Link>

    {/* Navigation */}
    <nav className="flex gap-4 items-center">
      
      {/* Home Button */}
      <Link
        to="/"
        className="px-4 py-2 rounded-xl text-white font-medium bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105"
      >
        Home
      </Link>

      {/* Cart Button */}
      <Link
        to="/cart"
        className="relative px-4 py-2 rounded-xl text-white font-medium flex items-center gap-2 bg-gradient-to-r from-pink-500/80 to-red-500/80 hover:from-pink-500 hover:to-red-600 shadow-md transition-all duration-300 hover:scale-105"
      >
        <span className="text-lg">🛒</span>
        Cart

        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center text-xs font-bold shadow">
            {totalQuantity}
          </span>
        )}
      </Link>
    </nav>
  </div>
</header>
  )
}

 
