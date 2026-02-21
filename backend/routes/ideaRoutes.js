import express from 'express'
import { getAllIdeas, createIdea, investInIdea, likeIdea } from '../controllers/ideaController.js'
import { protect, restrictTo } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getAllIdeas)
router.post('/', protect, restrictTo('Entrepreneur'), createIdea)
router.post('/:id/invest', protect, restrictTo('Investor'), investInIdea)
router.post('/:id/like', protect, likeIdea)

export default router
