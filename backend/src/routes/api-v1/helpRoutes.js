import express from 'express'
const router = express.Router()

//controllers and middlewares
import helpController from '../../controllers/helpController.js'
import { protect, admin } from '../../middlewares/authMiddleWare.js'


//routes
router.route('/')
.get(helpController.fetchHelps)
.post(protect, admin, helpController.createHelp)
.put(protect, admin, helpController.updateHelp)
.delete(protect, admin, helpController.deleteHelp)

router.route('/:id').get(helpController.fetchSingleHelp)

export default router