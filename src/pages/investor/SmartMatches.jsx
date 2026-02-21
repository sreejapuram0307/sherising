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
      const result = await matchAPI.getInvestorMatches()
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
    match.ideaTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.entrepreneur.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleConnect = (match) => {
    // Navigate to chat with the entrepreneur's ID
    navigate('/investor-dashboard/chat', { state: { contactId: match.entrepreneur._id, contactName: match.entrepreneur.name, contactRole: 'Entrepreneur' } })
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
        <p className="text-gray-600">Business ideas in your location: <span className="font-semibold text-purple-600">{location}</span></p>
      </div>

      {matches.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by idea or entrepreneur name..."
            className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none px-4 py-3 bg-white"
          />
        </div>
      )}

      {filteredMatches.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-purple-100">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-lg">
            {searchTerm ? 'No ideas found matching your search' : `No business ideas found in ${location}`}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Check back later for new opportunities
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMatches.map((match) => (
            <div
              key={match.ideaId}
              className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800">{match.ideaTitle}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                  {match.category}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{match.ideaDescription}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Funding Goal:</span>
                  <span className="font-semibold text-gray-800">₹{match.fundingGoal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount Raised:</span>
                  <span className="font-semibold text-green-600">₹{match.amountRaised.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                    style={{ width: `${Math.min((match.amountRaised / match.fundingGoal) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <p className="text-sm text-gray-600">Entrepreneur</p>
                <p className="font-semibold text-gray-800">{match.entrepreneur.name}</p>
                <p className="text-sm text-purple-600">📍 {match.location}</p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleConnect(match)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  💬 Connect
                </button>
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SmartMatches
