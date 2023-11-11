import { pool } from '../config/database.js'

const createCustomer = async (req, res) => {
    try {
        const { email, customername, password, imageURL } = req.body
        const results = await pool.query(
            `INSERT INTO customers (email, customername, password, imageURL)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [email, customername, password, imageURL]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message})
        console.log('Unable to create customer')
        console.log('Error:', error.message)
    }
}

const getAllCustomers = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM customers ORDER BY customerID ASC')
        res.status(200).json(results.rows)
    }
    catch(error){
        res.status(409).json({ error: error.message})
    }
}

const getCustomer = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM customers WHERE customerID = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to get customer')
        console.log('Error:', error.message)
    }
}

const updateCustomer = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const { email, customername, password, imageURL } = req.body
        const results = await pool.query(
            `UPDATE customers
            SET email = $1, customername = $2, password = $3, imageURL = $4
            WHERE customerID = $5
            RETURNING *`,
            [email, customername, password, imageURL, id]
        )
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to update customer')
        console.log('Error:', error.message)
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM customers WHERE customerID = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to delete customer')
        console.log('Error:', error.message)
    }
}

const getAllCustomersOfRelease = async (releaseID) => {
    try{
        const results = await pool.query(
            `SELECT * 
            FROM customers AS C
            INNER JOIN releaseorders AS RO ON RO.customerID = C.customerID
            INNER JOIN releases AS R ON R.releaseID = RO.releaseID
            WHERE R.releaseID = $1`, [releaseID])
        return results.rows
    }
    catch(error){
        console.log('Unable to get releases of customer with ID ' + customerID)
        console.log('Error:', error.message)
    }
}

const getCustomerById = async (customerID) => {
    try{
        const results = await pool.query('SELECT * FROM customers WHERE customerID = $1', [customerID])
        return results.rows
    }
    catch(error){
        console.log('Unable to get customer with ID ' + customerID)
        console.log('Error:', error.message)
    }
}


export default {
    createCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomersOfRelease,
    getCustomerById
}