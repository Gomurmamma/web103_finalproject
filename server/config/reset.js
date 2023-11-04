import { pool } from './database.js'
import './dotenv.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const currentPath = fileURLToPath(import.meta.url)

const artistsFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/data.json'))

const artistsData = JSON.parse(artistsFile)

const createArtistsTable = async () => {
    const createArtistsTableQuery = `
    CREATE TABLE IF NOT EXISTS artists (
        artistID SERIAL PRIMARY KEY,
        artistname VARCHAR(50),
        genre VARCHAR(50),
        location VARCHAR(50),
        imageURL VARCHAR(100)
    );
    `
    try {
        const res = await pool.query(createArtistsTableQuery)
        console.log('🎵 Artists table created successfully!')
    } catch (error) {
        console.error('⚠️ error creating artists table', error)
    }
}

const seedArtistsTable = async () => {
    await createArtistsTable()

    artistsData.forEach((artist) => {
        const insertArtistQuery = {
        text: `
        INSERT INTO artists (artistname, genre, location, imageURL)
        VALUES ($1, $2, $3, $4)
        `}
        const values = [artist.artistname, artist.genre, artist.location, artist.imageURL]
        pool.query(insertArtistQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting artist', err)
                return
            }
            console.log(`✅ ${artist.artistname} inserted successfully!`)
        })
    })
}

seedArtistsTable()

const creatTracksTable = async () => {
}