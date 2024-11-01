import express from 'express'
const router = express.Router()

import { loginUser, tokenRefresh, logoutUser } from '../controllers/authController.js'

router.post('/login', loginUser)
router.post('/refresh-token', tokenRefresh)
router.post('/logout', logoutUser)

export default router