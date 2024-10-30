import express from 'express'
const router = express.Router()

import { getUser } from '../controllers/userController.js'

router.get('/me', getUser)

export default router