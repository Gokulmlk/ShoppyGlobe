import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {
  selectCartItems,
  selectTotalAmount,
  clearCartAsync,
  mergeGuestCartOnLogin,
} from '../store/cartSlice'
import { getStoredUser, isAuthenticated, AUTH_CHANGE_EVENT } from '../config/api.js'
import Header from '../components/Header'
import AuthForm from '../components/AuthForm'
import CheckoutOrderSummary from '../components/CheckoutOrderSummary'

function Checkout() {
  const cartItems = useSelector(selectCartItems)
  const totalAmount = useSelector(selectTotalAmount)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState(() =>
    isAuthenticated() ? getStoredUser() : null
  )

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })

  const [orderPlaced, setOrderPlaced] = useState(false)

  const prefillFromUser = (loggedInUser) => {
    const nameParts = loggedInUser.name?.trim().split(/\s+/) ?? []
    setFormData((prev) => ({
      ...prev,
      firstName: nameParts[0] ?? '',
      lastName: nameParts.slice(1).join(' ') ?? '',
      email: loggedInUser.email ?? prev.email,
    }))
  }

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/cart')
    }
  }, [cartItems, navigate, orderPlaced])

  useEffect(() => {
    const syncUser = () => {
      setUser(isAuthenticated() ? getStoredUser() : null)
    }
    window.addEventListener(AUTH_CHANGE_EVENT, syncUser)
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, syncUser)
  }, [])

  useEffect(() => {
    if (user && !formData.email) {
      prefillFromUser(user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleAuthSuccess = async (loggedInUser) => {
    setUser(loggedInUser)
    try {
      await dispatch(mergeGuestCartOnLogin()).unwrap()
    } catch {
      // Guest cart may already be empty; checkout can still continue
    }
    prefillFromUser(loggedInUser)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setOrderPlaced(true)
    setTimeout(async () => {
      await dispatch(clearCartAsync())
      navigate('/')
    }, 2000)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4 animate-fadeIn">
          <div className="w-24 h-24 bg-green-600 text-white rounded-full flex items-center justify-center text-5xl mb-8 animate-scaleIn">
            ✓
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-2">Thank you for your purchase</p>
          <p className="text-blue-600 font-medium">Redirecting to home page...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link
              to="/cart"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Cart
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">
                <div className="mb-8 text-center lg:text-left">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    Account required
                  </span>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Sign in to checkout
                  </h1>
                  <p className="text-gray-600">
                    Please sign in or create an account to complete your purchase.
                    Your cart items are saved and will stay here after you log in.
                  </p>
                </div>

                <AuthForm
                  title="Continue to Checkout"
                  subtitle="Sign in if you already have an account, or register to continue."
                  onSuccess={handleAuthSuccess}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <CheckoutOrderSummary
                cartItems={cartItems}
                totalAmount={totalAmount}
              />
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          <p className="text-sm text-gray-600">
            Signed in as <strong>{user.email}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form
            onSubmit={handlePlaceOrder}
            className="lg:col-span-2 bg-white p-6 md:p-8 rounded-xl shadow-md"
          >
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    readOnly
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">
                Payment Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      maxLength="3"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="w-full py-4 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Place Order
            </button>
          </form>

          <div className="lg:col-span-1">
            <CheckoutOrderSummary cartItems={cartItems} totalAmount={totalAmount} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Checkout
