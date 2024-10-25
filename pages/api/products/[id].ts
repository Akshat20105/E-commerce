import { NextApiRequest, NextApiResponse } from 'next'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'PUT') {
    const { name, description, price, quantity } = req.body
    try {
      const { rows } = await pool.query(
        'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *',
        [name, description, price, quantity, id]
      )
      if (rows.length === 0) {
        res.status(404).json({ error: 'Product not found' })
      } else {
        console.log('Updated product:', rows[0])
        res.status(200).json(rows[0])
      }
    } catch (error) {
      console.error('Error updating product:', error)
      res.status(500).json({ error: 'Error updating product' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const { rowCount } = await pool.query('DELETE FROM products WHERE id = $1', [id])
      if (rowCount === 0) {
        res.status(404).json({ error: 'Product not found' })
      } else {
        console.log('Deleted product with id:', id)
        res.status(204).end()
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      res.status(500).json({ error: 'Error deleting product' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}