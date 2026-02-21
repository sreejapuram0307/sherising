import mongoose from 'mongoose'

const blockedChatSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: true
  },
  blockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blockedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Ensure only one block record per idea
blockedChatSchema.index({ ideaId: 1 }, { unique: true })

export default mongoose.model('BlockedChat', blockedChatSchema)
