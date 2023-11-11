import express from 'express'
import cors from 'cors'
import artistRoutes from './routes/artists.js'
import customerRoutes from './routes/customers.js'
import orderRoutes from './routes/orders.js'
import releaseOrderRoutes from './routes/releaseorders.js'
import releaseRoutes from './routes/releases.js'
import trackRoutes from './routes/tracks.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ OnTheFly API</h1>')
})

app.use('/api/artists', artistRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/releaseorders', releaseOrderRoutes)
app.use('/api/releases', releaseRoutes)
app.use('/api/tracks', trackRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})