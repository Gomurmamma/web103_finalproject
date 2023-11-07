import { pool } from '../config/database.js'

const createTrack = async (req, res) => {
    try {
        const { title, releaseID } = req.body
        const results = await pool.query(
            `INSERT INTO tracks (title, releaseID)
            VALUES ($1, $2)
            RETURNING *`,
            [title, releaseID]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message})
        console.log('Unable to create track')
        console.log('Error:', error.message)
    }
}

const getTracks = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM tracks ORDER BY trackID ASC')
        res.status(200).json(results.rows)
    }
    catch(error){
        res.status(409).json({ error: error.message})
    }
}

const getTrack = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM tracks WHERE trackID = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to get track')
        console.log('Error:', error.message)
    }
}

const updateTrack = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const { title, releaseID } = req.body
        const results = await pool.query(
            `UPDATE tracks
            SET title = $1, releaseID = $2
            WHERE trackID = $3
            RETURNING *`,
            [title, releaseID, id]
        )
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to update track')
        console.log('Error:', error.message)
    }
}

const deleteTrack = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM tracks WHERE trackID = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to delete track')
        console.log('Error:', error.message)
    }
}

export default {
    createTrack,
    getTracks,
    getTrack,
    updateTrack,
    deleteTrack
}