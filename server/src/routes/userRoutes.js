import express from 'express'
const router = express.Router()

import { getUser } from '../controllers/userController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

router.get('/me', authenticateToken ,getUser)

export default router