const BadgeDisplay = ({ badgeTitle, badgeLevel, size = 'small' }) => {
  const getBadgeColor = (level) => {
    switch (level) {
      case 'Bronze':
        return 'from-orange-600 to-orange-400'
      case 'Silver':
        return 'from-gray-400 to-gray-300'
      case 'Gold':
        return 'from-yellow-500 to-yellow-300'
      case 'Platinum':
        return 'from-purple-600 to-pink-500'
      default:
        return 'from-gray-400 to-gray-300'
    }
  }

  const getBadgeIcon = (level) => {
    switch (level) {
      case 'Bronze':
        return '🥉'
      case 'Silver':
        return '🥈'
      case 'Gold':
        return '🥇'
      case 'Platinum':
        return '💎'
      default:
        return '🏅'
    }
  }

  const sizeClasses = size === 'large' 
    ? 'px-4 py-2 text-sm' 
    : 'px-2 py-1 text-xs'

  return (
    <div className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${getBadgeColor(badgeLevel)} text-white font-semibold ${sizeClasses}`}>
      <span>{getBadgeIcon(badgeLevel)}</span>
      <span>{badgeTitle}</span>
    </div>
  )
}

export default BadgeDisplay
