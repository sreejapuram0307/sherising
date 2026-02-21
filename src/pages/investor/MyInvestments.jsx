import { useState, useEffect } from 'react'
import { investorAPI } from '../../utils/api'
import IdeaChatModal from '../../components/IdeaChatModal'

const MyInvestments = () => {
  const [investments, setInvestments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedIdea, setSelectedIdea] = useState(null)

  useEffect(() => {
    loadInvestments()
  }, [])

  const loadInvestments = async () => {
    try {
      const result = await investorAPI.getMyInvestments()
      if (result.success) {
        setInvestments(result.data)
      }
    } catch (error) {
      console.error('Error loading investments:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (investments.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Investments</h2>
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-purple-100">
          <div className="text-6xl mb-4">💰</div>
          <p className="text-gray-600 text-lg">No investments yet</p>
          <p className="text-gray-500 text-sm mt-2">Start investing in entrepreneur ideas from the dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Investments</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {investments.map((investment) => (
          <div key={investment._id} className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{investment.ideaTitle}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                investment.status === 'Funding Ongoing'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {investment.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount Invested:</span>
                <span className="font-bold text-purple-600">₹{investment.amount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Funding Goal:</span>
                <span className="font-semibold text-gray-800">₹{investment.fundingGoal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount Raised:</span>
                <span className="font-semibold text-green-600">₹{investment.amountRaised.toLocaleString()}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                  style={{ width: `${Math.min((investment.amountRaised / investment.fundingGoal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-1">Entrepreneur Email</p>
              <p className="font-semibold text-purple-600">{investment.entrepreneurEmail}</p>
              <p className="text-xs text-gray-500 mt-2">Invested on {new Date(investment.date).toLocaleDateString()}</p>
              
              <button
                onClick={() => {
                  setSelectedIdea({ _id: investment.ideaId._id, title: investment.ideaTitle })
                  setShowChatModal(true)
                }}
                className="mt-3 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition-all"
              >
                💬 Open Chat
              </button>
            </div>
          </div>
        ))}
      </div>

      {showChatModal && selectedIdea && (
        <IdeaChatModal
          idea={selectedIdea}
          onClose={() => setShowChatModal(false)}
        />
      )}
    </div>
  )
}

export default MyInvestments
