import { useNavigate } from 'react-router-dom'

const InvestorProfile = () => {
  const navigate = useNavigate()
  const name = localStorage.getItem('name') || 'Investor'
  const email = localStorage.getItem('email') || 'investor@example.com'
  const role = localStorage.getItem('role') || 'Investor'

  const handleSignOut = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>
      
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-4xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
            <p className="text-purple-600 font-medium">{role}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
            <div className="bg-purple-50 rounded-xl px-4 py-3 text-gray-800 font-medium">
              {name}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
            <div className="bg-purple-50 rounded-xl px-4 py-3 text-gray-800 font-medium">
              {email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Role</label>
            <div className="bg-purple-50 rounded-xl px-4 py-3 text-gray-800 font-medium">
              {role}
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-semibold hover:shadow-lg transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default InvestorProfile
