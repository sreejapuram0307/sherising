import Idea from '../models/Idea.js'
import Investment from '../models/Investment.js'
import User from '../models/User.js'
import { calculateEntrepreneurBadge, calculatePoints } from '../utils/badgeCalculator.js'

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

    // Update investor stats and badge
    const investor = await User.findById(req.user._id)
    investor.totalInvestmentsMade += 1
    investor.totalFundingAmount += parseFloat(amount)
    
    // Calculate points for investor
    const points = calculatePoints('Investor', 'investment', parseFloat(amount))
    investor.points += points

    // Update badge
    const { calculateInvestorBadge } = await import('../utils/badgeCalculator.js')
    const badge = calculateInvestorBadge(investor.totalInvestmentsMade, investor.totalFundingAmount)
    investor.badgeTitle = badge.title
    investor.badgeLevel = badge.level
    
    await investor.save()

    // Update entrepreneur stats
    const entrepreneur = await User.findById(idea.entrepreneurId)
    const entrepreneurPoints = calculatePoints('Entrepreneur', 'investment')
    entrepreneur.points += entrepreneurPoints
    await entrepreneur.save()

    res.status(200).json({
      success: true,
      message: 'Investment successful',
      data: {
        idea,
        investment
      },
      investorBadge: {
        title: investor.badgeTitle,
        level: investor.badgeLevel
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

    // Check if user already liked this idea
    const user = await User.findById(req.user._id)
    if (user.likedIdeas.includes(idea._id)) {
      return res.status(400).json({
        success: false,
        message: 'You have already liked this idea'
      })
    }

    // Increment likes
    idea.likes += 1
    await idea.save()

    // Add to user's liked ideas
    user.likedIdeas.push(idea._id)
    await user.save()

    // Update entrepreneur's total likes and badge
    const entrepreneur = await User.findById(idea.entrepreneurId)
    entrepreneur.totalLikesReceived += 1
    
    // Calculate points for entrepreneur
    const points = calculatePoints('Entrepreneur', 'like')
    entrepreneur.points += points

    // Update badge
    const badge = calculateEntrepreneurBadge(entrepreneur.totalLikesReceived)
    entrepreneur.badgeTitle = badge.title
    entrepreneur.badgeLevel = badge.level
    
    await entrepreneur.save()

    res.status(200).json({
      success: true,
      data: idea,
      entrepreneurBadge: {
        title: entrepreneur.badgeTitle,
        level: entrepreneur.badgeLevel
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
