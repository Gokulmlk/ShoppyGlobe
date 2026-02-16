import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Lazy loaded components for performance optimization
const Home = React.lazy(() => import('./pages/Home'))
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'))
const Cart = React.lazy(() => import('./pages/Cart'))
const Checkout = React.lazy(() => import('./pages/Checkout'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

// Loading component
const Loading = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-600">Loading...</p>
  </div>
)

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
