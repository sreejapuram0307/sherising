import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['Entrepreneur', 'Investor', 'Mentor'],
    default: 'Entrepreneur'
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  badgeTitle: {
    type: String,
    default: 'Newcomer'
  },
  badgeLevel: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    default: 'Bronze'
  },
  totalLikesReceived: {
    type: Number,
    default: 0
  },
  totalInvestmentsMade: {
    type: Number,
    default: 0
  },
  totalFundingAmount: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
  likedIdeas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea'
  }]
}, {
  timestamps: true
})

export default mongoose.model('User', userSchema)
