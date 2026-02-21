import { useState, useEffect } from 'react'
import { ideaAPI } from '../../utils/api'
import IdeaChatModal from '../../components/IdeaChatModal'
import BadgeProgress from '../../components/BadgeProgress'

const MyIdeas = () => {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedIdea, setSelectedIdea] = useState(null)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    loadIdeas()
  }, [])

  const loadIdeas = async () => {
    try {
      const result = await ideaAPI.getAll()
      if (result.success) {
        const myIdeas = result.data.filter(idea => idea.entrepreneurId === userId)
        setIdeas(myIdeas)
      }
    } catch (error) {
      console.error('Error loading ideas:', error)
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

  if (ideas.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Ideas</h2>
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-12 text-center">
          <div className="text-6xl mb-4">💡</div>
          <p className="text-gray-600 text-lg">No ideas posted yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Ideas</h2>
      
      <BadgeProgress />
      
      <div className="space-y-4">
        {ideas.map(idea => (
          <div key={idea._id} className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{idea.title}</h3>
                <p className="text-xs text-gray-500">{new Date(idea.createdAt).toLocaleDateString()}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-200 text-purple-800">
                {idea.category}
              </span>
            </div>
            
            <p className="text-gray-700 mb-3">{idea.description}</p>
            
            <div className="space-y-2 mb-3">
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
                  className="bg-gradient-to-r from-orange-400 to-pink-400 h-2 rounded-full"
                  style={{ width: `${Math.min((idea.amountRaised / idea.fundingGoal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex gap-4 text-sm text-gray-600 mb-3">
              <span>❤️ {idea.likes} likes</span>
            </div>

            <button
              onClick={() => {
                setSelectedIdea(idea)
                setShowChatModal(true)
              }}
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition-all"
            >
              💬 View Investor Chats
            </button>
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

export default MyIdeas
