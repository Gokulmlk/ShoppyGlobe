import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../store/cartSlice'


function CartItem ({ item }){
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-md mb-4">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full md:w-24 h-48 md:h-24 object-cover rounded-lg flex-shrink-0"
        loading="lazy"
      />

      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
        <p className="text-base text-green-600 font-medium">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex flex-row md:flex-col gap-3 items-end md:items-end justify-between md:justify-center">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => dispatch(decreaseQuantity(item.id))}
            disabled={item.quantity === 1}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-md text-lg font-bold hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
            title="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-[30px] text-center font-semibold text-base">{item.quantity}</span>
          <button
            onClick={() => dispatch(increaseQuantity(item.id))}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-md text-lg font-bold hover:bg-blue-600 hover:text-white transition-colors"
            title="Increase quantity"
          >
            +
          </button>
        </div>

        <p className="text-base font-semibold text-gray-800">
          Total: ${item.totalPrice.toFixed(2)}
        </p>

        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
          title="Remove from cart"
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem
