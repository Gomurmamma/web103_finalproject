import { pool } from '../config/database.js'

const createRelease = async (req, res) => {
    try {
        const { title, imageurl, releaseDate, price, artistid, description } = req.body
        const results = await pool.query(
            `INSERT INTO releases (title, imageurl, releaseDate, price, artistid, description)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [title, imageurl, releaseDate, price, artistid, description]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message})
        console.log('Unable to create release')
        console.log('Error:', error.message)
    }
}

const getAllReleases = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM releases ORDER BY releaseid ASC');
        res.status(200).json(results.rows);
    }
    catch(error){
        res.status(409).json({ error: error.message})
    }
}

const getRelease = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM releases WHERE releaseid = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to get release')
        console.log('Error:', error.message)
    }
}

const updateRelease = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const { title, imageurl, releaseDate, price, artistid, description } = req.body
        const results = await pool.query(
            `UPDATE releases
            SET title = $1, imageurl = $2, releaseDate = $3, price = $4, artistid = $5, description = $6
            WHERE releaseid = $7
            RETURNING *`,
            [title, imageurl, releaseDate, price, artistid, description, id]
        )
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to update release')
        console.log('Error:', error.message)
    }
}

const deleteRelease = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM releases WHERE releaseid = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to delete release')
        console.log('Error:', error.message)
    }
}

const getAllReleasesOfArtist = async (artistid) => {
    try{
        const results = await pool.query('SELECT * FROM releases WHERE artistid = $1', [artistid])
        return results.rows
    }
    catch(error){
        console.log('Unable to get releases of artist with id ' + artistid)
        console.log('Error:', error.message)
    }
}

const getAllReleasesOfCustomer = async (customerid) => {
    try{
        const results = await pool.query(
            `SELECT * 
            FROM releases AS R
            INNER JOIN releaseorders AS RO ON R.releaseid = RO.releaseid
            OUTER JOIN orders as O ON RO.orderid = O.orderid
            OUTER JOIN customers AS C ON O.customerid = C.customerid
            WHERE C.customerid = $1`, [customerid])
        return results.rows
    }
    catch(error){
        console.log('Unable to get releases of customer with id ' + customerid)
        console.log('Error:', error.message)
    }
}

const getAllReleasesOfOrder = async (orderid) => {
    try{
        const results = await pool.query(
            `SELECT * 
            FROM releases AS R
            INNER JOIN releaseorders AS RO ON R.releaseid = RO.releaseid
            WHERE RO.orderid = $1`, [orderid])
        return results.rows
    }
    catch(error){
        console.log('Unable to get releases of customer with id ' + customerid)
        console.log('Error:', error.message)
    }
}

const getReleaseById = async (releaseid) => {
    try{
        const results = await pool.query('SELECT * FROM releases WHERE releaseid = $1', [releaseid])
        return results.rows
    }
    catch(error){
        console.log('Unable to get releases of artist with id ' + releaseid)
        console.log('Error:', error.message)
    }
}

export default {
    createRelease,
    getAllReleases,
    getRelease,
    updateRelease,
    deleteRelease,
    getAllReleasesOfArtist,
    getAllReleasesOfCustomer,
    getAllReleasesOfOrder,
    getReleaseById
}