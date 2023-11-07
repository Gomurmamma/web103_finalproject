import express from 'express'
import ArtistsController from '../controllers/artists.js'

const router = express.Router()

router.get('/', ArtistsController.getArtists)

router.get('/:id', ArtistsController.getArtist)

router.post('/', ArtistsController.createArtist)

router.delete('/:id', ArtistsController.deleteArtist)

router.patch('/:id', ArtistsController.updateArtist)

export default router