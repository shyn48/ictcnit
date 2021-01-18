import express from 'express'
const router = express.Router()

//controllers and middlewares
import serviceController from '../../controllers/serviceController.js'
import { protect, admin } from '../../middlewares/authMiddleWare.js'


//routes
router.route('/')
.get(serviceController.fetchServices)
.post(protect, admin, serviceController.createService)
.put(protect, admin, serviceController.updateService)
.delete(protect, admin, serviceController.deleteService)

router.route('/:id').get(serviceController.fetchSingleService)

export default router