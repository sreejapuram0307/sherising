import IdeaChat from '../models/IdeaChat.js'
import Idea from '../models/Idea.js'
import Investment from '../models/Investment.js'

// Check if user is participant (owner or investor)
const isParticipant = async (userId, ideaId) => {
  const idea = await Idea.findById(ideaId)
  if (!idea) return false

  // Check if user is the idea owner
  if (idea.entrepreneurId.toString() === userId.toString()) {
    return true
  }

  // Check if user has invested in this idea
  const investment = await Investment.findOne({
    ideaId,
    investorId: userId
  })

  return !!investment
}

export const getIdeaMessages = async (req, res) => {
  try {
    const { ideaId } = req.params

    // Check if user is participant
    const canAccess = await isParticipant(req.user._id, ideaId)
    if (!canAccess) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You must be the idea owner or an investor to view this chat.'
      })
    }

    const messages = await IdeaChat.find({ ideaId })
      .sort({ createdAt: 1 })
      .populate('senderId', 'name role')

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const sendIdeaMessage = async (req, res) => {
  try {
    const { ideaId, message } = req.body

    if (!ideaId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide ideaId and message'
      })
    }

    // Check if user is participant
    const canAccess = await isParticipant(req.user._id, ideaId)
    if (!canAccess) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You must be the idea owner or an investor to send messages.'
      })
    }

    const chat = await IdeaChat.create({
      ideaId,
      senderId: req.user._id,
      senderName: req.user.name,
      senderRole: req.user.role,
      message
    })

    const populatedChat = await IdeaChat.findById(chat._id)
      .populate('senderId', 'name role')

    res.status(201).json({
      success: true,
      data: populatedChat
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getIdeaParticipants = async (req, res) => {
  try {
    const { ideaId } = req.params

    // Check if user is participant
    const canAccess = await isParticipant(req.user._id, ideaId)
    if (!canAccess) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.'
      })
    }

    const idea = await Idea.findById(ideaId).populate('entrepreneurId', 'name email role')
    const investments = await Investment.find({ ideaId }).populate('investorId', 'name email role')

    const participants = [
      {
        userId: idea.entrepreneurId._id,
        name: idea.entrepreneurId.name,
        email: idea.entrepreneurId.email,
        role: 'Entrepreneur (Owner)'
      },
      ...investments.map(inv => ({
        userId: inv.investorId._id,
        name: inv.investorId.name,
        email: inv.investorId.email,
        role: 'Investor',
        investedAmount: inv.amount
      }))
    ]

    res.status(200).json({
      success: true,
      data: participants
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const markMessagesAsRead = async (req, res) => {
  try {
    const { ideaId } = req.params

    await IdeaChat.updateMany(
      { ideaId, senderId: { $ne: req.user._id }, isRead: false },
      { isRead: true }
    )

    res.status(200).json({
      success: true,
      message: 'Messages marked as read'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
