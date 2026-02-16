import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTotalQuantity } from '../store/cartSlice'

 export default function Header (){
  const totalQuantity = useSelector(selectTotalQuantity)

  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-white no-underline">
          <h1 className="text-2xl font-bold">🛒 ShoppyGlobe</h1>
        </Link>

        <nav className="flex gap-8 items-center">
          <Link
            to="/"
            className="text-gray-300 hover:text-white text-base font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="text-gray-300 hover:text-white text-base font-medium transition-colors flex items-center gap-2 relative"
          >
            <span className="text-xl">🛒</span>
            Cart
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {totalQuantity}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

 
