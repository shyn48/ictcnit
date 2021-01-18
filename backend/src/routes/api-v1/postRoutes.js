import express from 'express'
const router = express.Router()

//controllers and middlewares
import postController from '../../controllers/postController.js'
import { protect, admin } from '../../middlewares/authMiddleWare.js'


//routes
router.route('/')
.get(postController.fetchPosts)
.post(protect, admin, postController.createPost)

router.route('/:id')
.put(protect, admin, postController.updatePost)
.delete(protect, admin, postController.deletePost)

router.get('/comments', postController.fetchComments)
router.post('/comment/approve', postController.approveComment)
router.post('/comment/delete', postController.deleteComment)

router.get('/top', postController.fetchTopPosts)

router.route('/:id').get(postController.fetchSinglePost)
router.post('/:id/comment', postController.comment)

export default router