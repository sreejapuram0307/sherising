import { useNavigate } from 'react-router-dom'

const MentorDashboard = () => {
  const navigate = useNavigate()
  const name = localStorage.getItem('name') || 'Mentor'

  const handleSignOut = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mentor Dashboard
            </h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all"
            >
              Sign Out
            </button>
          </div>
          
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎓</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome, {name}!</h2>
            <p className="text-gray-600">Your mentor dashboard is ready.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorDashboard
