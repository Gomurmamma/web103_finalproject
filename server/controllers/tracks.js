import { pool } from '../config/database.js'

const createTrack = async (req, res) => {
    try {
        const { title, releaseid } = req.body
        const results = await pool.query(
            `INSERT INTO tracks (title, releaseid)
            VALUES ($1, $2)
            RETURNING *`,
            [title, releaseid]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message})
        console.log('Unable to create track')
        console.log('Error:', error.message)
    }
}

const getAllTracks = async (req, res) => {
    try{
        results = await pool.query('SELECT * FROM tracks ORDER BY trackid ASC');
        res.status(200).json(results.rows);
    }
    catch(error){
        res.status(409).json({ error: error.message})
    }
}

const getTrack = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM tracks WHERE trackid = $1', [id])
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
        const { title, releaseid } = req.body
        const results = await pool.query(
            `UPDATE tracks
            SET title = $1, releaseid = $2
            WHERE trackid = $3
            RETURNING *`,
            [title, releaseid, id]
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
        const results = await pool.query('DELETE FROM tracks WHERE trackid = $1 RETURNING *', [id])
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to delete track')
        console.log('Error:', error.message)
    }
}

const getAllTracksOfArtist = async (req, res) => {
    try {
        const artistid = parseInt(req.params.id)
        const results = await pool.query(
            `SELECT * FROM tracks AS T
            INNER JOIN Releases AS R ON R.releaseid = T.releaseid
            WHERE R.artistid = $1 ORDER BY releaseid ASC`, [artistid]);
        res.status(200).json(results.rows[0])
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to retrieve tracks of artist with id ' + artistid)
        console.log('Error:', error.message)
    }
}

const getAllTracksOfRelease = async (req, res) => {
    try {
        const releaseid = parseInt(req.params.id)
        const results = await pool.query(
            `SELECT * FROM tracks AS T
            INNER JOIN Releases AS R ON R.releaseid = T.releaseid
            WHERE R.releaseid = $1`, [releaseid]);
        return results.rows;
    }
    catch(error){
        res.status(409).json({ error: error.message})
        console.log('Unable to retrieve tracks of release with id ' + releaseid)
        console.log('Error:', error.message)
    }
}

export default {
    createTrack,
    getAllTracks,
    getTrack,
    updateTrack,
    deleteTrack,
    getAllTracksOfArtist,
    getAllTracksOfRelease
}