import { NavLink } from 'react-router-dom'

const InvestorSidebar = ({ isOpen }) => {
  const menuItems = [
    { path: '/investor-dashboard', label: 'Dashboard', icon: '📊', end: true },
    { path: '/investor-dashboard/my-investments', label: 'My Investments', icon: '💰' },
    { path: '/investor-dashboard/chat', label: 'Chat', icon: '💬' },
    { path: '/investor-dashboard/smart-matches', label: 'Smart Matches', icon: '🎯' },
  ]

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-purple-100 shadow-sm transition-all duration-300 ${
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
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
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

export default InvestorSidebar
