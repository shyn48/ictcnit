import express from 'express'
const router = express.Router()

import userRoutes from './api-v1/userRoutes.js'
import postRoutes from './api-v1/postRoutes.js'
import formRoutes from './api-v1/formRoutes.js'
import serviceRoutes from './api-v1/serviceRoutes.js'
import helpRoutes from './api-v1/helpRoutes.js'

router.use('/api/users', userRoutes)
router.use('/api/posts', postRoutes)
router.use('/api/form', formRoutes)
router.use('/api/service', serviceRoutes)
router.use('/api/helps', helpRoutes)

export default router