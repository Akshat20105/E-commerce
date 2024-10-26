import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'
import { Product } from '@/types/product'

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  if (!Array.isArray(products) || products.length === 0) {
    return <div className="text-center py-4 text-blue-800">No products available.</div>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-100 bg-opacity-50">
            <TableHead className="w-[100px] text-blue-900">ID</TableHead>
            <TableHead className="text-blue-900">Name</TableHead>
            <TableHead className="text-blue-900">Description</TableHead>
            <TableHead className="text-right text-blue-900">Price</TableHead>
            <TableHead className="text-right text-blue-900">Quantity</TableHead>
            <TableHead className="text-right text-blue-900">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-blue-50">
              <TableCell className="font-medium text-blue-800">{product.id}</TableCell>
              <TableCell className="text-blue-800">{product.name}</TableCell>
              <TableCell className="text-blue-800">{product.description}</TableCell>
              <TableCell className="text-right text-blue-800">${product.price.toFixed(2)}</TableCell>
              <TableCell className="text-right text-blue-800">{product.quantity}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onEdit(product)} className="mr-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(product.id)} className="text-red-500 hover:text-red-700 hover:bg-red-100">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}