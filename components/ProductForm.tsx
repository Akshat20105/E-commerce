import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ProductForm({ onSubmit, initialData }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  })

  useEffect(() => {
    if (initialData) {
      setProduct(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity)
    })
    setProduct({ name: '', description: '', price: '', quantity: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
      <Input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <Textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <Input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        step="0.01"
        required
      />
      <Input
        type="number"
        name="quantity"
        value={product.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />
      <Button type="submit">{initialData ? 'Update' : 'Add'} Product</Button>
    </form>
  )
}