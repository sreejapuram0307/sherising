import express from 'express'
import { getMessages, sendMessage, getContacts } from '../controllers/chatController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/contacts', protect, getContacts)
router.get('/:userId', protect, getMessages)
router.post('/send', protect, sendMessage)

export default router
