import Chat from '../models/Chat.js'
import User from '../models/User.js'

export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params

    const messages = await Chat.find({
      $or: [
        { senderId: req.user._id, receiverId: userId },
        { senderId: userId, receiverId: req.user._id }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('senderId', 'name')
    .populate('receiverId', 'name')

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

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body

    if (!receiverId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide receiverId and message'
      })
    }

    const receiver = await User.findById(receiverId)
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: 'Receiver not found'
      })
    }

    const chat = await Chat.create({
      senderId: req.user._id,
      receiverId,
      message
    })

    const populatedChat = await Chat.findById(chat._id)
      .populate('senderId', 'name')
      .populate('receiverId', 'name')

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

export const getContacts = async (req, res) => {
  try {
    const contacts = await User.find({
      _id: { $ne: req.user._id },
      role: { $in: ['Entrepreneur', 'Investor', 'Mentor'] }
    }).select('name email role')

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
