import express from 'express'
const router = express.Router()

router.get('/public', (req,res) => res.json('Hello Private World'))

export default router