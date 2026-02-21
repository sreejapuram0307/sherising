import mongoose from 'mongoose'

const investmentSchema = new mongoose.Schema({
  investorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Funding Ongoing', 'Completed'],
    default: 'Funding Ongoing'
  }
}, {
  timestamps: true
})

export default mongoose.model('Investment', investmentSchema)
