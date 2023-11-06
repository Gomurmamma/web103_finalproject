import { pool } from './database.js'
import './dotenv.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import { create } from 'domain'

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
            `
        }
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

const createReleasesTable = async () => {
    const createReleasesTableQuery = `
    CREATE TABLE IF NOT EXISTS releases (
        releaseID SERIAL PRIMARY KEY,
        title VARCHAR(50),
        imageURL VARCHAR(100),
        description VARCHAR(50),
        releasedate DATE,
        price DECIMAL(19,2),
        FOREIGN KEY (artistID) REFERENCES artists(artistID) ON UPDATE CASCADE
    );
    `
    try {
        const res = await pool.query(createReleasesTableQuery)
        console.log('🎵 Releases table created successfully!')
    } catch (error) {
        console.error('⚠️ error creating releases table', error)
    }
}

createReleasesTable()

const createTracksTable = async () => {
    const createTracksTableQuery = `
    CREATE TABLE IF NOT EXISTS tracks (
        trackID SERIAL PRIMARY KEY,
        title VARCHAR(50),
        releaseID INTEGER,
        FOREIGN KEY (releaseID) REFERENCES releases(releaseID) ON UPDATE CASCADE
    );
    `
    try {
        const res = await pool.query(createTracksTableQuery)
        console.log('🎵 Tracks table created successfully!')
    } catch (error) {
        console.error('⚠️ error creating tracks table', error)
    }
}

createTracksTable()

const createCustomersTable = async () => {
    const createCustomersTableQuery = `
    CREATE TABLE IF NOT EXISTS customers (
        customerID SERIAL PRIMARY KEY,
        email VARCHAR(255),
        customername VARCHAR(50),
        password VARCHAR(50),
        imageURL VARCHAR(100)
    );
    `
    try {
        const res = await pool.query(createCustomersTableQuery)
        console.log('🎵 Customers table created successfully!')
    } catch (error) {
        console.error('⚠️ error creating customers table', error)
    }
}

createCustomersTable()

const createOrdersTable = async () => {
    const createOrdersTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
        orderID SERIAL PRIMARY KEY,
        FOREIGN KEY (customerID) REFERENCES customers(customerID) ON UPDATE CASCADE,
        orderDate TIMESTAMP,
        totalPrice DECIMAL(19,2),
        salesTax DECIMAL(19,2)
    );
    `
    try {
        const res = await pool.query(createOrdersTableQuery)
        console.log('🎵 Orders table created successfully!')
    } catch (error) {
        console.error('⚠️ error creating orders table', error)
    }
}

createOrdersTable()

const createReleaseOrdersTable = async () => {
    const createReleaseOrdersTableQuery = `
    CREATE TABLE IF NOT EXISTS release_orders (
        releaseorderID SERIAL PRIMARY KEY,
        releaseID INTEGER REFERENCES releases(releaseID) ON UPDATE CASCADE,
        orderID INTEGER REFERENCES orders(orderID) ON UPDATE CASCADE,
        purchasePrice DECIMAL(19,2)
    );
    `
    try {
        const res = await pool.query(createReleaseOrdersTableQuery)
        console.log('🎵 Release orders table created successfully!')
    } catch (error) {
        console.error('⚠️ error creating release orders table', error)
    }
}

createReleaseOrdersTable()