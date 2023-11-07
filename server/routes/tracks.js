import express from 'express'
import TracksController from '../controllers/tracks.js'

const router = express.Router()

router.get('/', TracksController.getTracks)

router.get('/:id', TracksController.getTrack)

router.post('/', TracksController.createTrack)

router.delete('/:id', TracksController.deleteTrack)

router.patch('/:id', TracksController.updateTrack)

export default router