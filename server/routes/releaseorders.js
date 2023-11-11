import express from 'express'
import ReleaseOrdersController from '../controllers/releaseorders.js'

const router = express.Router()

router.get('/', ReleaseOrdersController.getReleaseOrders)

router.get('/:id', ReleaseOrdersController.getReleaseOrder)

router.post('/', ReleaseOrdersController.createReleaseOrder)

router.delete('/:id', ReleaseOrdersController.deleteReleaseOrder)

router.patch('/:id', ReleaseOrdersController.updateReleaseOrder)

export default router