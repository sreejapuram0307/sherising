import User from '../models/User.js'
import Idea from '../models/Idea.js'
import Investment from '../models/Investment.js'

export const getEntrepreneurMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id)

    if (!currentUser || currentUser.role !== 'Entrepreneur') {
      return res.status(403).json({
        success: false,
        message: 'Access restricted to Entrepreneurs only'
      })
    }

    // Find investors in the same location
    const matchedInvestors = await User.find({
      role: 'Investor',
      location: currentUser.location,
      _id: { $ne: currentUser._id }
    }).select('name email location')

    // Get investment count for each investor
    const investorsWithStats = await Promise.all(
      matchedInvestors.map(async (investor) => {
        const investmentCount = await Investment.countDocuments({
          investorId: investor._id
        })

        const totalInvested = await Investment.aggregate([
          { $match: { investorId: investor._id } },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ])

        return {
          _id: investor._id,
          name: investor.name,
          email: investor.email,
          location: investor.location,
          investmentCount,
          totalInvested: totalInvested[0]?.total || 0
        }
      })
    )

    res.status(200).json({
      success: true,
      location: currentUser.location,
      count: investorsWithStats.length,
      data: investorsWithStats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getInvestorMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id)

    if (!currentUser || currentUser.role !== 'Investor') {
      return res.status(403).json({
        success: false,
        message: 'Access restricted to Investors only'
      })
    }

    // Find ideas in the same location
    const matchedIdeas = await Idea.find({
      location: currentUser.location
    }).populate('entrepreneurId', 'name email location')

    // Format the response
    const formattedMatches = matchedIdeas.map(idea => ({
      ideaId: idea._id,
      ideaTitle: idea.title,
      ideaDescription: idea.description,
      category: idea.category,
      fundingGoal: idea.fundingGoal,
      amountRaised: idea.amountRaised,
      location: idea.location,
      entrepreneur: {
        id: idea.entrepreneurId._id,
        name: idea.entrepreneurId.name,
        email: idea.entrepreneurId.email,
        location: idea.entrepreneurId.location
      },
      createdAt: idea.createdAt
    }))

    res.status(200).json({
      success: true,
      location: currentUser.location,
      count: formattedMatches.length,
      data: formattedMatches
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
