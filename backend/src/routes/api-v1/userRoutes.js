import express from 'express'
const router = express.Router()

//controllers and middlewares
import userController from '../../controllers/userController.js'
//import authMiddleWare from 'src/middlwares/authMiddleWare.js'


//user routes
router.post('/create', userController.registerUser)
router.post('/login', userController.authUser)

router.route('/profile').get(userController.getUserProfile).put(userController.updateUserProfile)
router.route('/:id').delete(userController.deleteUser).get(userController.getUserById).put(userController.updateUser)

export default router