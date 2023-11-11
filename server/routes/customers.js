import express from 'express'
import CustomersController from '../controllers/customers.js'
import ReleasesController from '../controllers/releases.js'

const router = express.Router()

router.get('/', CustomersController.getAllCustomers)

//Group of routes for a specific customer and their customer page
router.get('/:id', CustomersController.getCustomer)
router.get('/:id/releases', ReleasesController.getAllReleasesOfCustomer)

router.post('/', CustomersController.createCustomer)

router.delete('/:id', CustomersController.deleteCustomer)

router.patch('/:id', CustomersController.updateCustomer)

export default router