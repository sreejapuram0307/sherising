import express from 'express'
import { getProfile, getProfileById, updateProfile } from '../controllers/profileController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getProfile)
router.get('/:userId', protect, getProfileById)
router.put('/', protect, updateProfile)

export default router
