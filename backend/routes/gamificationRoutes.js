import express from 'express'
import { getLeaderboard, getUserBadgeProgress } from '../controllers/gamificationController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/leaderboard', protect, getLeaderboard)
router.get('/badge-progress', protect, getUserBadgeProgress)

export default router
