import express from 'express'
const router = express.Router()

import { registerUser, getUser } from '../controllers/userController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'


router.post('/register', registerUser)
router.get('/me', authenticateToken ,getUser)

export default router