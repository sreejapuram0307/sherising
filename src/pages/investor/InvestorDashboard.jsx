import { useState, useEffect } from 'react'
import InvestModal from '../../components/InvestModal'
import { ideaAPI, investorAPI } from '../../utils/api'

const InvestorDashboard = () => {
  const [ideas, setIdeas] = useState([])
  const [stats, setStats] = useState({
    totalIdeasInvested: 0,
    totalAmountInvested: 0,
    activeInvestments: 0
  })
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [ideasResult, statsResult] = await Promise.all([
        ideaAPI.getAll(),
        investorAPI.getDashboard()
      ])

      if (ideasResult.success) {
        setIdeas(ideasResult.data)
      }

      if (statsResult.success) {
        setStats(statsResult.data)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInvest = (idea) => {
    setSelectedIdea(idea)
    setShowModal(true)
  }

  const confirmInvestment = async (amount) => {
    try {
      const result = await ideaAPI.invest(selectedIdea._id, parseFloat(amount))

      if (result.success) {
        setShowModal(false)
        setSelectedIdea(null)
        loadData() // Reload data to update stats and ideas
      } else {
        alert(result.message || 'Investment failed')
      }
    } catch (error) {
      console.error('Investment error:', error)
      alert('Server error. Please try again.')
    }
  }

  const handleLike = async (ideaId) => {
    try {
      const result = await ideaAPI.like(ideaId)
      if (result.success) {
        setIdeas(ideas.map(idea =>
          idea._id === ideaId ? result.data : idea
        ))
      }
    } catch (error) {
      console.error('Like error:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Ideas Invested</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalIdeasInvested}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Amount Invested</p>
              <p className="text-3xl font-bold text-green-600 mt-2">₹{stats.totalAmountInvested.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Investments</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.activeInvestments}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">Entrepreneur Ideas</h3>
      
      {ideas.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-600">No ideas available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map(idea => (
            <div key={idea._id} className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl font-bold text-gray-800">{idea.title}</h4>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                  {idea.category}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{idea.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Funding Goal:</span>
                  <span className="font-semibold text-gray-800">₹{idea.fundingGoal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount Raised:</span>
                  <span className="font-semibold text-green-600">₹{idea.amountRaised.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                    style={{ width: `${Math.min((idea.amountRaised / idea.fundingGoal) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <p className="text-sm text-gray-600">Entrepreneur</p>
                <p className="font-semibold text-gray-800">{idea.entrepreneurName}</p>
                <p className="text-sm text-purple-600">{idea.entrepreneurEmail}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleLike(idea._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-pink-50 text-gray-700 transition-all"
                >
                  ❤️ {idea.likes}
                </button>
                <button
                  onClick={() => handleInvest(idea)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  💰 Invest
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedIdea && (
        <InvestModal
          idea={selectedIdea}
          onClose={() => setShowModal(false)}
          onConfirm={confirmInvestment}
        />
      )}
    </div>
  )
}

export default InvestorDashboard
