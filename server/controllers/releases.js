import { pool } from '../config/database.js'

const createRelease = async (req, res) => {
    try {
        const { title, imageURL, releaseDate, price, artistID, description } = req.body
        const results = await pool.query(
            `INSERT INTO releases (title, imageURL, releaseDate, price, artistID, description)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [title, imageURL, releaseDate, price, artistID, description]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message})
        console.log('Unable to create release')
        console.log('Error:', error.message)
    }
}

const getReleases = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM releases ORDER BY releaseID ASC')
        res.status(200).json(results.rows)
    }
    catch(error){
        res.status(409).json({ error: error.message})
    }
}

const getRelease = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM releases WHERE releaseID = $1', [id])
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
        const { title, imageURL, releaseDate, price, artistID, description } = req.body
        const results = await pool.query(
            `UPDATE releases
            SET title = $1, imageURL = $2, releaseDate = $3, price = $4, artistID = $5, description = $6
            WHERE releaseID = $7
            RETURNING *`,
            [title, imageURL, releaseDate, price, artistID, description, id]
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
        const results = await pool.query('DELETE FROM releases WHERE releaseID = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to delete release')
        console.log('Error:', error.message)
    }
}

export default {
    createRelease,
    getReleases,
    getRelease,
    updateRelease,
    deleteRelease
}