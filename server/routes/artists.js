import express from 'express'
import ArtistsController from '../controllers/artists.js'
import TracksController from '../controllers/tracks.js'
import ReleasesController from '../controllers/releases.js'

const router = express.Router()

router.get('/', ArtistsController.getAllArtists)

router.get('/:id', async (req, res) => {
    try {
        const artist = await ArtistsController.getArtistById(req.params.id) // retrieve single artist by ID
        const tracks = await TracksController.getAllTracksOfArtist(req.params.id) // get all tracks released by the artist
        const releases = await ReleasesController.getAllReleasesOfArtist(req.params.id) // get all releases by the artist
        res.render('artist', { artist, tracks, releases})
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

router.post('/', ArtistsController.createArtist)

router.delete('/:id', ArtistsController.deleteArtist)

router.patch('/:id', ArtistsController.updateArtist)

export default router