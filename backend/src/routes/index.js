import express from 'express'
const router = express.Router()

import userRoutes from './api-v1/userRoutes.js'

router.use('/api/users', userRoutes)

export default router