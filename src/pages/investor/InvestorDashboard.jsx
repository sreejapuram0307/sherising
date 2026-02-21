import { useState, useEffect } from 'react'
import InvestModal from '../../components/InvestModal'

const InvestorDashboard = () => {
  const [ideas, setIdeas] = useState([])
  const [investments, setInvestments] = useState([])
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [likedIdeas, setLikedIdeas] = useState([])

  useEffect(() => {
    const mockIdeas = [
      {
        id: 1,
        title: 'Organic Skincare Line',
        category: 'Beauty',
        description: 'Natural skincare products using traditional Indian herbs and organic ingredients.',
        fundingGoal: 500000,
        amountRaised: 150000,
        entrepreneurName: 'Ananya Sharma',
        entrepreneurEmail: 'ananya@example.com',
        likes: 24
      },
      {
        id: 2,
        title: 'Handmade Jewelry Store',
        category: 'Handmade',
        description: 'Unique handcrafted jewelry pieces inspired by Indian culture.',
        fundingGoal: 300000,
        amountRaised: 80000,
        entrepreneurName: 'Priya Patel',
        entrepreneurEmail: 'priya@example.com',
        likes: 18
      },
      {
        id: 3,
        title: 'EdTech Platform for Rural Areas',
        category: 'Tech',
        description: 'Online learning platform focused on providing quality education to rural students.',
        fundingGoal: 1000000,
        amountRaised: 450000,
        entrepreneurName: 'Meera Singh',
        entrepreneurEmail: 'meera@example.com',
        likes: 32
      },
      {
        id: 4,
        title: 'Eco-Friendly Book Publishing',
        category: 'Books',
        description: 'Publishing house focused on sustainable and eco-friendly book production.',
        fundingGoal: 700000,
        amountRaised: 200000,
        entrepreneurName: 'Kavya Reddy',
        entrepreneurEmail: 'kavya@example.com',
        likes: 15
      }
    ]
    setIdeas(mockIdeas)

    const storedInvestments = JSON.parse(localStorage.getItem('investments') || '[]')
    setInvestments(storedInvestments)
  }, [])

  const handleInvest = (idea) => {
    setSelectedIdea(idea)
    setShowModal(true)
  }

  const confirmInvestment = (amount) => {
    const investment = {
      ideaId: selectedIdea.id,
      ideaTitle: selectedIdea.title,
      amount: parseFloat(amount),
      entrepreneurEmail: selectedIdea.entrepreneurEmail,
      fundingGoal: selectedIdea.fundingGoal,
      amountRaised: selectedIdea.amountRaised,
      status: 'Funding Ongoing',
      date: new Date().toLocaleDateString()
    }

    const updatedInvestments = [...investments, investment]
    setInvestments(updatedInvestments)
    localStorage.setItem('investments', JSON.stringify(updatedInvestments))
    
    setShowModal(false)
    setSelectedIdea(null)
  }

  const handleLike = (ideaId) => {
    if (likedIdeas.includes(ideaId)) return
    
    setIdeas(ideas.map(idea =>
      idea.id === ideaId ? { ...idea, likes: idea.likes + 1 } : idea
    ))
    setLikedIdeas([...likedIdeas, ideaId])
  }

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalIdeasInvested = new Set(investments.map(inv => inv.ideaId)).size
  const activeInvestments = investments.filter(inv => inv.status === 'Funding Ongoing').length

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Ideas Invested</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{totalIdeasInvested}</p>
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
              <p className="text-3xl font-bold text-green-600 mt-2">₹{totalInvested.toLocaleString()}</p>
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
              <p className="text-3xl font-bold text-blue-600 mt-2">{activeInvestments}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">Entrepreneur Ideas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ideas.map(idea => (
          <div key={idea.id} className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all">
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
                  style={{ width: `${(idea.amountRaised / idea.fundingGoal) * 100}%` }}
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
                onClick={() => handleLike(idea.id)}
                disabled={likedIdeas.includes(idea.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  likedIdeas.includes(idea.id)
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-gray-100 hover:bg-pink-50 text-gray-700'
                }`}
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

      {showModal && (
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
