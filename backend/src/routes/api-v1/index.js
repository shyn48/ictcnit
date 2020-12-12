import express from 'express'
const router = express.Router()

import publicRoutes from './public.js'
import privateRoutes from './private.js'

//TODO:AUTH API USING JWT

router.use(publicRoutes)
router.use(/* authApi.handle, */ privateRoutes)

export default router
