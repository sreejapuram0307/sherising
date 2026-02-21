import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const EntrepreneurSidebar = ({ isOpen }) => {
  const { t } = useTranslation()
  
  const menuItems = [
    { path: '/entrepreneur-dashboard', label: t('nav.dashboard'), icon: '📊', end: true },
    { path: '/entrepreneur-dashboard/my-ideas', label: t('nav.myIdeas'), icon: '💡' },
    { path: '/entrepreneur-dashboard/community', label: t('nav.community'), icon: '👥' },
    { path: '/entrepreneur-dashboard/chat', label: t('nav.chat'), icon: '💬' },
    { path: '/entrepreneur-dashboard/business-chat', label: t('nav.businessAI'), icon: '🤖' },
    { path: '/entrepreneur-dashboard/learning-hub', label: t('nav.learningHub'), icon: '📚' },
    { path: '/entrepreneur-dashboard/government-schemes', label: t('nav.governmentSchemes'), icon: '🏛️' },
    { path: '/entrepreneur-dashboard/ngo-connect', label: t('nav.ngoConnect'), icon: '🤝' },
    { path: '/entrepreneur-dashboard/smart-matches', label: t('nav.smartMatches'), icon: '🎯' },
    { path: '/entrepreneur-dashboard/leaderboard', label: t('nav.leaderboard'), icon: '🏆' },
  ]

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-purple-100 shadow-sm transition-all duration-300 z-40 ${
        isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      }`}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-purple-50'
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default EntrepreneurSidebar
