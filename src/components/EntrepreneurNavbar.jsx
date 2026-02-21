import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BadgeDisplay from './BadgeDisplay'
import LanguageSelector from './LanguageSelector'
import { profileAPI } from '../utils/api'

const EntrepreneurNavbar = ({ toggleSidebar }) => {
  const { t } = useTranslation()
  const [showDropdown, setShowDropdown] = useState(false)
  const [badge, setBadge] = useState(null)
  const navigate = useNavigate()
  const name = localStorage.getItem('name') || 'Entrepreneur'

  useEffect(() => {
    loadBadge()
  }, [])

  const loadBadge = async () => {
    try {
      const result = await profileAPI.getProfile()
      if (result.success) {
        setBadge({
          badgeTitle: result.data.badgeTitle,
          badgeLevel: result.data.badgeLevel
        })
      }
    } catch (error) {
      console.error('Error loading badge:', error)
    }
  }

  const handleSignOut = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-purple-100 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-purple-50 transition-all"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('common.sherise')}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <LanguageSelector />
          
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-purple-50 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-800">{name}</p>
                  {badge && (
                    <BadgeDisplay 
                      badgeTitle={badge.badgeTitle} 
                      badgeLevel={badge.badgeLevel}
                      size="small"
                    />
                  )}
                </div>
                <p className="text-xs text-gray-600">Entrepreneur</p>
              </div>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-purple-100 py-2">
                <button
                  onClick={() => {
                    navigate('/entrepreneur-dashboard/profile')
                    setShowDropdown(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-purple-50 transition-all text-gray-700"
                >
                  {t('nav.profile')}
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 hover:bg-purple-50 transition-all text-red-600"
                >
                  {t('nav.signOut')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default EntrepreneurNavbar
