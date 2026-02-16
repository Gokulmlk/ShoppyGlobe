import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Lazy loaded components for performance optimization
const Home = React.lazy(() => import('./pages/Home'))
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'))
const Cart = React.lazy(() => import('./pages/Cart'))
const Checkout = React.lazy(() => import('./pages/Checkout'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

// Loading component
function Loading(){
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      <div className="flex flex-col items-center p-8 bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl">
        
        {/* Gradient Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-purple-500 animate-spin"></div>
        </div>

        {/* Text */}
        <p className="mt-6 text-gray-700 font-medium tracking-wide animate-pulse">
          Loading...
        </p>

      </div>
    </div>
  );
};


// Router configuration using createBrowserRouter for better features
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <ProductDetail />
      </Suspense>
    ),
  },
  {
    path: '/cart',
    element: (
      <Suspense fallback={<Loading />}>
        <Cart />
      </Suspense>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Suspense fallback={<Loading />}>
        <Checkout />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
