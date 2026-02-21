import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import EntrepreneurNavbar from '../components/EntrepreneurNavbar'
import EntrepreneurSidebar from '../components/EntrepreneurSidebar'

const EntrepreneurDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-purple-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/2"></div>
      
      <EntrepreneurNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <EntrepreneurSidebar isOpen={sidebarOpen} />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} mt-16 p-6 relative z-10`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default EntrepreneurDashboard
