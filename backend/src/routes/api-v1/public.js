import express from 'express'
const router = express.Router()

router.get('/public', (req,res) => res.json('Hello Public World'))

export default router