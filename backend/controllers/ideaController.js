import Idea from '../models/Idea.js'
import Investment from '../models/Investment.js'

export const getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 })
    
    res.status(200).json({
      success: true,
      count: ideas.length,
      data: ideas
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const createIdea = async (req, res) => {
  try {
    const { title, category, description, fundingGoal, location } = req.body

    if (!title || !category || !description || !fundingGoal || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all fields including location'
      })
    }

    const idea = await Idea.create({
      title,
      category,
      description,
      fundingGoal,
      location,
      entrepreneurId: req.user._id,
      entrepreneurName: req.user.name,
      entrepreneurEmail: req.user.email
    })

    res.status(201).json({
      success: true,
      data: idea
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const investInIdea = async (req, res) => {
  try {
    const { amount } = req.body
    const ideaId = req.params.id

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid amount'
      })
    }

    const idea = await Idea.findById(ideaId)
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      })
    }

    idea.amountRaised += parseFloat(amount)
    
    if (idea.amountRaised >= idea.fundingGoal) {
      idea.amountRaised = idea.fundingGoal
    }
    
    await idea.save()

    const investment = await Investment.create({
      investorId: req.user._id,
      ideaId: idea._id,
      amount: parseFloat(amount),
      status: idea.amountRaised >= idea.fundingGoal ? 'Completed' : 'Funding Ongoing'
    })

    res.status(200).json({
      success: true,
      message: 'Investment successful',
      data: {
        idea,
        investment
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const likeIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      })
    }

    idea.likes += 1
    await idea.save()

    res.status(200).json({
      success: true,
      data: idea
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
