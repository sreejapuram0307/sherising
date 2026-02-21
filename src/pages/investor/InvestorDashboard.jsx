import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import InvestModal from '../../components/InvestModal'
import IdeaChatModal from '../../components/IdeaChatModal'
import BadgeDisplay from '../../components/BadgeDisplay'
import { ideaAPI, investorAPI, profileAPI } from '../../utils/api'

const InvestorDashboard = () => {
  const { t } = useTranslation()
  const [ideas, setIdeas] = useState([])
  const [stats, setStats] = useState({
    totalIdeasInvested: 0,
    totalAmountInvested: 0,
    activeInvestments: 0
  })
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [chatIdea, setChatIdea] = useState(null)
  const [loading, setLoading] = useState(true)
  const [likedIdeas, setLikedIdeas] = useState([])
  const [entrepreneurBadges, setEntrepreneurBadges] = useState({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [ideasResult, statsResult, profileResult] = await Promise.all([
        ideaAPI.getAll(),
        investorAPI.getDashboard(),
        profileAPI.getProfile()
      ])

      if (ideasResult.success) {
        setIdeas(ideasResult.data)
        
        // Fetch entrepreneur badges for all ideas
        const badges = {}
        for (const idea of ideasResult.data) {
          try {
            const entrepreneurProfile = await profileAPI.getProfileById(idea.entrepreneurId)
            if (entrepreneurProfile.success) {
              badges[idea.entrepreneurId] = {
                badgeTitle: entrepreneurProfile.data.badgeTitle,
                badgeLevel: entrepreneurProfile.data.badgeLevel
              }
            }
          } catch (error) {
            console.error('Error fetching entrepreneur badge:', error)
          }
        }
        setEntrepreneurBadges(badges)
      }

      if (statsResult.success) {
        setStats(statsResult.data)
      }

      if (profileResult.success) {
        // Convert likedIdeas to strings for proper comparison
        setLikedIdeas((profileResult.data.likedIdeas || []).map(id => id.toString()))
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

  const handleOpenChat = (idea) => {
    setChatIdea(idea)
    setShowChatModal(true)
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
        setLikedIdeas([...likedIdeas, ideaId])
      } else {
        alert(result.message || 'Failed to like idea')
      }
    } catch (error) {
      console.error('Like error:', error)
      alert('You may have already liked this idea')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">{t('common.loading')}</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('nav.dashboard')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{t('investorDashboard.totalIdeasInvested')}</p>
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
              <p className="text-gray-600 text-sm font-medium">{t('investorDashboard.totalAmountInvested')}</p>
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
              <p className="text-gray-600 text-sm font-medium">{t('investorDashboard.activeInvestments')}</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.activeInvestments}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('investorDashboard.entrepreneurIdeas')}</h3>
      
      {ideas.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-600">{t('investorDashboard.noIdeasAvailable')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map(idea => {
            const isLiked = likedIdeas.includes(idea._id.toString())
            const entrepreneurBadge = entrepreneurBadges[idea.entrepreneurId]
            
            return (
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
                  <span className="text-gray-600">{t('investorDashboard.fundingGoal')}</span>
                  <span className="font-semibold text-gray-800">₹{idea.fundingGoal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('investorDashboard.amountRaised')}</span>
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
                <p className="text-sm text-gray-600">{t('investorDashboard.entrepreneur')}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{idea.entrepreneurName}</p>
                    <p className="text-sm text-purple-600">{idea.entrepreneurEmail}</p>
                  </div>
                  {entrepreneurBadge && (
                    <BadgeDisplay 
                      badgeTitle={entrepreneurBadge.badgeTitle} 
                      badgeLevel={entrepreneurBadge.badgeLevel}
                    />
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleLike(idea._id)}
                  disabled={isLiked}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isLiked 
                      ? 'bg-pink-100 text-pink-700 cursor-not-allowed' 
                      : 'bg-gray-100 hover:bg-pink-50 text-gray-700'
                  }`}
                >
                  ❤️ {idea.likes}
                </button>
                <button
                  onClick={() => handleOpenChat(idea)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all"
                >
                  💬 {t('chat.chat')}
                </button>
                <button
                  onClick={() => handleInvest(idea)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  💰 {t('ideas.invest')}
                </button>
              </div>
            </div>
          )})}
        </div>
      )}

      {showModal && selectedIdea && (
        <InvestModal
          idea={selectedIdea}
          onClose={() => setShowModal(false)}
          onConfirm={confirmInvestment}
        />
      )}

      {showChatModal && chatIdea && (
        <IdeaChatModal
          idea={chatIdea}
          onClose={() => setShowChatModal(false)}
        />
      )}
    </div>
  )
}

export default InvestorDashboard
