import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import Header from '../components/Header'


function ProductDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`https://dummyjson.com/products/${id}`)

        if (!response.ok) {
          throw new Error(`Product not found (${response.status})`)
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        console.error('Error fetching product detail:', err)
        setError(err.message || 'Failed to fetch product details')
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetail()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product))
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
          <h2 className="text-2xl text-red-600 mb-4">❌ {error || 'Product Not Found'}</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
        >
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 bg-white p-6 md:p-8 rounded-2xl shadow-lg">
          {/* Product Images */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-96 md:h-[500px] bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 flex-wrap">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                      selectedImage === index
                        ? 'border-blue-600 shadow-md'
                        : 'border-transparent hover:border-blue-400'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {product.title}
              </h1>
              <p className="text-lg text-gray-600 font-medium">{product.brand}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-yellow-500 text-lg">⭐ {product.rating}</span>
              <span className="text-gray-600">({product.stock} in stock)</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-green-600">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-md font-semibold">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <p className="text-base text-gray-700 leading-relaxed">{product.description}</p>

            <div className="flex flex-col gap-3 p-6 bg-gray-50 rounded-xl">
              <div className="flex gap-2 text-sm text-gray-700">
                <strong className="min-w-[100px]">Category:</strong>
                <span>{product.category}</span>
              </div>
              <div className="flex gap-2 text-sm text-gray-700">
                <strong className="min-w-[100px]">Availability:</strong>
                {product.stock > 0 ? (
                  <span className="text-green-600 font-semibold">In Stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </div>
              <div className="flex gap-2 text-sm text-gray-700">
                <strong className="min-w-[100px]">Return Policy:</strong>
                <span>{product.returnPolicy}</span>
              </div>
              <div className="flex gap-2 text-sm text-gray-700">
                <strong className="min-w-[100px]">Shipping:</strong>
                <span>{product.shippingInformation}</span>
              </div>
              {product.warrantyInformation && (
                <div className="flex gap-2 text-sm text-gray-700">
                  <strong className="min-w-[100px]">Warranty:</strong>
                  <span>{product.warrantyInformation}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={addedToCart || product.stock === 0}
              className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-colors ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : product.stock === 0
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {addedToCart ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetail
