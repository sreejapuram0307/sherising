import express from 'express'
import { askChatBot, getSuggestedQuestions, getAllQuestions } from '../controllers/chatBotController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/ask', protect, askChatBot)
router.get('/suggestions', protect, getSuggestedQuestions)
router.get('/questions', protect, getAllQuestions)

export default router
