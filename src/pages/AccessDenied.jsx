import { useNavigate } from 'react-router-dom'

const AccessDenied = ({ requiredRole }) => {
  const navigate = useNavigate()
  const currentRole = localStorage.getItem('role')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-purple-100">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Access Restricted</h2>
        <p className="text-gray-600 mb-6">
          Access restricted to <span className="font-semibold text-purple-600">{requiredRole}s</span> only.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You are currently logged in as: <span className="font-semibold">{currentRole}</span>
        </p>
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl py-3 font-semibold hover:shadow-lg hover:scale-105 transition-all"
        >
          Go to Login
        </button>
      </div>
    </div>
  )
}

export default AccessDenied
