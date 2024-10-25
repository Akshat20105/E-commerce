import { NextApiRequest, NextApiResponse } from 'next'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM products')
      console.log('Fetched products:', rows)
      res.status(200).json(rows)
    } catch (error) {
      console.error('Error fetching products:', error)
      res.status(500).json({ error: 'Error fetching products' })
    }
  } else if (req.method === 'POST') {
    const { name, description, price, quantity } = req.body
    try {
      const { rows } = await pool.query(
        'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, quantity]
      )
      console.log('Created product:', rows[0])
      res.status(201).json(rows[0])
    } catch (error) {
      console.error('Error creating product:', error)
      res.status(500).json({ error: 'Error creating product' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}