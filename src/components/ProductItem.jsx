import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'

function ProductItem({ product }){
  const dispatch = useDispatch()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <Link to={`/product/${product.id}`} className="no-underline text-inherit flex-1 flex flex-col">
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={product.thumbnail}
            alt={product.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500 text-sm">⭐ {product.rating}</span>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-xl font-bold text-green-600">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
                {product.discountPercentage}% off
              </span>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        disabled={addedToCart}
        className={`w-full py-3 px-4 text-white text-base font-semibold transition-colors ${
          addedToCart
            ? 'bg-green-600'
            : 'bg-blue-600 hover:bg-blue-700'
        } disabled:opacity-70`}
      >
        {addedToCart ? '✓ Added!' : '🛒 Add to Cart'}
      </button>
    </div>
  )
}

export default ProductItem
