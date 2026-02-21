import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({ setIsAuthenticated, setUserRole }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const roles = ['Entrepreneur', 'Investor', 'Mentor']

  const handleLogin = () => {
    if (!fullName || !email || !password || !role) {
      alert('Please fill all fields')
      return
    }

    if (!email.includes('@')) {
      alert('Please enter a valid email')
      return
    }

    localStorage.setItem('role', role)
    localStorage.setItem('email', email)
    localStorage.setItem('name', fullName)
    
    setIsAuthenticated(true)
    setUserRole(role)

    if (role === 'Entrepreneur') {
      navigate('/entrepreneur-dashboard')
    } else if (role === 'Investor') {
      navigate('/investor-dashboard')
    } else if (role === 'Mentor') {
      navigate('/mentor-dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              SheRise
            </h1>
            <p className="text-gray-600">From Voice to Business</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none px-4 py-3 text-gray-800 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none px-4 py-3 text-gray-800 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none px-4 py-3 text-gray-800 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none px-4 py-3 text-gray-800 transition-all"
              >
                <option value="">Select your role</option>
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={!fullName || !email || !password || !role}
            className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl py-3 font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
