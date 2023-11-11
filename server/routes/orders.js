import express from 'express'
import OrdersController from '../controllers/orders.js'

const router = express.Router()

router.get('/', OrdersController.getOrders)

router.get('/:id', OrdersController.getOrder)

router.post('/', OrdersController.createOrder)

router.delete('/:id', OrdersController.deleteOrder)

router.patch('/:id', OrdersController.updateOrder)

export default router