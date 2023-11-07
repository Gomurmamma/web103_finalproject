import { pool } from '../config/database.js'

const createArtist = async (req, res) => {
    try {
        const { artistname, genre, location, imageURL } = req.body
        const results = await pool.query(
            `INSERT INTO artists (artistname, genre, location, imageURL)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [artistname, genre, location, imageURL]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message})
        console.log('Unable to create artist')
        console.log('Error:', error.message)
    }
}

const getArtists = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM artists ORDER BY artistID ASC')
        res.status(200).json(results.rows)
    }
    catch(error){
        res.status(409).json({ error: error.message})
    }
}

const getArtist = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM artists WHERE artistID = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to get artist')
        console.log('Error:', error.message)
    }
}

const updateArtist = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const { artistname, genre, location, imageURL } = req.body
        const results = await pool.query(
            `UPDATE artists
            SET artistname = $1, genre = $2, location = $3, imageURL = $4
            WHERE artistID = $5`,
            [artistname, genre, location, imageURL, id]
        )
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to update artist')
        console.log('Error:', error.message)
    }
}

const deleteArtist = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM artists WHERE artistID = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to delete artist')
        console.log('Error:', error.message)
    }
}

export default {
    createArtist,
    getArtists,
    getArtist,
    updateArtist,
    deleteArtist
}