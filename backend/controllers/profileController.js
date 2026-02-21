import User from '../models/User.js'
import bcrypt from 'bcryptjs'

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash')

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-passwordHash')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = await User.findById(req.user._id)

    if (name) user.name = name
    if (email) user.email = email
    
    if (password) {
      const salt = await bcrypt.genSalt(10)
      user.passwordHash = await bcrypt.hash(password, salt)
    }

    await user.save()

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
