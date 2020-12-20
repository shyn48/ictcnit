import express from 'express'
const router = express.Router()

import userRoutes from './api-v1/userRoutes.js'
import postRoutes from './api-v1/postRoutes.js'

router.use('/api/users', userRoutes)
router.use('/api/posts', postRoutes)

export default router