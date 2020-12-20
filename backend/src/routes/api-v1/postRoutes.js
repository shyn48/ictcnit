import express from 'express'
const router = express.Router()

//controllers and middlewares
import postController from '../../controllers/postController.js'
import { protect, admin } from '../../middlewares/authMiddleWare.js'


//routes
router.route('/')
.get(postController.fetchPosts)
.post(protect, admin, postController.createPost)
.put(protect, admin, postController.updatePost)
.delete(protect, admin, postController.deletePost)

router.route('/:id').get(postController.fetchSinglePost)
router.post('/comment', protect, postController.comment)

export default router