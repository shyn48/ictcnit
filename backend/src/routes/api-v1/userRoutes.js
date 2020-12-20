import express from 'express'
const router = express.Router()

//controllers and middlewares
import userController from '../../controllers/userController.js'
import { admin, protect } from '../../middlewares/authMiddleWare.js'
//import authMiddleWare from 'src/middlwares/authMiddleWare.js'


//user routes
router.post('/create', userController.registerUser)
router.post('/login', userController.authUser)

router.route('/profile').get(protect ,userController.getUserProfile).put(userController.updateUserProfile)
router.route('/:id').delete(protect, admin ,userController.deleteUser).get(protect, admin ,userController.getUserById).put(protect, userController.updateUser)

export default router