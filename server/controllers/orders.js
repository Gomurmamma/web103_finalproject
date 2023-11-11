import { pool } from '../config/database.js'

const createOrder = async (req, res) => {
    try {
        const { customerID, orderDate, totalPrice, salesTax } = req.body
        const results = await pool.query(
            `INSERT INTO orders (customerID, orderDate, totalPrice, salesTax)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [customerID, orderDate, totalPrice, salesTax]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message})
        console.log('Unable to create order')
        console.log('Error:', error.message)
    }
}

const getOrders = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM orders ORDER BY orderID ASC')
        res.status(200).json(results.rows)
    }
    catch(error){
        res.status(409).json({ error: error.message})
    }
}

const getOrder = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM orders WHERE orderID = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to get order')
        console.log('Error:', error.message)
    }
}

const updateOrder = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const { customerID, orderDate, totalPrice, salesTax } = req.body
        const results = await pool.query(
            `UPDATE orders
            SET customerID = $1, orderDate = $2, totalPrice = $3, salesTax = $4
            WHERE orderID = $5
            RETURNING *`,
            [customerID, orderDate, totalPrice, salesTax, id]
        )
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to update order')
        console.log('Error:', error.message)
    }
}

const deleteOrder = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM orders WHERE orderID = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to delete order')
        console.log('Error:', error.message)
    }
}

export default {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
}