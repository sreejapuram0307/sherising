import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SplashPage from './pages/SplashPage'
import LoginPage from './pages/LoginPage'
import EntrepreneurDashboard from './pages/EntrepreneurDashboard'
import EntrepreneurDashboardHome from './pages/entrepreneur/Dashboard'
import EntrepreneurMyIdeas from './pages/entrepreneur/MyIdeas'
import EntrepreneurCommunity from './pages/entrepreneur/Community'
import EntrepreneurChat from './pages/entrepreneur/Chat'
import EntrepreneurLearningHub from './pages/entrepreneur/LearningHub'
import EntrepreneurGovernmentSchemes from './pages/entrepreneur/GovernmentSchemes'
import EntrepreneurNGOConnect from './pages/entrepreneur/NGOConnect'
import EntrepreneurProfile from './pages/entrepreneur/Profile'
import InvestorLayout from './components/InvestorLayout'
import InvestorDashboard from './pages/investor/InvestorDashboard'
import MyInvestments from './pages/investor/MyInvestments'
import InvestorChat from './pages/investor/InvestorChat'
import InvestorProfile from './pages/investor/InvestorProfile'
import MentorDashboard from './pages/MentorDashboard'
import AccessDenied from './pages/AccessDenied'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const role = localStorage.getItem('role')
    const email = localStorage.getItem('email')
    if (role && email) {
      setIsAuthenticated(true)
      setUserRole(role)
    }
  }, [])

  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }
    if (allowedRole && userRole !== allowedRole) {
      return <AccessDenied requiredRole={allowedRole} />
    }
    return children
  }

  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
      
      <Route path="/entrepreneur-dashboard" element={
        <ProtectedRoute allowedRole="Entrepreneur">
          <EntrepreneurDashboard />
        </ProtectedRoute>
      }>
        <Route index element={<EntrepreneurDashboardHome />} />
        <Route path="my-ideas" element={<EntrepreneurMyIdeas />} />
        <Route path="community" element={<EntrepreneurCommunity />} />
        <Route path="chat" element={<EntrepreneurChat />} />
        <Route path="learning-hub" element={<EntrepreneurLearningHub />} />
        <Route path="government-schemes" element={<EntrepreneurGovernmentSchemes />} />
        <Route path="ngo-connect" element={<EntrepreneurNGOConnect />} />
        <Route path="profile" element={<EntrepreneurProfile />} />
      </Route>
      
      <Route path="/investor-dashboard" element={
        <ProtectedRoute allowedRole="Investor">
          <InvestorLayout />
        </ProtectedRoute>
      }>
        <Route index element={<InvestorDashboard />} />
        <Route path="my-investments" element={<MyInvestments />} />
        <Route path="chat" element={<InvestorChat />} />
        <Route path="profile" element={<InvestorProfile />} />
      </Route>
      
      <Route path="/mentor-dashboard" element={
        <ProtectedRoute allowedRole="Mentor">
          <MentorDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
