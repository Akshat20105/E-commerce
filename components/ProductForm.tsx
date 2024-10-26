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
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
            step="0.01"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Enter product description"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {initialData ? 'Update' : 'Add'} Product
      </Button>
    </form>
  )
}