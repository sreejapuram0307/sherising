import express from 'express'
import { getEntrepreneurMatches, getInvestorMatches } from '../controllers/matchController.js'
import { protect, restrictTo } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/entrepreneur', protect, restrictTo('Entrepreneur'), getEntrepreneurMatches)
router.get('/investor', protect, restrictTo('Investor'), getInvestorMatches)

export default router
