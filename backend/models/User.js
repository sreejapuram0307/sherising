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
  }
}, {
  timestamps: true
})

export default mongoose.model('User', userSchema)
