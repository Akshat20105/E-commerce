import { useState, useEffect } from 'react'
import ProductList from '../components/ProductList'
import ProductForm from '../components/ProductForm'
import { Button } from "@/components/ui/button"
import { Package2, Github } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex flex-col">
      <div className="absolute inset-0 bg-blue-200 bg-opacity-50 backdrop-filter backdrop-blur-lg z-0"></div>
      <nav className="relative z-10 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Package2 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-2xl font-bold text-blue-800">GIVA</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-grow flex items-center justify-center p-4">
        <div className="max-w-4xl w-full mx-auto">
          <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-blue-900 mb-4 text-center">Product Management System</h1>
              {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">{error}</div>}
              
              <div className="mb-4 text-center">
                <Button 
                  onClick={() => setIsFormVisible(!isFormVisible)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isFormVisible ? 'Hide Form' : 'Add New Product'}
                </Button>
              </div>

              {isFormVisible && (
                <div className="mb-6 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-md">
                  <h3 className="text-lg leading-6 font-medium text-blue-900 mb-4 text-center">
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
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : (
                <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-md overflow-hidden">
                  <ProductList 
                    products={products} 
                    onEdit={(product) => {
                      setEditingProduct(product)
                      setIsFormVisible(true)
                    }} 
                    onDelete={handleDeleteProduct} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-blue-800">
              © 2024 Product Management System. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/Akshat20105/E-commerce.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <p className="text-sm text-blue-800">
                Created by Akshat
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}