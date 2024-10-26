import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList'
import ProductForm from '../components/ProductForm'
import { Button } from "@/components/ui/button"
import { Package2 } from 'lucide-react'
import { Product, NewProduct } from '@/types/product'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)

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

  const handleAddProduct = async (product: NewProduct) => {
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
      setIsFormVisible(false)
    } catch (err) {
      setError('Failed to add product. Please try again.')
      console.error('Error adding product:', err)
    }
  }

  const handleUpdateProduct = async (product: Product) => {
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
      setIsFormVisible(false)
    } catch (err) {
      setError('Failed to update product. Please try again.')
      console.error('Error updating product:', err)
    }
  }

  const handleDeleteProduct = async (id: number) => {
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

  const handleSubmit = (product: NewProduct) => {
    if (editingProduct) {
      handleUpdateProduct({ ...product, id: editingProduct.id })
    } else {
      handleAddProduct(product)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Package2 className="h-8 w-8 text-primary" />
                <span className="ml-2 text-2xl font-bold text-gray-900">PMS</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Product Management System</h1>
              {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
              
              <div className="mb-4 text-center">
                <Button onClick={() => setIsFormVisible(!isFormVisible)}>
                  {isFormVisible ? 'Hide Form' : 'Add New Product'}
                </Button>
              </div>

              {isFormVisible && (
                <div className="mb-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 text-center">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <ProductForm 
                    onSubmit={handleSubmit}
                    initialData={editingProduct} 
                  />
                </div>
              )}

              {isLoading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : (
                <ProductList 
                  products={products} 
                  onEdit={(product) => {
                    setEditingProduct(product)
                    setIsFormVisible(true)
                  }} 
                  onDelete={handleDeleteProduct} 
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}