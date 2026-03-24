import { useState, useEffect } from 'react'


function useProducts(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('https://dummyjson.com/products')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProducts(data.products || [])
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message || 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

export default useProducts
