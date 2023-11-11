import express from 'express'
import ArtistsController from '../controllers/artists.js'
import TracksController from '../controllers/tracks.js'
import ReleasesController from '../controllers/releases.js'

const router = express.Router()

router.get('/', ArtistsController.getAllArtists)

//Group of routes for a specific artist and their artist page
router.get('/:id', ArtistsController.getArtist)
router.get('/:id/tracks', TracksController.getAllTracksOfArtist)
router.get('/:id/releases', ReleasesController.getAllReleasesOfArtist)

router.post('/', ArtistsController.createArtist)

router.delete('/:id', ArtistsController.deleteArtist)

router.patch('/:id', ArtistsController.updateArtist)

export default router