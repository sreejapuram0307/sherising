import { useState, useEffect } from 'react'
import { gamificationAPI } from '../utils/api'
import BadgeDisplay from '../components/BadgeDisplay'
import GradientBackground from '../components/GradientBackground'

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState({ entrepreneurs: [], investors: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      const result = await gamificationAPI.getLeaderboard()
      if (result.success) {
        setLeaderboard(result.data)
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <GradientBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl text-gray-600">Loading leaderboard...</div>
        </div>
      </GradientBackground>
    )
  }

  return (
    <GradientBackground>
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">🏆 Leaderboard</h1>
          <p className="text-gray-600 text-center mb-8">Top performers in the SheRise community</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Entrepreneurs */}
            <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Top Entrepreneurs</h2>
              <p className="text-sm text-gray-600 mb-4">Ranked by total likes received</p>
              
              <div className="space-y-3">
                {leaderboard.entrepreneurs.map((entrepreneur, idx) => (
                  <div
                    key={entrepreneur._id}
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      idx === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-50' :
                      idx === 1 ? 'bg-gradient-to-r from-gray-200 to-gray-100' :
                      idx === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-50' :
                      'bg-white/50'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-700 w-8">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{entrepreneur.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <BadgeDisplay badgeTitle={entrepreneur.badgeTitle} badgeLevel={entrepreneur.badgeLevel} />
                        <span className="text-xs text-gray-600">❤️ {entrepreneur.totalLikesReceived} likes</span>
                        <span className="text-xs text-gray-600">⭐ {entrepreneur.points} pts</span>
                      </div>
                    </div>
                  </div>
                ))}
                {leaderboard.entrepreneurs.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No entrepreneurs yet</p>
                )}
              </div>
            </div>

            {/* Top Investors */}
            <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">💰 Top Investors</h2>
              <p className="text-sm text-gray-600 mb-4">Ranked by investment count</p>
              
              <div className="space-y-3">
                {leaderboard.investors.map((investor, idx) => (
                  <div
                    key={investor._id}
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      idx === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-50' :
                      idx === 1 ? 'bg-gradient-to-r from-gray-200 to-gray-100' :
                      idx === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-50' :
                      'bg-white/50'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-700 w-8">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{investor.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <BadgeDisplay badgeTitle={investor.badgeTitle} badgeLevel={investor.badgeLevel} />
                        <span className="text-xs text-gray-600">💼 {investor.totalInvestmentsMade} investments</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">₹{investor.totalFundingAmount.toLocaleString()} funded</p>
                    </div>
                  </div>
                ))}
                {leaderboard.investors.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No investors yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  )
}

export default Leaderboard
