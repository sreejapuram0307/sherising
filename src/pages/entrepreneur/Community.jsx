import { useState, useEffect } from 'react'

const Community = () => {
  const [ideas, setIdeas] = useState([])
  const [commentText, setCommentText] = useState({})
  const userName = localStorage.getItem('name') || 'User'

  useEffect(() => {
    loadIdeas()
  }, [])

  const loadIdeas = () => {
    let allIdeas = JSON.parse(localStorage.getItem('sherise_all_ideas') || '[]')
    
    if (allIdeas.length === 0) {
      allIdeas = [
        {
          id: 1,
          author: 'Ananya',
          role: 'Entrepreneur',
          text: 'Starting an organic skincare line using traditional Indian herbs.',
          language: 'English',
          funding: '₹ 3,00,000',
          category: 'Beauty',
          visibility: 'public',
          likes: 12,
          comments: [],
          date: new Date().toLocaleDateString()
        },
        {
          id: 2,
          author: 'Meera',
          role: 'Entrepreneur',
          text: 'Mobile app connecting rural artisans with urban markets.',
          language: 'Hindi',
          funding: '₹ 5,00,000',
          category: 'Tech',
          visibility: 'public',
          likes: 8,
          comments: [],
          date: new Date().toLocaleDateString()
        },
        {
          id: 3,
          author: 'Kavya',
          role: 'Entrepreneur',
          text: 'Handmade jewelry business with traditional designs.',
          language: 'Telugu',
          funding: '₹ 2,00,000',
          category: 'Handmade',
          visibility: 'public',
          likes: 15,
          comments: [],
          date: new Date().toLocaleDateString()
        }
      ]
    }
    
    setIdeas(allIdeas.filter(idea => idea.visibility === 'public'))
  }

  const handleLike = (ideaId) => {
    const updatedIdeas = ideas.map(idea =>
      idea.id === ideaId ? { ...idea, likes: idea.likes + 1 } : idea
    )
    setIdeas(updatedIdeas)
    localStorage.setItem('sherise_all_ideas', JSON.stringify(updatedIdeas))
  }

  const handleComment = (ideaId) => {
    const comment = commentText[ideaId]
    if (!comment?.trim()) return

    const updatedIdeas = ideas.map(idea =>
      idea.id === ideaId
        ? {
            ...idea,
            comments: [
              ...idea.comments,
              {
                author: userName,
                text: comment,
                date: new Date().toLocaleDateString()
              }
            ]
          }
        : idea
    )
    
    setIdeas(updatedIdeas)
    localStorage.setItem('sherise_all_ideas', JSON.stringify(updatedIdeas))
    setCommentText({ ...commentText, [ideaId]: '' })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Community</h2>
      
      <div className="space-y-4">
        {ideas.map(idea => (
          <div key={idea.id} className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">{idea.author}</h3>
                <p className="text-xs text-gray-500">{idea.role} • {idea.date}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-200 text-purple-800">
                {idea.language}
              </span>
            </div>
            
            <p className="text-gray-700 mb-3">{idea.text}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs bg-pink-200 text-pink-800 font-medium">
                {idea.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-green-200 text-green-800 font-medium">
                {idea.funding}
              </span>
            </div>
            
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => handleLike(idea.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 hover:bg-pink-100 transition-all"
              >
                ❤️ {idea.likes}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 hover:bg-purple-100 transition-all">
                💬 {idea.comments.length}
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={commentText[idea.id] || ''}
                  onChange={(e) => setCommentText({ ...commentText, [idea.id]: e.target.value })}
                  placeholder="Add a comment..."
                  className="flex-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none px-4 py-2 text-sm bg-white"
                />
                <button
                  onClick={() => handleComment(idea.id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400 to-pink-400 text-white text-sm font-semibold hover:scale-105 transition-all"
                >
                  Post
                </button>
              </div>

              {idea.comments.length > 0 && (
                <div className="space-y-2">
                  {idea.comments.map((comment, idx) => (
                    <div key={idx} className="bg-white/40 rounded-xl p-3">
                      <p className="text-xs font-semibold text-gray-700">{comment.author}</p>
                      <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community
