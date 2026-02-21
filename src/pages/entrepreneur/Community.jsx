import { useState, useEffect } from 'react'
import BadgeDisplay from '../../components/BadgeDisplay'
import { ideaAPI, profileAPI } from '../../utils/api'

const Community = () => {
  const [ideas, setIdeas] = useState([])
  const [commentText, setCommentText] = useState({})
  const [likedIdeas, setLikedIdeas] = useState([])
  const [entrepreneurBadges, setEntrepreneurBadges] = useState({})
  const [loading, setLoading] = useState(true)
  const userName = localStorage.getItem('name') || 'User'

  useEffect(() => {
    loadIdeas()
  }, [])

  const loadIdeas = async () => {
    try {
      const [ideasResult, profileResult] = await Promise.all([
        ideaAPI.getAll(),
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

      if (profileResult.success) {
        // Convert likedIdeas to strings for proper comparison
        setLikedIdeas((profileResult.data.likedIdeas || []).map(id => id.toString()))
      }
    } catch (error) {
      console.error('Error loading ideas:', error)
    } finally {
      setLoading(false)
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

  const handleComment = (ideaId) => {
    const comment = commentText[ideaId]
    if (!comment?.trim()) return

    // Note: Comments are not yet implemented in backend
    // This is a placeholder for future implementation
    alert('Comment feature coming soon!')
    setCommentText({ ...commentText, [ideaId]: '' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Community</h2>
      
      {ideas.length === 0 ? (
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-12 text-center">
          <p className="text-gray-600">No ideas in the community yet</p>
        </div>
      ) : (
      <div className="space-y-4">
        {ideas.map(idea => {
          const isLiked = likedIdeas.includes(idea._id.toString())
          const entrepreneurBadge = entrepreneurBadges[idea.entrepreneurId]
          
          return (
          <div key={idea._id} className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{idea.entrepreneurName}</h3>
                  <p className="text-xs text-gray-500">Entrepreneur • {new Date(idea.createdAt).toLocaleDateString()}</p>
                </div>
                {entrepreneurBadge && (
                  <BadgeDisplay 
                    badgeTitle={entrepreneurBadge.badgeTitle} 
                    badgeLevel={entrepreneurBadge.badgeLevel}
                  />
                )}
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-200 text-purple-800">
                {idea.category}
              </span>
            </div>
            
            <h4 className="text-lg font-bold text-gray-800 mb-2">{idea.title}</h4>
            <p className="text-gray-700 mb-3">{idea.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs bg-green-200 text-green-800 font-medium">
                Goal: ₹{idea.fundingGoal.toLocaleString()}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-blue-200 text-blue-800 font-medium">
                Raised: ₹{idea.amountRaised.toLocaleString()}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-purple-200 text-purple-800 font-medium">
                📍 {idea.location}
              </span>
            </div>
            
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => handleLike(idea._id)}
                disabled={isLiked}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isLiked 
                    ? 'bg-pink-100 text-pink-700 cursor-not-allowed' 
                    : 'bg-white/50 hover:bg-pink-100'
                }`}
              >
                ❤️ {idea.likes}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 hover:bg-purple-100 transition-all">
                💬 0
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={commentText[idea._id] || ''}
                  onChange={(e) => setCommentText({ ...commentText, [idea._id]: e.target.value })}
                  placeholder="Add a comment..."
                  className="flex-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none px-4 py-2 text-sm bg-white"
                />
                <button
                  onClick={() => handleComment(idea._id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-pink-400 text-white text-sm font-semibold hover:scale-105 transition-all"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )})}
      </div>
      )}
    </div>
  )
}

export default Community
