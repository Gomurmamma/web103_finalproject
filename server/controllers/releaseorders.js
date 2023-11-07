import { pool } from '../config/database.js'

const createReleaseOrder = async (req, res) => {
    try {
        const { releaseID, orderID, purchasePrice } = req.body
        const results = await pool.query(
            `INSERT INTO releaseOrders (releaseID, orderID, purchasePrice)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [releaseID, orderID, purchasePrice]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message})
        console.log('Unable to create releaseOrder')
        console.log('Error:', error.message)
    }
}

const getReleaseOrders = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM releaseOrders ORDER BY releaseOrderID ASC')
        res.status(200).json(results.rows)
    }
    catch(error){
        res.status(409).json({ error: error.message})
    }
}

const getReleaseOrder = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM releaseOrders WHERE releaseOrderID = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to get releaseOrder')
        console.log('Error:', error.message)
    }
}

const updateReleaseOrder = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const { releaseID, orderID, purchasePrice } = req.body
        const results = await pool.query(
            `UPDATE releaseOrders
            SET releaseID = $1, orderID = $2, purchasePrice = $3
            WHERE releaseOrderID = $4
            RETURNING *`,
            [releaseID, orderID, purchasePrice, id]
        )
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to update releaseOrder')
        console.log('Error:', error.message)
    }
}

const deleteReleaseOrder = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM releaseOrders WHERE releaseOrderID = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to delete releaseOrder')
        console.log('Error:', error.message)
    }
}

export default {
    createReleaseOrder,
    getReleaseOrders,
    getReleaseOrder,
    updateReleaseOrder,
    deleteReleaseOrder
}