import express from 'express'
import ReleasesController from '../controllers/releases.js'
import TracksController from '../controllers/tracks.js'
import CustomersController from '../controllers/customers.js'

const router = express.Router()

router.get('/', ReleasesController.getAllReleases)

router.get('/:id', async (req, res) => {
    try {
        const release = await ReleasesController.getReleaseById(req.params.id)
        const tracks = await TracksController.getAllTracksOfRelease(req.params.id) // get all tracks in the release
        const customers = await CustomersController.getAllCustomersOfRelease(release[releaseID]) // get all customers who purchased the release
        res.render('release', { release, tracks, customers})
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
})
router.post('/', ReleasesController.createRelease)

router.delete('/:id', ReleasesController.deleteRelease)

router.patch('/:id', ReleasesController.updateRelease)

export default router