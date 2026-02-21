import { useState, useEffect } from 'react'

const MyIdeas = () => {
  const [ideas, setIdeas] = useState([])
  const userName = localStorage.getItem('name')

  useEffect(() => {
    const allIdeas = JSON.parse(localStorage.getItem('sherise_all_ideas') || '[]')
    const myIdeas = allIdeas.filter(idea => idea.author === userName)
    setIdeas(myIdeas)
  }, [userName])

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
      
      <div className="space-y-4">
        {ideas.map(idea => (
          <div key={idea.id} className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{idea.author}</h3>
                <p className="text-xs text-gray-500">{idea.date}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-200 text-purple-800">
                {idea.language}
              </span>
            </div>
            
            <p className="text-gray-700 mb-3">{idea.text}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs bg-pink-200 text-pink-800 font-medium">
                {idea.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-green-200 text-green-800 font-medium">
                {idea.funding}
              </span>
            </div>
            
            <div className="flex gap-4 text-sm text-gray-600">
              <span>❤️ {idea.likes} likes</span>
              <span>💬 {idea.comments.length} comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyIdeas
