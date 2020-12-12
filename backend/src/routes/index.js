import express from 'express'
const router = express.Router()

import apiv1 from './api-v1/index.js'

router.use('/api/v1', apiv1)

export default router