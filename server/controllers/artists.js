import { pool } from '../config/database.js'

const createArtist = async (req, res) => {
    try {
        const { artistname, genre, location, imageurl } = req.body
        const results = await pool.query(
            `INSERT INTO artists (artistname, genre, location, imageurl)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [artistname, genre, location, imageurl]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message})
        console.log('Unable to create artist')
        console.log('Error:', error.message)
    }
}

const getAllArtists = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM artists ORDER BY artistid ASC')
        res.status(200).json(results.rows)
    }
    catch(error){
        res.status(409).json({ error: error.message})
    }
}

const getArtist = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM artists WHERE artistid = $1', [id])
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
        const { artistname, genre, location, imageurl } = req.body
        const results = await pool.query(
            `UPDATE artists
            SET artistname = $1, genre = $2, location = $3, imageurl = $4
            WHERE artistid = $5
            RETURNING *`,
            [artistname, genre, location, imageurl, id]
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
        const results = await pool.query('DELETE FROM artists WHERE artistid = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to delete artist')
        console.log('Error:', error.message)
    }
}

const getArtistById = async (artistid) => {
    try{
        const results = await pool.query('SELECT * FROM artists WHERE artistid = $1', [artistid])
        return results.rows
    }
    catch(error){
        console.log('Unable to get artist with id ' + artistid)
        console.log('Error:', error.message)
    }
}

export default {
    createArtist,
    getAllArtists,
    getArtist,
    updateArtist,
    deleteArtist,
    getArtistById
}