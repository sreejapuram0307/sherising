import mongoose from 'mongoose'

const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fundingGoal: {
    type: Number,
    required: true
  },
  amountRaised: {
    type: Number,
    default: 0
  },
  entrepreneurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entrepreneurName: {
    type: String,
    required: true
  },
  entrepreneurEmail: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.model('Idea', ideaSchema)
