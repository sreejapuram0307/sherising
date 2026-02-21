import User from '../models/User.js'
import { getNextBadge } from '../utils/badgeCalculator.js'

export const getLeaderboard = async (req, res) => {
  try {
    // Top 5 Entrepreneurs by likes
    const topEntrepreneurs = await User.find({ role: 'Entrepreneur' })
      .sort({ totalLikesReceived: -1 })
      .limit(5)
      .select('name totalLikesReceived badgeTitle badgeLevel points')

    // Top 5 Investors by investment count
    const topInvestors = await User.find({ role: 'Investor' })
      .sort({ totalInvestmentsMade: -1 })
      .limit(5)
      .select('name totalInvestmentsMade totalFundingAmount badgeTitle badgeLevel points')

    res.status(200).json({
      success: true,
      data: {
        entrepreneurs: topEntrepreneurs,
        investors: topInvestors
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getUserBadgeProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    const nextBadgeInfo = getNextBadge(user.role, {
      totalLikesReceived: user.totalLikesReceived,
      totalInvestmentsMade: user.totalInvestmentsMade,
      totalFundingAmount: user.totalFundingAmount
    })

    res.status(200).json({
      success: true,
      data: {
        currentBadge: {
          title: user.badgeTitle,
          level: user.badgeLevel
        },
        stats: {
          totalLikesReceived: user.totalLikesReceived,
          totalInvestmentsMade: user.totalInvestmentsMade,
          totalFundingAmount: user.totalFundingAmount,
          points: user.points
        },
        nextBadge: nextBadgeInfo
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
