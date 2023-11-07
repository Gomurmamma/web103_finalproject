import express from 'express'
import ReleasesController from '../controllers/releases.js'

const router = express.Router()

router.get('/', ReleasesController.getReleases)

router.get('/:id', ReleasesController.getRelease)

router.post('/', ReleasesController.createRelease)

router.delete('/:id', ReleasesController.deleteRelease)

router.patch('/:id', ReleasesController.updateRelease)

export default router