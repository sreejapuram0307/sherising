import express from 'express'
import { 
  getIdeaMessages, 
  sendIdeaMessage, 
  getIdeaParticipants,
  markMessagesAsRead 
} from '../controllers/ideaChatController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/:ideaId/messages', protect, getIdeaMessages)
router.post('/send', protect, sendIdeaMessage)
router.get('/:ideaId/participants', protect, getIdeaParticipants)
router.put('/:ideaId/read', protect, markMessagesAsRead)

export default router
