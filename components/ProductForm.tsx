import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Product, NewProduct } from '@/types/product'

interface ProductFormProps {
  onSubmit: (product: NewProduct) => void;
  initialData?: Product | null;
}

export default function ProductForm({ onSubmit, initialData }: ProductFormProps) {
  const [product, setProduct] = useState<NewProduct>({
    name: '',
    description: '',
    price: 0,
    quantity: 0
  })

  useEffect(() => {
    if (initialData) {
      setProduct(initialData)
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(product)
    if (!initialData) {
      setProduct({ name: '', description: '', price: 0, quantity: 0 })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-blue-800">Product Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price" className="text-blue-800">Price</Label>
          <Input
            id="price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
            step="0.01"
            required
            className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-blue-800">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Enter product description"
          required
          className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="quantity" className="text-blue-800">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          required
          className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        {initialData ? 'Update' : 'Add'} Product
      </Button>
    </form>
  )
}