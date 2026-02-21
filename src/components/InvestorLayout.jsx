import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import InvestorNavbar from './InvestorNavbar'
import InvestorSidebar from './InvestorSidebar'

const InvestorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <InvestorNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <InvestorSidebar isOpen={sidebarOpen} />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} mt-16 p-6`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default InvestorLayout
