import express from 'express'
const router = express.Router()

//controllers and middlewares
import formController from '../../controllers/formController.js'
import { protect, admin } from '../../middlewares/authMiddleWare.js'

//routes
router.post('/contact', formController.sendContactForm) //change to sending email IF they accepted the website
router.get('/contact', formController.fetchContacts)
router.delete('/contact',protect, admin ,formController.deleteContact)
router.post('/collab', formController.sendCollabForm)


export default router