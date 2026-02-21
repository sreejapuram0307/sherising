import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { matchAPI } from '../../utils/api'

const SmartMatches = () => {
  const [matches, setMatches] = useState([])
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadMatches()
  }, [])

  const loadMatches = async () => {
    try {
      const result = await matchAPI.getEntrepreneurMatches()
      if (result.success) {
        setMatches(result.data)
        setLocation(result.location)
      }
    } catch (error) {
      console.error('Error loading matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMatches = matches.filter(match =>
    match.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleConnect = (investor) => {
    // Navigate to chat with the investor's ID
    navigate('/entrepreneur-dashboard/chat', { state: { contactId: investor._id, contactName: investor.name, contactRole: 'Investor' } })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading matches...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Smart Matches 🎯</h2>
        <p className="text-gray-600">Investors in your location: <span className="font-semibold text-purple-600">{location}</span></p>
      </div>

      {matches.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search investors by name..."
            className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none px-4 py-3 bg-white"
          />
        </div>
      )}

      {filteredMatches.length === 0 ? (
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-lg">
            {searchTerm ? 'No investors found matching your search' : `No investors found in ${location}`}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Try expanding your network or check back later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMatches.map((investor) => (
            <div
              key={investor._id}
              className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-6 hover:scale-105 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
                  {investor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{investor.name}</h3>
                  <p className="text-sm text-gray-600">{investor.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-purple-600">📍 {investor.location}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Investments:</span>
                  <span className="font-semibold text-gray-800">{investor.investmentCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Invested:</span>
                  <span className="font-semibold text-green-600">₹{investor.totalInvested.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => handleConnect(investor)}
                className="w-full mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:scale-105 transition-all"
              >
                💬 Connect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SmartMatches
