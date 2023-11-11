import express from 'express'
import ReleasesController from '../controllers/releases.js'
import TracksController from '../controllers/tracks.js'
import CustomersController from '../controllers/customers.js'

const router = express.Router()

router.get('/', ReleasesController.getAllReleases)

//Group of routes for a specific release and their release page
router.get('/:id', ReleasesController.getRelease)
router.get('/:id/customers', CustomersController.getAllCustomersOfRelease)
router.get('/:id/tracks', TracksController.getAllTracksOfRelease)

router.post('/', ReleasesController.createRelease)

router.delete('/:id', ReleasesController.deleteRelease)

router.patch('/:id', ReleasesController.updateRelease)

export default router