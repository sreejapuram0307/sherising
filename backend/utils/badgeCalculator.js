// Entrepreneur Badge Thresholds
const ENTREPRENEUR_BADGES = [
  { title: 'Starter Innovator', level: 'Bronze', minLikes: 3 },
  { title: 'Rising Creator', level: 'Silver', minLikes: 7 },
  { title: 'Community Star', level: 'Gold', minLikes: 15 },
  { title: 'Top Visionary', level: 'Platinum', minLikes: 25 }
]

// Investor Badge Thresholds
const INVESTOR_BADGES = [
  { title: 'Active Supporter', level: 'Bronze', minInvestments: 2, minFunding: 0 },
  { title: 'Growth Backer', level: 'Silver', minInvestments: 5, minFunding: 0 },
  { title: 'Angel Contributor', level: 'Gold', minInvestments: 0, minFunding: 10000 },
  { title: 'Impact Champion', level: 'Platinum', minInvestments: 0, minFunding: 25000 }
]

export const calculateEntrepreneurBadge = (totalLikes) => {
  let badge = { title: 'Newcomer', level: 'Bronze' }
  
  for (const b of ENTREPRENEUR_BADGES) {
    if (totalLikes >= b.minLikes) {
      badge = { title: b.title, level: b.level }
    }
  }
  
  return badge
}

export const calculateInvestorBadge = (totalInvestments, totalFunding) => {
  let badge = { title: 'Newcomer', level: 'Bronze' }
  
  for (const b of INVESTOR_BADGES) {
    const meetsInvestments = b.minInvestments === 0 || totalInvestments >= b.minInvestments
    const meetsFunding = b.minFunding === 0 || totalFunding >= b.minFunding
    
    if (meetsInvestments && meetsFunding) {
      badge = { title: b.title, level: b.level }
    }
  }
  
  return badge
}

export const getNextBadge = (role, currentStats) => {
  if (role === 'Entrepreneur') {
    const currentLikes = currentStats.totalLikesReceived || 0
    for (const badge of ENTREPRENEUR_BADGES) {
      if (currentLikes < badge.minLikes) {
        return {
          nextBadge: badge.title,
          required: badge.minLikes,
          current: currentLikes,
          remaining: badge.minLikes - currentLikes
        }
      }
    }
    return null // Already at max
  } else if (role === 'Investor') {
    const currentInvestments = currentStats.totalInvestmentsMade || 0
    const currentFunding = currentStats.totalFundingAmount || 0
    
    for (const badge of INVESTOR_BADGES) {
      const needsMoreInvestments = badge.minInvestments > 0 && currentInvestments < badge.minInvestments
      const needsMoreFunding = badge.minFunding > 0 && currentFunding < badge.minFunding
      
      if (needsMoreInvestments || needsMoreFunding) {
        return {
          nextBadge: badge.title,
          requiredInvestments: badge.minInvestments,
          requiredFunding: badge.minFunding,
          currentInvestments,
          currentFunding,
          remainingInvestments: Math.max(0, badge.minInvestments - currentInvestments),
          remainingFunding: Math.max(0, badge.minFunding - currentFunding)
        }
      }
    }
    return null // Already at max
  }
  return null
}

export const calculatePoints = (role, action, amount = 0) => {
  if (role === 'Entrepreneur') {
    if (action === 'like') return 5
    if (action === 'investment') return 20
  } else if (role === 'Investor') {
    if (action === 'investment') return 10 + Math.floor(amount / 1000)
  }
  return 0
}
