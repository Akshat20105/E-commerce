import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList'
import ProductForm from '../components/ProductForm'

export default function Home() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/products')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError('Failed to load products. Please try again later.')
      console.error('Error fetching products:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProduct = async (product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      if (!response.ok) {
        throw new Error('Failed to add product')
      }
      fetchProducts()
    } catch (err) {
      setError('Failed to add product. Please try again.')
      console.error('Error adding product:', err)
    }
  }

  const handleUpdateProduct = async (product) => {
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      if (!response.ok) {
        throw new Error('Failed to update product')
      }
      fetchProducts()
      setEditingProduct(null)
    } catch (err) {
      setError('Failed to update product. Please try again.')
      console.error('Error updating product:', err)
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete product')
      }
      fetchProducts()
    } catch (err) {
      setError('Failed to delete product. Please try again.')
      console.error('Error deleting product:', err)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Management System</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
      <ProductForm onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} initialData={editingProduct} />
      {isLoading ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <ProductList 
          products={products} 
          onEdit={setEditingProduct} 
          onDelete={handleDeleteProduct} 
        />
      )}
    </div>
  )
}