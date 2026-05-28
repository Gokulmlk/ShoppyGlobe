import { useState, useEffect } from 'react'
import api from '../config/api.js'
import { mapProducts } from '../utils/mapProduct.js'

function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data } = await api.get('/products')

        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch products')
        }

        setProducts(mapProducts(data.data))
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(
          err.response?.data?.message ||
            err.message ||
            'Failed to fetch products'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

export default useProducts
