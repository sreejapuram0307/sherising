import Investment from '../models/Investment.js'
import Idea from '../models/Idea.js'

export const getDashboardStats = async (req, res) => {
  try {
    const investments = await Investment.find({ investorId: req.user._id })

    const totalIdeasInvested = new Set(investments.map(inv => inv.ideaId.toString())).size
    const totalAmountInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
    const activeInvestments = investments.filter(inv => inv.status === 'Funding Ongoing').length

    res.status(200).json({
      success: true,
      data: {
        totalIdeasInvested,
        totalAmountInvested,
        activeInvestments
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getMyInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ investorId: req.user._id })
      .populate('ideaId')
      .sort({ createdAt: -1 })

    const investmentDetails = investments.map(inv => ({
      _id: inv._id,
      ideaTitle: inv.ideaId.title,
      amount: inv.amount,
      entrepreneurEmail: inv.ideaId.entrepreneurEmail,
      fundingGoal: inv.ideaId.fundingGoal,
      amountRaised: inv.ideaId.amountRaised,
      status: inv.status,
      date: inv.createdAt
    }))

    res.status(200).json({
      success: true,
      count: investmentDetails.length,
      data: investmentDetails
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
