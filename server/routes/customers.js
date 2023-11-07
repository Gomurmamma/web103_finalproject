import express from 'express'
import CustomersController from '../controllers/customers.js'

const router = express.Router()

router.get('/', CustomersController.getCustomers)

router.get('/:id', CustomersController.getCustomer)

router.post('/', CustomersController.createCustomer)

router.delete('/:id', CustomersController.deleteCustomer)

router.patch('/:id', CustomersController.updateCustomer)

export default router