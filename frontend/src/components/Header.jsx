import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../store/cartSlice";
import AuthForm from "./AuthForm.jsx";

export default function Header() {
  const totalQuantity = useSelector(selectTotalQuantity);

  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [showAuth, setShowAuth] = useState(false); // auth modal

  return (
    <>
      <header className="bg-gray-600/30 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="no-underline">
            <h1 className="text-2xl font-extrabold bg-black bg-clip-text text-transparent tracking-wide">
              🛒 ShoppyGlobe
            </h1>
          </Link>

          {/* Desktop Nav */}
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

            <button
              onClick={() => setShowAuth(true)}
              className="px-4 py-2 rounded-xl text-white bg-blue-500 hover:bg-blue-600"
            >
              Sign In / Register
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
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

            <button
              onClick={() => {
                setShowAuth(true);
                setIsOpen(false);
              }}
              className="text-white bg-blue-500 p-2 rounded-lg"
            >
              Sign In / Register
            </button>
          </div>
        )}
      </header>

      {/* 🔥 Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative">

            {/* Close Button */}
            <button
              onClick={() => setShowAuth(false)}
              className="absolute -top-3 -right-3 bg-white rounded-full px-2 shadow"
            >
              ✕
            </button>

            <AuthForm />
          </div>
        </div>
      )}
    </>
  );
}