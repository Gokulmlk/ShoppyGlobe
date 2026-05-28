import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectTotalQuantity, loadCart } from '../store/cartSlice'
import { getStoredUser, clearAuthSession, AUTH_CHANGE_EVENT } from '../config/api.js'
import AuthForm from './AuthForm.jsx'

export default function Header() {
  const dispatch = useDispatch()
  const totalQuantity = useSelector(selectTotalQuantity)

  const [isOpen, setIsOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState(() => getStoredUser())

  useEffect(() => {
    if (user) {
      dispatch(loadCart())
    }
  }, [user, dispatch])

  useEffect(() => {
    const syncUser = () => setUser(getStoredUser())
    window.addEventListener(AUTH_CHANGE_EVENT, syncUser)
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, syncUser)
  }, [])

  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser)
    setShowAuth(false)
    dispatch(loadCart())
  }

  const handleLogout = () => {
    clearAuthSession()
    setUser(null)
    window.location.reload()
  }

  return (
    <>
      <header className="bg-gray-600/30 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="no-underline">
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              🛒 ShoppyGlobe
            </h1>
          </Link>

          <nav className="hidden md:flex gap-4 items-center">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl text-white bg-white/10 hover:bg-white/20 transition"
            >
              Home
            </Link>

            <Link
              to="/cart"
              className="relative px-4 py-2 rounded-xl text-white flex items-center gap-2 bg-gradient-to-r from-pink-500/80 to-red-500/80 hover:scale-105"
            >
              🛒 Cart
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full px-1 text-xs">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <span className="text-white text-sm">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-white bg-red-500 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="px-4 py-2 rounded-xl text-white bg-blue-500 hover:bg-blue-600"
              >
                Sign In / Register
              </button>
            )}
          </nav>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-white bg-white/10 p-2 rounded-lg"
            >
              Home
            </Link>

            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="text-white bg-pink-500/80 p-2 rounded-lg flex justify-between"
            >
              Cart
              {totalQuantity > 0 && (
                <span className="bg-yellow-400 text-black px-2 rounded-full text-xs">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <span className="text-white text-sm p-2">Hi, {user.name}</span>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="text-white bg-red-500 p-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowAuth(true)
                  setIsOpen(false)
                }}
                className="text-white bg-blue-500 p-2 rounded-lg"
              >
                Sign In / Register
              </button>
            )}
          </div>
        )}
      </header>

      {showAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute -top-3 -right-3 bg-white rounded-full px-2 shadow"
            >
              ✕
            </button>

            <AuthForm onSuccess={handleAuthSuccess} />
          </div>
        </div>
      )}
    </>
  )
}
