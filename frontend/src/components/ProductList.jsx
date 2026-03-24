import React from 'react'
import { useSelector } from 'react-redux'
import { selectSearchTerm } from '../store/searchSlice'
import useProducts from '../hooks/useProducts'
import ProductItem from './ProductItem'

function ProductList(){
  const { products, loading, error } = useProducts()
  const searchTerm = useSelector(selectSearchTerm)

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <h2 className="text-2xl text-red-600 mb-2">❌ Error Loading Products</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  // No products found
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <h2 className="text-2xl text-gray-800 mb-2">No products found</h2>
        <p className="text-gray-600">Try adjusting your search term</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {searchTerm ? `Search Results (${filteredProducts.length})` : 'All Products'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
