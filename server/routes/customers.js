import express from 'express'
import CustomersController from '../controllers/customers.js'
import ReleasesController from '../controllers/releases.js'

const router = express.Router()

router.get('/', CustomersController.getAllCustomers)

router.get('/:id', async (req, res) => {
    try {
        const customer = await CustomersController.getCustomerById(req.params.id) // retrieve single customer by ID
        const releases = await ReleasesController.getAllReleasesOfCustomer(req.params.id) // get all released purchased by the customer
        res.render('customer', { customer, releases})
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

router.post('/', CustomersController.createCustomer)

router.delete('/:id', CustomersController.deleteCustomer)

router.patch('/:id', CustomersController.updateCustomer)

export default router