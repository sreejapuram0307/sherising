import express from 'express'
import { getDashboardStats, getMyInvestments } from '../controllers/investorController.js'
import { protect, restrictTo } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/dashboard', protect, restrictTo('Investor'), getDashboardStats)
router.get('/my-investments', protect, restrictTo('Investor'), getMyInvestments)

export default router
