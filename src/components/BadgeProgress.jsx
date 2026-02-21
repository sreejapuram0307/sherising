import { useState, useEffect } from 'react'
import { gamificationAPI } from '../utils/api'
import BadgeDisplay from './BadgeDisplay'

const BadgeProgress = () => {
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = async () => {
    try {
      const result = await gamificationAPI.getBadgeProgress()
      if (result.success) {
        setProgress(result.data)
      }
    } catch (error) {
      console.error('Error loading badge progress:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !progress) return null

  const role = localStorage.getItem('role')

  return (
    <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Your Badge</h3>
          <p className="text-sm text-gray-600">⭐ {progress.stats.points} points</p>
        </div>
        <BadgeDisplay 
          badgeTitle={progress.currentBadge.title} 
          badgeLevel={progress.currentBadge.level}
          size="large"
        />
      </div>

      {progress.nextBadge && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Next: {progress.nextBadge.nextBadge}</span>
            {role === 'Entrepreneur' && (
              <span className="font-semibold text-purple-600">
                {progress.nextBadge.remaining} more likes needed
              </span>
            )}
            {role === 'Investor' && (
              <span className="font-semibold text-purple-600">
                {progress.nextBadge.remainingInvestments > 0 && 
                  `${progress.nextBadge.remainingInvestments} more investments`}
                {progress.nextBadge.remainingFunding > 0 && 
                  ` or ₹${progress.nextBadge.remainingFunding.toLocaleString()} more funding`}
              </span>
            )}
          </div>
          
          {role === 'Entrepreneur' && (
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all"
                style={{ 
                  width: `${Math.min((progress.nextBadge.current / progress.nextBadge.required) * 100, 100)}%` 
                }}
              ></div>
            </div>
          )}
          
          {role === 'Investor' && progress.nextBadge.requiredInvestments > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all"
                style={{ 
                  width: `${Math.min((progress.nextBadge.currentInvestments / progress.nextBadge.requiredInvestments) * 100, 100)}%` 
                }}
              ></div>
            </div>
          )}
        </div>
      )}

      {!progress.nextBadge && (
        <div className="mt-4 text-center">
          <p className="text-sm text-green-600 font-semibold">🎉 You've reached the highest badge!</p>
        </div>
      )}
    </div>
  )
}

export default BadgeProgress
