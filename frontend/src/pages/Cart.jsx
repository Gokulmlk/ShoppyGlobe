import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../config/api.js'
import {
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount,
  selectCartError,
  loadCart,
} from '../store/cartSlice'
import Header from '../components/Header'
import CartItem from '../components/CartItem'

function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const totalQuantity = useSelector(selectTotalQuantity)
  const totalAmount = useSelector(selectTotalAmount)
  const cartError = useSelector(selectCartError)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadCart())
  }, [dispatch])

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
          <div className="text-8xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          {cartError && (
            <p className="text-red-600 mb-4 text-sm">{cartError}</p>
          )}
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Shopping Cart ({totalQuantity} items)
        </h1>

        {cartError && (
          <p className="text-red-600 mb-4 text-sm">{cartError}</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl shadow-md sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base text-gray-700">
                  <span>Subtotal:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base text-gray-700">
                  <span>Shipping:</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>

                <div className="flex justify-between text-base text-gray-700">
                  <span>Tax:</span>
                  <span>${(totalAmount * 0.1).toFixed(2)}</span>
                </div>

                <div className="h-px bg-gray-200 my-4"></div>

                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total:</span>
                  <span>${(totalAmount * 1.1).toFixed(2)}</span>
                </div>
              </div>

              {!isAuthenticated() && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4">
                  Sign in or create an account to complete checkout.
                </p>
              )}

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="block text-center text-blue-600 hover:text-blue-700 font-medium transition-colors no-underline"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Cart
